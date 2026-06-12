import moment from "moment";

let mockCurrentDate = "2026-06-13";

jest.mock('moment', () => {
  const originalMoment = jest.requireActual('moment');
  const mockMoment: any = (input?: any, ...args: any[]) => {
    if (input === undefined) {
      return originalMoment(mockCurrentDate, ...args);
    }
    return originalMoment(input, ...args);
  };
  for (const key of Object.keys(originalMoment)) {
    mockMoment[key] = (originalMoment as any)[key];
  }
  mockMoment.default = mockMoment;
  return mockMoment;
});

// Mock DB interactions
const mockGet = jest.fn();
const mockModify = jest.fn();
const mockUpdateLastUpdatedTime = jest.fn();

jest.mock('../src/storage/idb', () => {
  return {
    idb: {
      systemInfo: {
        get: (key: string) => mockGet(key)
      },
      todo: {
        toCollection: () => ({
          modify: (callback: any) => mockModify(callback)
        })
      }
    }
  };
});

jest.mock('../src/storage/queries/systemQuery', () => {
  return {
    updateLastUpdatedTime: () => mockUpdateLastUpdatedTime()
  };
});

describe('checkAndResetRepeatlyTodo unit tests', () => {
  let checkAndResetRepeatlyTodo: () => Promise<void>;

  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
    // Re-require the module to reset module-level variables like cachedLastUpdated and isResetting
    // @ts-ignore
    checkAndResetRepeatlyTodo = require('../src/logic/checkAndResetRepeatlyTodo').checkAndResetRepeatlyTodo;
  });

  it('should run reset daily, weekly, monthly todos on first run when DB date is old', async () => {
    mockGet.mockResolvedValue({ name: 'lastUpdated', value: '2020-01-01' });
    mockModify.mockResolvedValue(undefined);
    mockUpdateLastUpdatedTime.mockResolvedValue(undefined);

    mockCurrentDate = '2026-06-13'; // Saturday

    await checkAndResetRepeatlyTodo();

    // 1. Should query DB for lastUpdated
    expect(mockGet).toHaveBeenCalledWith('lastUpdated');

    // 2. Should call modify on todo collection
    expect(mockModify).toHaveBeenCalled();

    // 3. Should update DB date
    expect(mockUpdateLastUpdatedTime).toHaveBeenCalled();
  });

  it('should return immediately without DB query on double invocation on the same day', async () => {
    mockGet.mockResolvedValue({ name: 'lastUpdated', value: '2026-06-12' });
    mockModify.mockResolvedValue(undefined);
    mockUpdateLastUpdatedTime.mockResolvedValue(undefined);

    mockCurrentDate = '2026-06-13';

    // First call: should query DB and update
    await checkAndResetRepeatlyTodo();
    expect(mockGet).toHaveBeenCalledTimes(1);
    expect(mockUpdateLastUpdatedTime).toHaveBeenCalledTimes(1);

    // Second call: should exit early
    jest.clearAllMocks();
    await checkAndResetRepeatlyTodo();
    expect(mockGet).not.toHaveBeenCalled();
    expect(mockModify).not.toHaveBeenCalled();
    expect(mockUpdateLastUpdatedTime).not.toHaveBeenCalled();
  });

  it('should reset todos according to their repeatType and dates (Monday transition)', async () => {
    mockGet.mockResolvedValue({ name: 'lastUpdated', value: '2026-06-12' }); // Friday
    mockModify.mockResolvedValue(undefined);
    mockUpdateLastUpdatedTime.mockResolvedValue(undefined);

    mockCurrentDate = '2026-06-15'; // Monday (Should reset daily and weeklyMonday, but NOT weeklyThursday or monthly)

    await checkAndResetRepeatlyTodo();

    expect(mockModify).toHaveBeenCalled();
    const modifyCallback = mockModify.mock.calls[0][0];
    expect(typeof modifyCallback).toBe('function');

    // Test daily todo
    const dailyTodo = {
      repeatType: 'daily',
      isChecked: { 'char1': 'checked', 'char2': 'blocked', 'char3': 'unchecked' }
    };
    modifyCallback(dailyTodo);
    expect(dailyTodo.isChecked).toEqual({
      'char1': 'unchecked',
      'char2': 'blocked',
      'char3': 'unchecked'
    });

    // Test weeklyMonday todo
    const weeklyMondayTodo = {
      repeatType: 'weeklyMonday',
      isChecked: { 'char1': 'checked', 'char2': 'blocked' }
    };
    modifyCallback(weeklyMondayTodo);
    expect(weeklyMondayTodo.isChecked).toEqual({
      'char1': 'unchecked',
      'char2': 'blocked'
    });

    // Test weeklyThursday todo (not Thursday yet, last thursday was 2026-06-11, which is before cachedLastUpdated 2026-06-12)
    const weeklyThursdayTodo = {
      repeatType: 'weeklyThursday',
      isChecked: { 'char1': 'checked' }
    };
    modifyCallback(weeklyThursdayTodo);
    expect(weeklyThursdayTodo.isChecked).toEqual({
      'char1': 'checked'
    });

    // Test monthly todo
    const monthlyTodo = {
      repeatType: 'monthly',
      isChecked: { 'char1': 'checked' }
    };
    modifyCallback(monthlyTodo);
    expect(monthlyTodo.isChecked).toEqual({
      'char1': 'checked'
    });
  });

  it('should reset daily and weeklyThursday todos on Thursday transition', async () => {
    mockGet.mockResolvedValue({ name: 'lastUpdated', value: '2026-06-17' }); // Wednesday
    mockModify.mockResolvedValue(undefined);
    mockUpdateLastUpdatedTime.mockResolvedValue(undefined);

    mockCurrentDate = '2026-06-18'; // Thursday

    await checkAndResetRepeatlyTodo();

    expect(mockModify).toHaveBeenCalled();
    const modifyCallback = mockModify.mock.calls[0][0];

    // Daily should reset
    const dailyTodo = { repeatType: 'daily', isChecked: { 'char1': 'checked' } };
    modifyCallback(dailyTodo);
    expect(dailyTodo.isChecked.char1).toBe('unchecked');

    // Weekly Thursday should reset
    const weeklyThursdayTodo = { repeatType: 'weeklyThursday', isChecked: { 'char1': 'checked' } };
    modifyCallback(weeklyThursdayTodo);
    expect(weeklyThursdayTodo.isChecked.char1).toBe('unchecked');

    // Weekly Monday should NOT reset
    const weeklyMondayTodo = { repeatType: 'weeklyMonday', isChecked: { 'char1': 'checked' } };
    modifyCallback(weeklyMondayTodo);
    expect(weeklyMondayTodo.isChecked.char1).toBe('checked');

    // Monthly should NOT reset
    const monthlyTodo = { repeatType: 'monthly', isChecked: { 'char1': 'checked' } };
    modifyCallback(monthlyTodo);
    expect(monthlyTodo.isChecked.char1).toBe('checked');
  });

  it('should reset monthly, daily and weeklyMonday, but not weeklyThursday on 1st of month (Monday)', async () => {
    mockGet.mockResolvedValue({ name: 'lastUpdated', value: '2026-05-31' }); // Sunday, May 31
    mockModify.mockResolvedValue(undefined);
    mockUpdateLastUpdatedTime.mockResolvedValue(undefined);

    mockCurrentDate = '2026-06-01'; // Monday, June 1

    await checkAndResetRepeatlyTodo();

    expect(mockModify).toHaveBeenCalled();
    const modifyCallback = mockModify.mock.calls[0][0];

    // Monthly should reset
    const monthlyTodo = { repeatType: 'monthly', isChecked: { 'char1': 'checked' } };
    modifyCallback(monthlyTodo);
    expect(monthlyTodo.isChecked.char1).toBe('unchecked');

    // Weekly Monday should reset
    const weeklyMondayTodo = { repeatType: 'weeklyMonday', isChecked: { 'char1': 'checked' } };
    modifyCallback(weeklyMondayTodo);
    expect(weeklyMondayTodo.isChecked.char1).toBe('unchecked');

    // Weekly Thursday should NOT reset (since last Thursday was May 28, and cached was May 31, so no Thursday has passed)
    const weeklyThursdayTodo = { repeatType: 'weeklyThursday', isChecked: { 'char1': 'checked' } };
    modifyCallback(weeklyThursdayTodo);
    expect(weeklyThursdayTodo.isChecked.char1).toBe('checked');
  });
});
