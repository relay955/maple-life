import moment from "moment";
import {idb} from "../storage/idb";
import {updateLastUpdatedTime} from "../storage/queries/systemQuery";

let cachedLastUpdated: string | null = null;
let isResetting = false;

export const checkAndResetRepeatlyTodo = async () => {
    if (isResetting) return;

    const today = moment().startOf('day');
    const todayStr = today.format("YYYY-MM-DD");

    if (cachedLastUpdated === todayStr) return; 
    isResetting = true;

    try {
        let lastUpdated: moment.Moment;
        if (cachedLastUpdated !== null) {
            lastUpdated = moment(cachedLastUpdated);
        } else {
            const lastUpdatedinDb = await idb.systemInfo.get("lastUpdated");
            const lastUpdatedStr = lastUpdatedinDb?.value ?? "2020-01-01";
            cachedLastUpdated = lastUpdatedStr;
            lastUpdated = moment(lastUpdatedStr);
        }

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
        cachedLastUpdated = todayStr;
    } finally {
        isResetting = false;
    }
}
