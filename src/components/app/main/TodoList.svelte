<script lang="ts">
  import DragDropList from "../../shared/DragDropList.svelte";
  import TodoItems from "./TodoList/TodoItems.svelte";
  import {liveQuery} from "dexie";
  import {idb} from "../../../storage/idb.js";
  import type {Todo} from "../../../storage/dto/todo";

  export let onClickEditTodoButton: (todo: Todo) => void;
  let todos = liveQuery(() => idb.todo.orderBy("order").toArray());

  const onMoveTodo = (data:Todo[]) => {
    data.forEach((todo, index) => todo.order = index)
    idb.todo.bulkPut(data)
  }

</script>

<DragDropList data={$todos} let:slotProps={item}
                onMove={onMoveTodo} dataIdField="id">
    <TodoItems todo={item} onClickEdit={onClickEditTodoButton}/>
</DragDropList>
