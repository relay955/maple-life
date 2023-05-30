import type {Transaction} from "dexie";
import type {Character} from "../dto/character";
import type {Account} from "../dto/account";
import type {Idb} from "../idb";
import type {Todo} from "../dto/todo";
import moment from "moment";
import {isInitialized, loadLastUpdated, setInitialized} from "../localStorageWrapper";

/** localstorage에서 바로 현재 버전으로 마이그레이션합니다. */
export const migrateFromLocalstorage = async (idb: Idb) => {
    //만약 로컬스토리지에 값이 뭔가 하나라도 있으면 마이그레이션 대상임
    const isMigrationNeeded = loadLastUpdated() !== undefined && !isInitialized()
    if (!isMigrationNeeded) return;

    console.log("localstorage detected. start migration")
    const defaultAccountId = await idb.account.add({
        name: "기본계정",
        order: 0
    })
    const defaultWorldId = await idb.accountWorld.add({
        accountId: defaultAccountId,
        world: "리부트",
        order: 0
    })
    const oldCharacters = loadCharacters()
    for (const [i,oldCharacter]  of oldCharacters.entries()) {
        const newCharacter: Character = {
            worldId: defaultWorldId,
            accountId: defaultAccountId,
            imgUrl: oldCharacter.imgUrl,
            name: oldCharacter.name,
            level: oldCharacter.level,
            classType: oldCharacter.classType,
            order: i,
            orderInCharacterPage : i,
            useTodo: true,
            spec:{}
        }
        await idb.character.add(newCharacter)
    }
    const oldTodos = loadTodos()
    for (const [i,oldTodo] of oldTodos.entries()) {
        const newTodo: Todo = {
            name: oldTodo.name,
            repeatType: oldTodo.repeatType,
            type: oldTodo.type,
            color: oldTodo.color,
            isChecked: typeof oldTodo.isChecked === "string" ? {} : oldTodo.isChecked,
            order: i,
        }
        await idb.todo.add(newTodo)
    }
    const lastUpdated = loadLastUpdated()
    if (lastUpdated !== undefined) {
        await idb.systemInfo.add({
            name: "lastUpdated",
            value: lastUpdated
        })
    } else {
        await idb.systemInfo.add({
            name: "lastUpdated",
            value: moment().format("YYYY-MM-DD")
        })
    }
    const oldSettings = loadSettings()
    await idb.settings.add({
        name: "shortHeightMode",
        value: oldSettings.shortHeightMode
    })
    await idb.settings.add({
        name: "showCharacterPreview",
        value: oldSettings.showCharacterPreview
    })
    setInitialized()
}

//구버전 로컬스토리지 코드. 여기서 데이터를 불러와 마이그레이션해야함
interface OldCharacter {
    id:string;
    imgUrl: string;
    name: string;
    level: number;
    classType:string;
}

export type TodoCheckType = "checked" | "unchecked" | "blocked";
export interface OldTodo {
    name: string;
    repeatType:"daily"|"weeklyMonday"|"weeklyThursday"|"monthly";
    type:"perCharacter"|"perAccount"|"perWorld";
    color:string;
    isChecked:{[index:string]:TodoCheckType} | TodoCheckType//per character일경우 캐릭터별로, perAccount일경우 단일, per world일경우 월드별
}

interface OldSettings {
    shortHeightMode: boolean;
    showCharacterPreview: boolean;
}

interface OldSystemInfo{
    lastUpdated:string;
}

const loadCharacters = ():OldCharacter[] => {
    return JSON.parse(window.localStorage.getItem("characters") ?? "[]")
}

const loadTodos = ():OldTodo[] =>
    JSON.parse(window.localStorage.getItem("todos") ?? "[]")


const loadSettings = ():OldSettings =>{
    const settings = window.localStorage.getItem("settings");

    if(settings !== null) return JSON.parse(settings);
    else return {
        shortHeightMode: false,
        showCharacterPreview: true
    }
}
