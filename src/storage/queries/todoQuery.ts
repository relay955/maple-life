import {liveQuery} from "dexie";
import {idb} from "../idb";

export const lqTodos = liveQuery(async () => await idb.todo.toArray());
