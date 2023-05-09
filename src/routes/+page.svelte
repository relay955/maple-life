<script lang="ts">

  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import {onMount} from "svelte";
  import TodoEditModal from "../components/app/main/TodoEditModal.svelte";
  import moment from "moment";
  import TodoItems from "../components/app/main/TodoItems.svelte";
  import CharacterEditModal from "../components/app/main/CharacterEditModal.svelte";
  import TodoHeader from "../components/app/main/TodoHeader.svelte";
  import AddTodoButton from "../components/app/main/AddTodoButton.svelte";
  import {SvelteToast, toast} from "@zerodevx/svelte-toast";
  import type {Settings} from "../storage/dto/settings";
  import LeftBar from "../components/app/main/LeftBar.svelte";
  import {idb} from "../storage/idb";
  import {migrateFromLocalstorage} from "../storage/migration/migrateFromLocalstorage";
  import {initDefaultData} from "../storage/defaultData";
  import {systemQuery} from "../storage/queries/systemQuery";
  import {liveQuery} from "dexie";

  export const prerender = true;
  export const ssr = true;

  // let characters = liveQuery(
  //   () => idb.character.
  // )
  // let characters:Character[] = [];
  // let todos:Todo[] = []
  // let settings:Settings = {
  //   shortHeightMode:false,
  //   showCharacterPreview:true
  // }

  let isEditTodoModalOpen = false;
  let editTodoModalEditMode = false;
  let editTodoModalTarget:Todo|undefined = undefined;

  let isEditCharacterModalOpen = false;
  let isEditCharacterModalEditMode = false;
  let editCharacterModalTarget:Character|undefined = undefined;


  onMount(async () => {
    await idb.open()
    await migrateFromLocalstorage(idb)
    await initDefaultData(idb)

    setInterval(async () => {
      const today = moment().startOf('day')
      let lastUpdatedinDb = await idb.systemInfo.get("lastUpdated");
      if (lastUpdatedinDb === undefined) {
        console.error("왜 lastupdated가 undefined이지?")
        return;
      }
      const lastUpdated = moment(lastUpdatedinDb.value)

      if (today.isAfter(lastUpdated)) {
        //일퀘/월요일주간퀘/목요일주간퀘/월간퀘 초기화
        idb.todo.toCollection().modify(todo => {
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

        systemQuery.updateLastUpdatedTime()
      }
    }, 1000)
  })

  function onClickCheckbox(type:"right"|"left",item:Todo, character:Character|undefined = undefined) {
    // if(type==="right"){
    //   if (character === undefined) {
    //     item.isChecked = item.isChecked === "blocked" ? "unchecked" : "blocked";
    //   } else {
    //     const targetCharacterChecked = item.isChecked[character.id];
    //     if (targetCharacterChecked === "blocked") {
    //       item.isChecked[character.id] = "unchecked";
    //     } else {
    //       item.isChecked[character.id] = "blocked";
    //     }
    //   }
    // }
    //
    // if(type==="left" && item.isChecked !== "blocked") {
    //   if (character === undefined) {
    //     if (item.isChecked === "checked") {
    //       item.isChecked = "unchecked";
    //     } else if (item.isChecked === "unchecked") {
    //       item.isChecked = "checked";
    //     }
    //   } else {
    //     const targetCharacterChecked = item.isChecked[character.id];
    //     if (targetCharacterChecked === "checked") {
    //       item.isChecked[character.id] = "unchecked";
    //     } else if (targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined) {
    //       item.isChecked[character.id] = "checked";
    //     }
    //   }
    // }
    // todos = todos
    // // saveTodos(todos)
  }

  function onMoveTodo(){
    // todos = todos
    // // saveTodos(todos)
  }

  const onSubmitEditTodo = (todo:Todo) => {
    // const editTargetIndex = todos.findIndex(target => target.id === todo.id)
    // if(editTargetIndex !== -1) {
    //   todos[editTargetIndex] = todo
    // } else {
    //   todos.push(todo)
    // }
    // todos = todos
    // // saveTodos(todos)
  }

  const onClickDeleteTodo = (todo:Todo) => {
    // todos = todos.filter(target => target.id !== todo.id)
    // todos = todos
    // // saveTodos(todos)
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
    // const editTargetIndex = characters.findIndex(target => target.id === character.id)
    // if(editTargetIndex !== -1) {
    //   characters[editTargetIndex] = character
    // } else {
    //   characters.push(character)
    // }
    // characters = characters
    // // saveCharacters(characters)
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

  const onSubmitDeleteCharacter = (character:Character) => {
    // if(characters.length <= 1){
    //   toast.push("최소 1개 이상의 캐릭터가 존재해야합니다.");
    //   return;
    // }
    // characters = characters.filter(target => target.id !== character.id)
    // characters = characters
    // // saveCharacters(characters)
  }
  const onClickShortHeightModeButton = () => {
    // settings.shortHeightMode = !settings.shortHeightMode
    // settings = settings
    // saveSettings(settings)
  };

  const onClickShowCharacterPreviewButton = () => {
    // settings.showCharacterPreview = !settings.showCharacterPreview
    // settings = settings
    // saveSettings(settings)
  };

</script>

<Logo isFixed/>
<LeftBar/>
<Toolbar onClickCharacterAddButton={onClickAddCharacterButton}/>

<!--<div class="main">-->
  <div class="container">
    <TodoHeader onClickCharacter={onClickEditCharacter}/>

<!--    <DragDropList bind:data={todos} let:slotProps={item}-->
<!--                  onMove={onMoveTodo} dataIdField="id">-->
<!--      <TodoItems characters={characters} todo={item}-->
<!--                 onClickCheckbox={onClickCheckbox}-->
<!--                 onClickDelete={onClickDeleteTodo}-->
<!--                 onClickEdit={onClickEditTodoButton}-->
<!--                 settings={settings}-->
<!--      />-->
<!--    </DragDropList>-->
<!--    <AddTodoButton onClick={onClickAddTodoButton}/>-->
  </div>
<!--  <TodoEditModal isOpen={isEditTodoModalOpen}-->
<!--                 isEditMode={editTodoModalEditMode}-->
<!--                 editTodo={editTodoModalTarget}-->
<!--                 onClose={()=>isEditTodoModalOpen = false}-->
<!--                 onSubmit={onSubmitEditTodo}/>-->
<!--  <CharacterEditModal isOpen={isEditCharacterModalOpen}-->
<!--                      isEditMode={isEditCharacterModalEditMode}-->
<!--                      editCharacter={editCharacterModalTarget}-->
<!--                      onClose={()=>isEditCharacterModalOpen = false}-->
<!--                      onDelete={onSubmitDeleteCharacter}-->
<!--                      onSubmit={onSubmitEditCharacter}/>-->
<!--</div>-->
<SvelteToast/>

<style lang="scss">
  .main{
    width:100%;
    text-align: center;
    padding-bottom: 400px;
  }
  .container{
    text-align: left;
    display: inline-block;
    min-width: 1420px;
    margin-left: 60px;
    margin-right: 20px;
  }
  @media(max-width: 1550px){
    .container{
      min-width: calc(100% - 70px);
    }
  }

</style>

