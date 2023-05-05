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

  let characters:Character[] = [];
  let todos:Todo[] = []
  let isAddTodoModalOpen = false;
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

  const onAddTodo = (todo:Todo) => {
    //이미 이름 같은게 있을경우 key 에러가 발생하므로 예외처리
    if(todos.some(target=>target.name === todo.name))return;

    todos.push(todo);
    todos = todos
    saveTodos(todos)
  }
  const onAddCharacter = (character:Character) =>{
    //이미 이름 같은게 있을경우 key 에러가 발생하므로 예외처리
    if(characters.some(target=>target.name === character.name))return;

    characters.push(character);
    characters = characters
    saveCharacters(characters)
  };

</script>

<Logo/>
<Toolbar onClickCharacterAddButton={()=>isAddCharacterModalOpen = true}/>

<div class="main">
  <div class="container">
    <TodoHeader characters={characters}/>
    <DragDropList bind:data={todos} let:slotProps={item} onMove={onMoveTodo} dataIdField="name">
      <TodoItems characters={characters} onClickCheckbox={onClickCheckbox} todo={item}/>
    </DragDropList>
    <AddTodoButton onClick={()=>isAddTodoModalOpen = true}/>
  </div>
  <TodoEditModal isOpen={isAddTodoModalOpen}
                 onClose={()=>isAddTodoModalOpen = false}
                 onSubmit={onAddTodo}/>
  <CharacterEditModal isOpen={isAddCharacterModalOpen}
                      onClose={()=>isAddCharacterModalOpen = false}
                      onSubmit={onAddCharacter}/>
</div>

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

