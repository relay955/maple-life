<script lang="ts">
import Input from "../../shared/Input.svelte";
import Select from "../../shared/Select.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import type {Todo} from "../../../storage/dto/todo";
import {v4 as uuidv4} from 'uuid'
import {toast} from "@zerodevx/svelte-toast";
import {getTodoPresets} from "$lib/preset/todoPresets";
import {onMount} from "svelte";
import {idb} from "../../../storage/idb";
import type {Account} from "../../../storage/dto/account";
import {all} from "axios";



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

</script>

<Modal title={isEditMode ? "계정 수정" : "계정 생성"} isOpen={isOpen}
       onClose={onCloseProxy} onEnter={onClickSubmitButton}>
  <Input title="이름" bind:value={account.name}
         bind:ref={nameRef}/>

  <Button onClick={onClickSubmitButton} style="margin-top: 10px">{isEditMode ? "수정":"생성"}</Button>
</Modal>
