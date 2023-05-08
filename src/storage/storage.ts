export const loadLastUpdated = ():string|undefined => {
    const systemInfo = window.localStorage.getItem("lastUpdated");
    if(systemInfo !== null) return systemInfo;
    else return undefined;
}

export const isInitialized = ():boolean => window.localStorage.getItem("isInitialized") === "true"
export const setInitialized = () => window.localStorage.setItem("isInitialized", "true")
