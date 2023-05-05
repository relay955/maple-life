import type {Character} from "./dto/character";
import type {Todo} from "./dto/todo";
import type {Settings} from "./dto/settings";
import type {SystemInfo} from "./dto/systemInfo";

export const loadCharacters = ():Character[] =>
    JSON.parse(window.localStorage.getItem("characters") ?? "[]")

export const saveCharacters = (characters:Character[]) =>
    window.localStorage.setItem("characters", JSON.stringify(characters))

export const loadTodos = ():Todo[] =>
    JSON.parse(window.localStorage.getItem("todos") ?? "[]")

export const saveTodos = (todos:Todo[]) =>
    window.localStorage.setItem("todos", JSON.stringify(todos))

export const loadLastUpdated = ():string|undefined => {
    const systemInfo = window.localStorage.getItem("lastUpdated");
    if(systemInfo !== null) return systemInfo;
    else return undefined;
}

export const saveSystemInfo = (lastUpdated:string) =>
    window.localStorage.setItem("lastUpdated", lastUpdated)

export const loadSettings = ():Settings =>{
    const settings = window.localStorage.getItem("settings");

    if(settings !== null) return JSON.parse(settings);
    else return {
        shortHeightMode: false,
        showCharacterPreview: true
    }
}

export const saveSettings = (settings:Settings) =>
    window.localStorage.setItem("settings", JSON.stringify(settings))
