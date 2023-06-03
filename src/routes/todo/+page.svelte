<script lang="ts">
  import Toolbar from "./Toolbar.svelte";
  import type {Character} from "../../storage/dto/character";
  import type {Todo} from "../../storage/dto/todo";
  import TodoEditModal from "./TodoEditModal.svelte";
  import CharacterEditModal from "./CharacterEditModal.svelte";
  import TodoHeader from "./TodoHeader.svelte";
  import AddTodoButton from "./AddTodoButton.svelte";
  import TodoList from "./TodoList.svelte";
  import type {Account} from "../../storage/dto/account";
  import AccountEditModal from "./AccountEditModal.svelte";
  import TodoMemo from "./TodoMemo.svelte";
  import PageContainer
    from "../../components/basicComponent/PageContainer.svelte";


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

<PageContainer>
  <TodoHeader onClickCharacter={onClickEditCharacter} onClickAccountBar={onClickEditAccount}/>
  <TodoMemo/>
  <TodoList onClickEditTodoButton={onClickEditTodoButton}/>
  <AddTodoButton onClick={onClickAddTodoButton}/>
</PageContainer>

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

