import {idb} from "../idb";
import moment from "moment";
import {liveQuery} from "dexie";

export const updateLastUpdatedTime = async () => {
    await idb.systemInfo.put({
        name: "lastUpdated",
        value: moment().format("YYYY-MM-DD")
    })
}


export const lqShowCharacterPreview =
    liveQuery(async () => (await idb.settings.get("showCharacterPreview"))?.value);
