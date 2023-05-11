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


export const lqShowCharacterPreview =
    liveQuery(async () => (await idb.settings.get("showCharacterPreview"))?.value);
export const lqShortHeightMode =
    liveQuery(async () => (await idb.settings.get("shortHeightMode"))?.value);

