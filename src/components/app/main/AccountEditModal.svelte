<script lang="ts">
import Select from "../../shared/Select.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import {toast} from "@zerodevx/svelte-toast";
import {idb} from "../../../storage/idb";
import type {Account} from "../../../storage/dto/account";
import IconButton from "../../shared/IconButton.svelte";
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import Input from "../../shared/Input.svelte";



export let isOpen = false;
export let isEditMode = false;
export let editAccount:Account|undefined = undefined;
export let onClose = () => {};

let nameRef;

let account:Account = resetAccount()

function resetAccount():Account{
  return {
    name:"",
    order:0,
  };
}

$: {
  if (editAccount !== undefined && isEditMode) {
    account = editAccount
  }
}

$: if(isOpen){
  setTimeout(()=> nameRef.focus(),100)
}

const onCloseProxy = () => {
  account = resetAccount();
  onClose()
}


const onClickSubmitButton = async () => {
  if (account.name.trim() === "") {
    toast.push("계정 이름을 입력해주세요.");
    return;
  }
  if(!isEditMode) {
    const allAccounts = await idb.account.toArray()
    allAccounts.forEach((item) => {
      if (item.order > account.order) account.order = item.order
    })
    account.order ++;
  }

  idb.account.put(account)
  account = resetAccount();
  onCloseProxy()
}

const onClickDeleteButton = async () => {
  if(account.id === undefined) return;
  if(await idb.account.count() <= 1) {
    toast.push("계정은 최소 1개 이상이어야 합니다.");
    return;
  }
  const deleteTargetCharactersId = await idb.character.where("accountId").equals(account.id).primaryKeys()
  if(deleteTargetCharactersId.length === await idb.character.count()){
    toast.push("해당 계정이 삭제되면 모든 캐릭터가 제거되므로 삭제할 수 없습니다.");
    return;
  }
  let result = confirm("경고: 계정을 삭제하면 계정에 포함된 모든 캐릭터 정보가 삭제됩니다. 삭제하시겠습니까?")
  if(result === false) return;
  await idb.character.bulkDelete(deleteTargetCharactersId)
  await idb.account.delete(account.id)
  onCloseProxy()
}

</script>

<Modal title={isEditMode ? "계정 수정" : "계정 생성"} isOpen={isOpen}
       onClose={onCloseProxy} onEnter={onClickSubmitButton}>
  <Input title="이름" bind:value={account.name}
         bind:ref={nameRef}/>

  <div class="button-container">
    <div class="submit-button">
      <Button onClick={onClickSubmitButton}>{isEditMode ? "수정":"생성"}</Button>
    </div>

      {#if isEditMode}
        <IconButton onClick={onClickDeleteButton} style="margin-left: 10px" >
          <MdDelete/>
        </IconButton>
      {/if}
  </div>
</Modal>

<style>
  .button-container{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }
  .submit-button{
    flex-grow: 1;
  }
</style>
