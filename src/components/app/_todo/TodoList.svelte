<script lang="ts">
  import DragDropList from "../../shared/DragDropList.svelte";
  import TodoItems from "./TodoList/TodoItems.svelte";
  import {idb} from "../../../storage/idb.js";
  import type {Todo} from "../../../storage/dto/todo";
  import {lqTodos} from "../../../storage/queries/todoQuery";

  export let onClickEditTodoButton: (todo: Todo) => void;

  const onMoveTodo = (data:Todo[]) => {
    data.forEach((todo, index) => todo.order = index)
    idb.todo.bulkPut(data)
  }

</script>

<DragDropList data={$lqTodos} let:slotProps={item}
                onMove={onMoveTodo} dataIdField="id">
    <TodoItems todo={item} onClickEdit={onClickEditTodoButton}/>
</DragDropList>
