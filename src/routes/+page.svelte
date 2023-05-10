<script lang="ts">

  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/shared/Logo.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";
  import type {Character} from "../storage/dto/character";
  import type {Todo} from "../storage/dto/todo";
  import {onMount} from "svelte";
  import TodoEditModal from "../components/app/main/TodoEditModal.svelte";
  import moment from "moment";
  import TodoItems from "../components/app/main/TodoList/TodoItems.svelte";
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
  import TodoList from "../components/app/main/TodoList.svelte";
  import type {Account} from "../storage/dto/account";
  import AccountEditModal from "../components/app/main/AccountEditModal.svelte";

  export const prerender = true;
  export const ssr = true;

  let isEditTodoModalOpen = false;
  let editTodoModalEditMode = false;
  let editTodoModalTarget:Todo|undefined = undefined;

  let isEditCharacterModalOpen = false;
  let isEditCharacterModalEditMode = false;
  let editCharacterModalTarget:Character|undefined = undefined;

  let isEditAccountModalOpen = false;
  let isEditAccountModalEditMode = false;
  let isEditAccountModalTarget:Account|undefined = undefined;


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

            Object.keys(todo.isChecked as object).forEach(key =>
              todo.isChecked[key] = todo.isChecked[key] === "blocked" ? "blocked" : "unchecked"
            )
          }
        })
        systemQuery.updateLastUpdatedTime()
      }
    }, 1000)
  })

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

  const onClickAddCharacterButton = () => {
    isEditCharacterModalOpen = true;
    isEditCharacterModalEditMode = false;
    editCharacterModalTarget = undefined;
  }

  const onClickAddAccountButton = () => {
    isEditAccountModalOpen = true;
    isEditAccountModalEditMode = false;
    isEditAccountModalTarget = undefined;
  }

  const onClickEditCharacter = (character:Character) => {
    isEditCharacterModalOpen = true;
    isEditCharacterModalEditMode = true;
    editCharacterModalTarget = character;
  }

</script>

<Logo isFixed/>
<LeftBar/>
<Toolbar onClickCharacterAddButton={onClickAddCharacterButton} onClickAccountAddButton={onClickAddAccountButton}/>

<!--<div class="main">-->
  <div class="container">
    <TodoHeader onClickCharacter={onClickEditCharacter}/>
    <TodoList onClickEditTodoButton={onClickEditTodoButton}/>
    <AddTodoButton onClick={onClickAddTodoButton}/>
  </div>
  <TodoEditModal isOpen={isEditTodoModalOpen}
                 isEditMode={editTodoModalEditMode}
                 editTodo={editTodoModalTarget}
                 onClose={()=>isEditTodoModalOpen = false}/>
  <CharacterEditModal isOpen={isEditCharacterModalOpen}
                      isEditMode={isEditCharacterModalEditMode}
                      editCharacter={editCharacterModalTarget}
                      onClose={()=>isEditCharacterModalOpen = false}/>
  <AccountEditModal isOpen={isEditAccountModalOpen}
                      isEditMode={isEditAccountModalEditMode}
                      editAccount={isEditAccountModalTarget}
                      onClose={()=>isEditAccountModalOpen = false}/>
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
    padding-bottom: 400px;
  }
  @media(max-width: 1550px){
    .container{
      min-width: calc(100% - 70px);
    }
  }

</style>

