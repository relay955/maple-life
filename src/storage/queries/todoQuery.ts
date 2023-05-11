import {liveQuery} from "dexie";
import {idb} from "../idb";
import type {Todo} from "../dto/todo";

export const lqTodos =
    liveQuery(async () => await idb.todo.orderBy("order").toArray());

export const deleteTodo = (todo:Todo) => idb.todo.delete(todo.id!)
export const putTodo = async (todo: Todo) => {
    const isFirstCreate = todo.id === undefined || (await idb.todo.get(todo.id)) === undefined
    if(isFirstCreate){
        const allTodos = await idb.todo.toArray()
        allTodos.forEach((item) => {
            if (item.order > todo.order) todo.order = item.order
        })
        todo.order++;
    }
    //todo가 업데이트될경우 월드별/계정별/캐릭터별 진행상태에 문제가 발생할 수 있으므로
    //isChecked를 초기화함
    todo.isChecked = {}
    idb.todo.put(todo)
}
