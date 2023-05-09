import {idb} from "../idb";
import moment from "moment";

export const systemQuery = {
    updateLastUpdatedTime:() => {
        idb.systemInfo.put({
            name: "lastUpdated",
            value: moment().format("YYYY-MM-DD")
        })
    }
}
