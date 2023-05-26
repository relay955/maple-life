import {idb} from "../idb";
import moment from "moment";
import {liveQuery} from "dexie";

export const updateLastUpdatedTime = async () => {
    await idb.systemInfo.put({
        name: "lastUpdated",
        value: moment().format("YYYY-MM-DD")
    })
}
export const updateShortHeightMode = async (value: boolean) => {
    await idb.settings.put({
        name: "shortHeightMode",
        value: value
    })
}

export const updateShowCharacterPreview = async (value: boolean) => {
    await idb.settings.put({
        name: "showCharacterPreview",
        value: value
    })
}

export const updateShowMemo = async (value: boolean) => {
    await idb.settings.put({
        name: "showMemo",
        value: value
    })
}

export const updateMemo = async (value: string) => {
    await idb.settings.put({
        name: "memo",
        value: value
    })
}

export const updateSelectedWorldId = async (value: number) => {
    await idb.settings.put({
        name: "selectedWorldId",
        value: value
    })
}

export const updateCharacterTabViewMode = async (value: string) => {
    await idb.settings.put({
        name: "characterTabViewMode",
        value: value
    })
}




export const lqShowCharacterPreview =
    liveQuery(async () => (await idb.settings.get("showCharacterPreview"))?.value);
export const lqShortHeightMode =
    liveQuery(async () => (await idb.settings.get("shortHeightMode"))?.value);

export const lqShowMemo =
    liveQuery(async () => (await idb.settings.get("showMemo"))?.value ?? false);

export const lqMemo =
    liveQuery(async () => (await idb.settings.get("memo"))?.value ?? "");

export const lqSelectedWorldId =
    liveQuery(async () => (await idb.settings.get("selectedWorldId"))?.value ?? 1);

export const lqCharacterTabViewMode =
    liveQuery(async () => (await idb.settings.get("characterTabViewMode"))?.value ?? "card");

