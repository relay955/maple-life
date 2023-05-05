import type {Character} from "./dto/character";
import type {Todo} from "./dto/todo";
import type {Settings} from "./dto/settings";
import type {SystemInfo} from "./dto/systemInfo";
import moment from "moment";

export const loadCharacters = ():Character[] =>
    JSON.parse(window.localStorage.getItem("characters") ?? "[]")

export const saveCharacters = (characters:Character[]) =>
    window.localStorage.setItem("characters", JSON.stringify(characters))

export const loadTodos = ():Todo[] =>
    JSON.parse(window.localStorage.getItem("todos") ?? "[]")

export const saveTodos = (todos:Todo[]) =>
    window.localStorage.setItem("todos", JSON.stringify(todos))

export const loadSystemInfo = ():SystemInfo => {
    const systemInfo = window.localStorage.getItem("systemInfo");

    if(systemInfo !== null) return JSON.parse(systemInfo);
    else return {
        lastUpdated: moment().format("YYYY-MM-DD")
    }
}

export const saveSystemInfo = (systemInfo:SystemInfo) =>
    window.localStorage.setItem("systemInfo", JSON.stringify(systemInfo))

export const loadSettings = ():Settings =>{
    const settings = window.localStorage.getItem("systemInfo");

    if(settings !== null) return JSON.parse(settings);
    else return {
        shortHeightMode: false,
        showCharacterPreview: true
    }
}

export const saveSettings = (settings:Settings) =>
    window.localStorage.setItem("settings", JSON.stringify(settings))
