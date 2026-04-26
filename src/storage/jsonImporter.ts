import type {Account} from "./dto/account";
import type {Character} from "./dto/character";
import type {Settings} from "./dto/settings";
import type {SystemInfo} from "./dto/systemInfo";
import type {Todo, TodoCheckType} from "./dto/todo";
import type {AccountWorld} from "./dto/world";
import {idb} from "./idb";
import {exportDatabaseToJsonFile, type JsonDatabaseExport,} from "./jsonExporter";

const todoRepeatTypes = ["daily", "weeklyMonday", "weeklyThursday", "monthly"];
const todoTypes = ["perCharacter", "perAccount", "perWorld"];
const todoCheckTypes: TodoCheckType[] = ["checked", "unchecked", "blocked"];

const isRecord = (value: unknown): value is Record<string, unknown> =>
  typeof value === "object" && value !== null && !Array.isArray(value);

const isOptionalNumber = (value: unknown) =>
  value === undefined || typeof value === "number";

const validateAccount = (value: unknown, index: number): Account => {
  if (!isRecord(value)) throw new Error(`account[${index}] 형식이 올바르지 않습니다.`);
  if (!isOptionalNumber(value.id)) throw new Error(`account[${index}].id 형식이 올바르지 않습니다.`);
  if (typeof value.name !== "string") throw new Error(`account[${index}].name 형식이 올바르지 않습니다.`);
  if (typeof value.order !== "number") throw new Error(`account[${index}].order 형식이 올바르지 않습니다.`);
  return value as unknown as Account;
};

const validateAccountWorld = (value: unknown, index: number): AccountWorld => {
  if (!isRecord(value)) throw new Error(`accountWorld[${index}] 형식이 올바르지 않습니다.`);
  if (!isOptionalNumber(value.id)) throw new Error(`accountWorld[${index}].id 형식이 올바르지 않습니다.`);
  if (typeof value.accountId !== "number") throw new Error(`accountWorld[${index}].accountId 형식이 올바르지 않습니다.`);
  if (typeof value.world !== "string") throw new Error(`accountWorld[${index}].world 형식이 올바르지 않습니다.`);
  if (typeof value.order !== "number") throw new Error(`accountWorld[${index}].order 형식이 올바르지 않습니다.`);
  return value as unknown as AccountWorld;
};

const validateCharacter = (value: unknown, index: number): Character => {
  if (!isRecord(value)) throw new Error(`character[${index}] 형식이 올바르지 않습니다.`);
  if (!isOptionalNumber(value.id)) throw new Error(`character[${index}].id 형식이 올바르지 않습니다.`);
  if (typeof value.accountId !== "number") throw new Error(`character[${index}].accountId 형식이 올바르지 않습니다.`);
  if (typeof value.worldId !== "number") throw new Error(`character[${index}].worldId 형식이 올바르지 않습니다.`);
  if (typeof value.name !== "string") throw new Error(`character[${index}].name 형식이 올바르지 않습니다.`);
  if (typeof value.level !== "number") throw new Error(`character[${index}].level 형식이 올바르지 않습니다.`);
  if (typeof value.imgUrl !== "string") throw new Error(`character[${index}].imgUrl 형식이 올바르지 않습니다.`);
  if (typeof value.classType !== "string") throw new Error(`character[${index}].classType 형식이 올바르지 않습니다.`);
  if (typeof value.order !== "number") throw new Error(`character[${index}].order 형식이 올바르지 않습니다.`);
  if (typeof value.orderInCharacterPage !== "number") {
    throw new Error(`character[${index}].orderInCharacterPage 형식이 올바르지 않습니다.`);
  }
  if (typeof value.useTodo !== "boolean") throw new Error(`character[${index}].useTodo 형식이 올바르지 않습니다.`);
  if (value.detailInfoKey !== undefined && typeof value.detailInfoKey !== "string") {
    throw new Error(`character[${index}].detailInfoKey 형식이 올바르지 않습니다.`);
  }
  if (value.isReboot !== undefined && typeof value.isReboot !== "boolean") {
    throw new Error(`character[${index}].isReboot 형식이 올바르지 않습니다.`);
  }
  if (!isRecord(value.spec)) throw new Error(`character[${index}].spec 형식이 올바르지 않습니다.`);
  return value as unknown as Character;
};

const validateTodoCheckState = (value: unknown, index: number) => {
  if (!isRecord(value)) throw new Error(`todo[${index}].isChecked 형식이 올바르지 않습니다.`);
  for (const checkType of Object.values(value)) {
    if (typeof checkType !== "string" || !todoCheckTypes.includes(checkType as TodoCheckType)) {
      throw new Error(`todo[${index}].isChecked 값이 올바르지 않습니다.`);
    }
  }
};

