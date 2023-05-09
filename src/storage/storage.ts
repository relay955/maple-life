/**
 * 현재 마지막 업데이트 시간을 관리하는 데이터는 indexed DB로 이관되었습니다.
 * 이 함수는 localStorage를 과거 사용한 기록이 있는지 확인용입니다.
 */
export const loadLastUpdated = ():string|undefined => {
    const systemInfo = window.localStorage.getItem("lastUpdated");
    if(systemInfo !== null) return systemInfo;
    else return undefined;
}

export const isInitialized = ():boolean => window.localStorage.getItem("isInitialized") === "true"
export const setInitialized = () => window.localStorage.setItem("isInitialized", "true")
