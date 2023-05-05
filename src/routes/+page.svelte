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
  import TodoEditModal from "../components/app/main/TodoEditModal.svelte";
  import moment from "moment";
  import {getDefaultCharacters, getDefaultTodos} from "$lib/preset/defaultItems";
  import TodoItems from "../components/app/main/TodoItems.svelte";
  import CharacterEditModal from "../components/app/main/CharacterEditModal.svelte";
  import TodoHeader from "../components/app/main/TodoHeader.svelte";
  import AddTodoButton from "../components/app/main/AddTodoButton.svelte";
  import {SvelteToast, toast} from "@zerodevx/svelte-toast";

  let characters:Character[] = [];
  let todos:Todo[] = []
  let isEditTodoModalOpen = false;
  let editTodoModalEditMode = false;
  let editTodoModalTarget:Todo|undefined = undefined;

  let isEditCharacterModalOpen = false;
  let isEditCharacterModalEditMode = false;
  let editCharacterModalTarget:Character|undefined = undefined;

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

  function onClickCheckbox(type:"right"|"left",item:Todo, character:Character|undefined = undefined) {
    if(type==="right"){
      if (character === undefined) {
        item.isChecked = item.isChecked === "blocked" ? "unchecked" : "blocked";
      } else {
        const targetCharacterChecked = item.isChecked[character.id];
        if (targetCharacterChecked === "blocked") {
          item.isChecked[character.id] = "unchecked";
        } else {
          item.isChecked[character.id] = "blocked";
        }
      }
    }

    if(type==="left" && item.isChecked !== "blocked") {
      if (character === undefined) {
        if (item.isChecked === "checked") {
          item.isChecked = "unchecked";
        } else if (item.isChecked === "unchecked") {
          item.isChecked = "checked";
        }
      } else {
        const targetCharacterChecked = item.isChecked[character.id];
        if (targetCharacterChecked === "checked") {
          item.isChecked[character.id] = "unchecked";
        } else if (targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined) {
          item.isChecked[character.id] = "checked";
        }
      }
    }
    todos = todos
    saveTodos(todos)
  }

  function onMoveTodo(){
    todos = todos
    saveTodos(todos)
  }

  const onSubmitEditTodo = (todo:Todo) => {
    const editTargetIndex = todos.findIndex(target => target.id === todo.id)
    if(editTargetIndex !== -1) {
      todos[editTargetIndex] = todo
    } else {
      todos.push(todo)
    }
    todos = todos
    saveTodos(todos)
  }

  const onClickDeleteTodo = (todo:Todo) => {
    todos = todos.filter(target => target.id !== todo.id)
    todos = todos
    saveTodos(todos)
  }

  const onClickAddTodoButton = () => {
    isEditTodoModalOpen = true;
    editTodoModalEditMode = false;
    editTodoModalTarget = undefined;
  }

  const onClickEditTodoButton = (todo:Todo) => {
    isEditTodoModalOpen = true;
    editTodoModalEditMode = true;
    editTodoModalTarget = todo;
  }

  const onSubmitEditCharacter = (character:Character) =>{
    const editTargetIndex = characters.findIndex(target => target.id === character.id)
    if(editTargetIndex !== -1) {
      characters[editTargetIndex] = character
    } else {
      characters.push(character)
    }
    characters = characters
    saveCharacters(characters)
  };

  const onClickAddCharacterButton = () => {
    isEditCharacterModalOpen = true;
    isEditCharacterModalEditMode = false;
    editCharacterModalTarget = undefined;
  }

  const onClickEditCharacter = (character:Character) => {
    isEditCharacterModalOpen = true;
    isEditCharacterModalEditMode = true;
    editCharacterModalTarget = character;
  }

  const onChangeOrderCharacter = (firstCharacter:Character,secondCharacter:Character) => {
    const firstCharacterIndex = characters.findIndex(target => target.id === firstCharacter.id)
    const secondCharacterIndex = characters.findIndex(target => target.id === secondCharacter.id)
    if(firstCharacterIndex === -1 || secondCharacterIndex === -1){
      return;
    }
    const temp = characters[firstCharacterIndex]
    characters[firstCharacterIndex] = characters[secondCharacterIndex]
    characters[secondCharacterIndex] = temp

    characters = characters
    saveCharacters(characters)
  }

  const onSubmitDeleteCharacter = (character:Character) => {
    if(characters.length <= 1){
      toast.push("최소 1개 이상의 캐릭터가 존재해야합니다.");
      return;
    }
    characters = characters.filter(target => target.id !== character.id)
    characters = characters
    saveCharacters(characters)
  }

</script>

<Logo/>
<Toolbar onClickCharacterAddButton={onClickAddCharacterButton}/>

<div class="main">
  <div class="container">
    <TodoHeader characters={characters}
                onClickCharacter={onClickEditCharacter}
                onChangeOrderCharacter={onChangeOrderCharacter}/>
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
                 onSubmit={onSubmitEditTodo}/>
  <CharacterEditModal isOpen={isEditCharacterModalOpen}
                      isEditMode={isEditCharacterModalEditMode}
                      editCharacter={editCharacterModalTarget}
                      onClose={()=>isEditCharacterModalOpen = false}
                      onDelete={onSubmitDeleteCharacter}
                      onSubmit={onSubmitEditCharacter}/>
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

