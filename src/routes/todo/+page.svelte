<script lang="ts">
  import Toolbar from "../../components/app/_todo/Toolbar.svelte";
  import type {Character} from "../../storage/dto/character";
  import type {Todo} from "../../storage/dto/todo";
  import {onMount} from "svelte";
  import TodoEditModal from "../../components/app/_todo/TodoEditModal.svelte";
  import CharacterEditModal from "../../components/app/_todo/CharacterEditModal.svelte";
  import TodoHeader from "../../components/app/_todo/TodoHeader.svelte";
  import AddTodoButton from "../../components/app/_todo/AddTodoButton.svelte";
  import TodoList from "../../components/app/_todo/TodoList.svelte";
  import type {Account} from "../../storage/dto/account";
  import AccountEditModal from "../../components/app/_todo/AccountEditModal.svelte";
  import {
    lqMemo,
    lqShowMemo,
    updateMemo
  } from "../../storage/queries/systemQuery";
  import TodoMemo from "../../components/app/_todo/TodoMemo.svelte";


  let isEditTodoModalOpen = false;
  let editTodoModalEditMode = false;
  let editTodoModalTarget:Todo|undefined = undefined;

  let isEditCharacterModalOpen = false;
  let isEditCharacterModalEditMode = false;
  let editCharacterModalTarget:Character|undefined = undefined;

  let isEditAccountModalOpen = false;
  let isEditAccountModalEditMode = false;
  let isEditAccountModalTarget:Account|undefined = undefined;

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

  const onClickEditAccount = (account:Account) => {
    isEditAccountModalOpen = true;
    isEditAccountModalEditMode = true;
    isEditAccountModalTarget = account;
  }

</script>

<Toolbar onClickCharacterAddButton={onClickAddCharacterButton}
         onClickAccountAddButton={onClickAddAccountButton}/>

<div class="container">
  <TodoHeader onClickCharacter={onClickEditCharacter} onClickAccountBar={onClickEditAccount}/>
  <TodoMemo/>
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

<style lang="scss">
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

