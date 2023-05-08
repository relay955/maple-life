import type {Transaction} from "dexie";
import type {Character} from "../dto/character";
import type {Account} from "../dto/account";
import type {Idb} from "../idb";
import type {Todo} from "../dto/todo";
import moment from "moment";

/** localstorage에서 바로 현재 버전으로 마이그레이션합니다. */
export const migrateFromLocalstorage = async (idb: Idb) => {
    //만약 로컬스토리지에 값이 뭔가 하나라도 있으면 마이그레이션 대상임
    const isMigrationNeeded = loadLastUpdated() !== undefined && !isMigrated()
    if (isMigrationNeeded) {
        console.log("localstorage detected. start migration")
        //기본계정 등록.
        const defaultAccountId = await idb.account.add({
            name:"기본계정",
            order:0
        })

        //기본월드 등록.(기본월드는 일단 무조건 리부트임)
        const defaultWorldId = await idb.accountWorld.add({
            accountId:defaultAccountId,
            world:"리부트",
            order:0
        })

        //migration character
        const oldCharacters = loadCharacters()
        for (const oldCharacter of oldCharacters) {
            const newCharacter: Character = {
                worldId: defaultWorldId,
                accountId: defaultAccountId,
                imgUrl: oldCharacter.imgUrl,
                name: oldCharacter.name,
                level: oldCharacter.level,
                classType: oldCharacter.classType,
                order: 0,
            }
            await idb.character.add(newCharacter)
        }
        //migration todo
        const oldTodos = loadTodos()
        for (const oldTodo of oldTodos) {
            const newTodo: Todo = {
                name: oldTodo.name,
                repeatType: oldTodo.repeatType,
                type: oldTodo.type,
                color: oldTodo.color,
                isChecked: oldTodo.isChecked,
                order: 0,
            }
            await idb.todo.add(newTodo)
        }

        //migration systemInfo
        const lastUpdated = loadLastUpdated()
        if(lastUpdated !== undefined){
            await idb.systemInfo.add({
                name:"lastUpdated",
                value:lastUpdated
            })
        }else{
            await idb.systemInfo.add({
                name:"lastUpdated",
                value:moment().format("YYYY-MM-DD")
            })
        }

        //migration settings
        const oldSettings = loadSettings()
        await idb.settings.add({
            name:"shortHeightMode",
            value:oldSettings.shortHeightMode
        })
        await idb.settings.add({
            name:"showCharacterPreview",
            value:oldSettings.showCharacterPreview
        })
        setMigrated()
    }

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

const isMigrated = ():boolean => {
    return window.localStorage.getItem("isMigrated") === "true"
}

const setMigrated = () => {
    window.localStorage.setItem("isMigrated", "true")
}

const loadCharacters = ():OldCharacter[] => {
    return JSON.parse(window.localStorage.getItem("characters") ?? "[]")
}

const saveCharacters = (characters:OldCharacter[]) =>
    window.localStorage.setItem("characters", JSON.stringify(characters))

const loadTodos = ():OldTodo[] =>
    JSON.parse(window.localStorage.getItem("todos") ?? "[]")

const saveTodos = (todos:OldTodo[]) =>
    window.localStorage.setItem("todos", JSON.stringify(todos))

const loadLastUpdated = ():string|undefined => {
    const systemInfo = window.localStorage.getItem("lastUpdated");
    if(systemInfo !== null) return systemInfo;
    else return undefined;
}

const saveSystemInfo = (lastUpdated:string) =>
    window.localStorage.setItem("lastUpdated", lastUpdated)

const loadSettings = ():OldSettings =>{
    const settings = window.localStorage.getItem("settings");

    if(settings !== null) return JSON.parse(settings);
    else return {
        shortHeightMode: false,
        showCharacterPreview: true
    }
}

const saveSettings = (settings:OldSettings) =>
    window.localStorage.setItem("settings", JSON.stringify(settings))
