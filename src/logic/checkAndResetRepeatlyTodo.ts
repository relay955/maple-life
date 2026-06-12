import moment from "moment";
import {idb} from "../storage/idb";
import {updateLastUpdatedTime} from "../storage/queries/systemQuery";

let cachedLastUpdated: moment.Moment | null = null;
let isResetting = false;

export const checkAndResetRepeatlyTodo = async () => {
    if (isResetting) return;

    const today = moment().startOf('day');

    if (cachedLastUpdated && cachedLastUpdated.isSame(today, 'day')) return; 
    isResetting = true;

    try {
        if (cachedLastUpdated === null) {
            const lastUpdatedinDb = await idb.systemInfo.get("lastUpdated");
            const lastUpdatedStr = lastUpdatedinDb?.value ?? "2020-01-01";
            cachedLastUpdated = moment(lastUpdatedStr).startOf('day');
        }

        if (today.isAfter(cachedLastUpdated)) {
            console.log("date changed. reset repeatly todo")

            const shouldResetDaily = true;

            const mostRecentMonday = moment(today).startOf('isoWeek');
            const shouldResetWeeklyMonday = cachedLastUpdated.isBefore(mostRecentMonday);

            const mostRecentThursday = today.isoWeekday() >= 4
                ? moment(today).isoWeekday(4).startOf('day')
                : moment(today).isoWeekday(4).subtract(1, 'week').startOf('day');
            const shouldResetWeeklyThursday = cachedLastUpdated.isBefore(mostRecentThursday);

            const mostRecentMonthStart = moment(today).startOf('month');
            const shouldResetMonthly = cachedLastUpdated.isBefore(mostRecentMonthStart);

            //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
            await idb.todo.toCollection().modify(todo => {
                if ((todo.repeatType === "daily" && shouldResetDaily) ||
                    (todo.repeatType === "weeklyMonday" && shouldResetWeeklyMonday) ||
                    (todo.repeatType === "weeklyThursday" && shouldResetWeeklyThursday) ||
                    (todo.repeatType === "monthly" && shouldResetMonthly)) {

                    Object.keys(todo.isChecked).forEach(key =>
                        todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
                    )
                }
            })
            await updateLastUpdatedTime()
        }
        cachedLastUpdated = today;
    } finally {
        isResetting = false;
    }
}