const validateTodo = (value: unknown, index: number): Todo => {
  if (!isRecord(value)) throw new Error(`todo[${index}] 형식이 올바르지 않습니다.`);
  if (!isOptionalNumber(value.id)) throw new Error(`todo[${index}].id 형식이 올바르지 않습니다.`);
  if (typeof value.name !== "string") throw new Error(`todo[${index}].name 형식이 올바르지 않습니다.`);
  if (typeof value.repeatType !== "string" || !todoRepeatTypes.includes(value.repeatType)) {
    throw new Error(`todo[${index}].repeatType 형식이 올바르지 않습니다.`);
  }
  if (typeof value.type !== "string" || !todoTypes.includes(value.type)) {
    throw new Error(`todo[${index}].type 형식이 올바르지 않습니다.`);
  }
  if (typeof value.color !== "string") throw new Error(`todo[${index}].color 형식이 올바르지 않습니다.`);
  validateTodoCheckState(value.isChecked, index);
  if (typeof value.order !== "number") throw new Error(`todo[${index}].order 형식이 올바르지 않습니다.`);
  return value as unknown as Todo;
};

const validateSettings = (value: unknown, index: number): Settings => {
  if (!isRecord(value)) throw new Error(`settings[${index}] 형식이 올바르지 않습니다.`);
  if (typeof value.name !== "string") throw new Error(`settings[${index}].name 형식이 올바르지 않습니다.`);
  if (!("value" in value)) throw new Error(`settings[${index}].value가 없습니다.`);
  return value as unknown as Settings;
};

const validateSystemInfo = (value: unknown, index: number): SystemInfo => {
  if (!isRecord(value)) throw new Error(`systemInfo[${index}] 형식이 올바르지 않습니다.`);
  if (typeof value.name !== "string") throw new Error(`systemInfo[${index}].name 형식이 올바르지 않습니다.`);
  if (typeof value.value !== "string") throw new Error(`systemInfo[${index}].value 형식이 올바르지 않습니다.`);
  return value as unknown as SystemInfo;
};

const validateArray = <T>(
  value: unknown,
  tableName: string,
  validator: (entry: unknown, index: number) => T,
): T[] => {
  if (!Array.isArray(value)) throw new Error(`${tableName} 테이블 형식이 올바르지 않습니다.`);
  return value.map((entry, index) => validator(entry, index));
};

export const validateJsonDatabaseImport = (
  payload: unknown,
): JsonDatabaseExport => {
  if (!isRecord(payload)) throw new Error("가져올 JSON 루트 형식이 올바르지 않습니다.");
  if (typeof payload.exportedAt !== "string") throw new Error("exportedAt 형식이 올바르지 않습니다.");
  if (Number.isNaN(Date.parse(payload.exportedAt))) throw new Error("exportedAt 값이 올바른 날짜 형식이 아닙니다.");
  if (typeof payload.schemaVersion !== "number") throw new Error("schemaVersion 형식이 올바르지 않습니다.");
  if (payload.schemaVersion > idb.verno) throw new Error("현재 앱보다 더 최신 DB 포맷입니다.");
  if (!isRecord(payload.tables)) throw new Error("tables 형식이 올바르지 않습니다.");

  return {
    exportedAt: payload.exportedAt,
    schemaVersion: payload.schemaVersion,
    tables: {
      account: validateArray(payload.tables.account, "account", validateAccount),
      accountWorld: validateArray(payload.tables.accountWorld, "accountWorld", validateAccountWorld),
      character: validateArray(payload.tables.character, "character", validateCharacter),
      todo: validateArray(payload.tables.todo, "todo", validateTodo),
      settings: validateArray(payload.tables.settings, "settings", validateSettings),
      systemInfo: validateArray(payload.tables.systemInfo, "systemInfo", validateSystemInfo),
    },
  };
};

export const importDatabaseFromJsonFile = async (file: File) => {
  const fileText = await file.text();
  let parsedJson: unknown;

  try {
    parsedJson = JSON.parse(fileText);
  } catch {
    throw new Error("파일을 해석할 수 없습니다.");
  }

  try {
    const validatedPayload = validateJsonDatabaseImport(parsedJson);
    const writableTables = [
      idb.account,
      idb.accountWorld,
      idb.character,
      idb.todo,
      idb.settings,
      idb.systemInfo,
    ];

    await exportDatabaseToJsonFile();

    await idb.transaction("rw", writableTables, async () => {
      await Promise.all([
        idb.character.clear(),
        idb.accountWorld.clear(),
        idb.account.clear(),
        idb.todo.clear(),
        idb.settings.clear(),
        idb.systemInfo.clear(),
      ]);

      await idb.account.bulkPut(validatedPayload.tables.account);
      await idb.accountWorld.bulkPut(validatedPayload.tables.accountWorld);
      await idb.character.bulkPut(validatedPayload.tables.character);
      await idb.todo.bulkPut(validatedPayload.tables.todo);
      await idb.settings.bulkPut(validatedPayload.tables.settings);
      await idb.systemInfo.bulkPut(validatedPayload.tables.systemInfo);
    });
  }catch(e){
    throw new Error("파일 가져오기 실패");
  }
};
