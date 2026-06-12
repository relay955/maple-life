import moment from "moment";
import {idb} from "../storage/idb";
import {updateLastUpdatedTime} from "../storage/queries/systemQuery";

export const checkAndResetRepeatlyTodo = async () => {
    const today = moment().startOf('day')
    let lastUpdatedinDb = await idb.systemInfo.get("lastUpdated");
    const lastUpdated = moment(lastUpdatedinDb?.value ?? "2020-01-01")

    if (today.isAfter(lastUpdated)) {
        console.log("date changed. reset repeatly todo")

        const shouldResetDaily = true;

        const mostRecentMonday = moment(today).startOf('isoWeek');
        const shouldResetWeeklyMonday = lastUpdated.isBefore(mostRecentMonday);

        const mostRecentThursday = today.isoWeekday() >= 4
            ? moment(today).isoWeekday(4).startOf('day')
            : moment(today).isoWeekday(4).subtract(1, 'week').startOf('day');
        const shouldResetWeeklyThursday = lastUpdated.isBefore(mostRecentThursday);

        const mostRecentMonthStart = moment(today).startOf('month');
        const shouldResetMonthly = lastUpdated.isBefore(mostRecentMonthStart);

        //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
        idb.todo.toCollection().modify(todo => {
            if ((todo.repeatType === "daily" && shouldResetDaily) ||
                (todo.repeatType === "weeklyMonday" && shouldResetWeeklyMonday) ||
                (todo.repeatType === "weeklyThursday" && shouldResetWeeklyThursday) ||
                (todo.repeatType === "monthly" && shouldResetMonthly)) {

                Object.keys(todo.isChecked as object).forEach(key =>
                    todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
                )
            }
        })
        await updateLastUpdatedTime()
    }
}
