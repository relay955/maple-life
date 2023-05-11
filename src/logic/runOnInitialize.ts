import {idb} from "../storage/idb";
import {migrateFromLocalstorage} from "../storage/migration/migrateFromLocalstorage";
import {initDefaultData} from "../storage/idbSetupDefaultData";
import {checkAndResetRepeatlyTodo} from "./checkAndResetRepeatlyTodo";

/**
 * 초기 앱 실행시 실행되어야 하는 함수들
 */
export const runOnInitialize = async () => {
    await idb.open()
    await migrateFromLocalstorage(idb)
    await initDefaultData(idb)

    setInterval(checkAndResetRepeatlyTodo, 1000)
}
