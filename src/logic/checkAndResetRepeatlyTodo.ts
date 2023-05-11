import moment from "moment";
import {idb} from "../storage/idb";
import {updateLastUpdatedTime} from "../storage/queries/systemQuery";

export const checkAndResetRepeatlyTodo = async () => {
    const today = moment().startOf('day')
    let lastUpdatedinDb = await idb.systemInfo.get("lastUpdated");
    if (lastUpdatedinDb === undefined) {
        console.error("lastUpdated field must not be null")
        return;
    }
    const lastUpdated = moment(lastUpdatedinDb.value)

    if (today.isAfter(lastUpdated)) {
        console.log("date changed. reset repeatly todo")
        //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
        idb.todo.toCollection().modify(todo => {
            if (todo.repeatType === "daily" ||
                (todo.repeatType === "weeklyMonday" && today.day() === 1) ||
                (todo.repeatType === "weeklyThursday" && today.day() === 4) ||
                (todo.repeatType === "monthly" && today.date() === 1)) {

                Object.keys(todo.isChecked as object).forEach(key =>
                    todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
                )
            }
        })
        await updateLastUpdatedTime()
    }
}
