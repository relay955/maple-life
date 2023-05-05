<script lang="ts">
import Input from "../../shared/Input.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import type {Character} from "../../../storage/dto/character";
import {requestMapleCharacterInfo} from "../../../util/mapleParser";
import {PROXY_URL} from "../../../config";
import { toast } from '@zerodevx/svelte-toast'
import NumberInput from "../../shared/NumberInput.svelte";
import {v4 as uuidv4} from "uuid";
import IconButton from "../../shared/IconButton.svelte";
import MdDelete from 'svelte-icons/md/MdDelete.svelte'

export let isOpen = false;
let character:Character = reset()
let isManualMode = false;
let isParsing = false;
export let onClose = () => {};
export let onSubmit = (character:Character) => {};
export let isEditMode = false;
export let editCharacter:Character|undefined = undefined;
export let onDelete = (character:Character) => {};
export let nameRef;

$: {
  if(editCharacter !== undefined && isEditMode){
    character = editCharacter
  }
}

$: if(isOpen){
  setTimeout(()=> nameRef.focus(),100)
}

function reset():Character{
  return {
    id:"",
    name:"",
    classType:"",
    imgUrl:"",
    level:1
  };
}

const onClickSubmitButton = async () => {
  if(character.name.trim() === ""){
    toast.push("캐릭터 이름을 입력해주세요.");
    return;
  }
  try {
    if (!isManualMode) {
      isParsing = true;
      const result = await requestMapleCharacterInfo(character.name, PROXY_URL)
      isParsing = false;
      character = {
        id: isEditMode ? character.id : uuidv4(),
        name: result.nickname,
        classType: result.classType,
        imgUrl: result.imgUrl,
        level: result.level,
      }
    }else{
      if(character.level < 1 || character.level > 300){
        toast.push("레벨은 1~300 사이입니다.");
        return;
      }
      character.id = uuidv4()
    }
    onSubmit(character);
    onCloseProxy()
  }catch (e){
    isManualMode = true;
  }finally {
    isParsing = false;
  }
}

const onClickDeleteButton = () => {
  onDelete(character);
  onCloseProxy()
}



const onCloseProxy = () => {
  if(isParsing) {
    toast.push("캐릭터 정보를 불러오는 중입니다. 잠시만 기다려 주세요.")
    return;
  }
  character = reset();
  isManualMode = false;
  onClose()
}

</script>

<Modal title={isEditMode ? "캐릭터 수정":"캐릭터 등록"}
       isOpen={isOpen} onClose={onCloseProxy} onEnter={onClickSubmitButton}>
  <Input title="닉네임" bind:value={character.name} bind:ref={nameRef} />
  {#if isManualMode}
    <div class="error-message">서버에서 데이터를 불러오는데 문제가 발생하여<br/>직업 정보를 수동으로 입력해야합니다.</div>
    <NumberInput title="레벨" bind:value={character.level}/>
    <Input title="직업" bind:value={character.classType}/>
  {/if}
  <div class="button-container">
    <div class="submit-button">
      <Button onClick={onClickSubmitButton}
              isLoading={isParsing}>{isEditMode ? "수정":"생성"}</Button>
    </div>
    {#if isEditMode}
      <IconButton onClick={onClickDeleteButton} style="margin-left: 10px" >
        <MdDelete/>
      </IconButton>
    {/if}
  </div>
</Modal>


<style>
  .error-message{
    color: red;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
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
  .delete-button{
    margin-left: 10px;
  }
</style>
