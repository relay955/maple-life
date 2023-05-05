<script lang="ts">
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import {
    loadCharacters,
    loadSystemInfo,
    loadTodos,
    saveCharacters,
    saveSystemInfo,
    saveTodos
  } from "../storage/storage";
  import {onMount} from "svelte";
  import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
  import TodoEditModal from "../components/app/main/TodoEditModal.svelte";
  import moment from "moment";
  import {getDefaultCharacters, getDefaultTodos} from "$lib/preset/defaultItems";
  import TodoItems from "../components/app/main/TodoItems.svelte";
  import CharacterEditModal from "../components/app/main/CharacterEditModal.svelte";
  import TodoHeader from "../components/app/main/TodoHeader.svelte";
  import AddTodoButton from "../components/app/main/AddTodoButton.svelte";
  import {SvelteToast} from "@zerodevx/svelte-toast";

  let characters:Character[] = [];
  let todos:Todo[] = []
  let isEditTodoModalOpen = false;
  let editTodoModalEditMode = false;
  let editTodoModalTarget:Todo|undefined = undefined;
  let isAddCharacterModalOpen = false;

  onMount(async () => {
    const loadedCharacters = loadCharacters();
    characters = loadedCharacters.length > 0 ? loadedCharacters : getDefaultCharacters();
    const loadedTodos = loadTodos();
    todos = loadedTodos.length > 0 ? loadedTodos : getDefaultTodos();

    setInterval(() => {
      let systemInfo = loadSystemInfo();
      const lastUpdated = moment(systemInfo.lastUpdated);
      const today = moment().startOf('day')

      if (today.isAfter(lastUpdated)) {
        //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
        todos.forEach(todo => {
          if (todo.repeatType === "daily" ||
            (todo.repeatType === "weeklyMonday" && today.day() === 1) ||
            (todo.repeatType === "weeklyThursday" && today.day() === 4) ||
            (todo.repeatType === "monthly" && today.date() === 1)) {

            if (todo.type === "perCharacter") {
              Object.keys(todo.isChecked as object).forEach(key =>
                todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
              )
            } else {
              todo.isChecked = todo.isChecked === "blocked" ? "blocked" : "unchecked";
            }
          }
        })

        systemInfo.lastUpdated = moment().format("YYYY-MM-DD")
        saveSystemInfo(systemInfo)
        todos = todos
      }
    }, 1000)
  })

  function onClickCheckbox(item:Todo, character:Character|undefined = undefined) {
    if(character === undefined){
      if(item.isChecked === "checked") {
        item.isChecked = "unchecked";
      }else if(item.isChecked === "unchecked"){
        item.isChecked = "checked";
      }
    }else{
      const targetCharacterChecked = item.isChecked[character.name];
      if(targetCharacterChecked === "checked") {
        item.isChecked[character.name] = "unchecked";
      }else if(targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined){
        item.isChecked[character.name] = "checked";
      }
    }
    todos = todos
    saveTodos(todos)
  }

  function onMoveTodo(){
    todos = todos
    saveTodos(todos)
  }

  const onEditTodo = (todo:Todo) => {
    const editTargetIndex = todos.findIndex(target => target.id === todo.id)
    if(editTargetIndex !== -1) {
      todos[editTargetIndex] = todo
    } else {
      todos.push(todo)
    }
    todos = todos
    saveTodos(todos)
  }
  const onAddCharacter = (character:Character) =>{
    characters.push(character);
    characters = characters
    saveCharacters(characters)
  };

  const onClickDeleteTodo = (todo:Todo) => {
    todos = todos.filter(target => target.name !== todo.name)
    todos = todos
    saveTodos(todos)
  }

  const onClickAddTodoButton = () => {
    isEditTodoModalOpen = true;
    editTodoModalEditMode = false;
  }

  const onClickEditTodoButton = (todo:Todo) => {
    isEditTodoModalOpen = true;
    editTodoModalEditMode = true;
    editTodoModalTarget = todo;
  }

</script>

<Logo/>
<Toolbar onClickCharacterAddButton={()=>isAddCharacterModalOpen = true}/>

<div class="main">
  <div class="container">
    <TodoHeader characters={characters}/>
    <DragDropList bind:data={todos} let:slotProps={item} onMove={onMoveTodo} dataIdField="id">
      <TodoItems characters={characters} todo={item}
                 onClickCheckbox={onClickCheckbox}
                 onClickDelete={onClickDeleteTodo}
                 onClickEdit={onClickEditTodoButton}
      />
    </DragDropList>
    <AddTodoButton onClick={onClickAddTodoButton}/>
  </div>
  <TodoEditModal isOpen={isEditTodoModalOpen}
                 isEditMode={editTodoModalEditMode}
                 editTodo={editTodoModalTarget}
                 onClose={()=>isEditTodoModalOpen = false}
                 onSubmit={onEditTodo}/>
  <CharacterEditModal isOpen={isAddCharacterModalOpen}
                      onClose={()=>isAddCharacterModalOpen = false}
                      onSubmit={onAddCharacter}/>
</div>
<SvelteToast/>

<style lang="scss">
  .main{
    width:100%;
    text-align: center;
  }
  .container{
    text-align: left;
    display: inline-block;
    width: 1420px;
  }
  @media(max-width: 1420px){
    .container{
      width:calc(100% - 20px)
    }
  }

</style>

