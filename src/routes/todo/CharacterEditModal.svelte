<script lang="ts">
import Input from "../../components/basicComponent/Input.svelte";
import Modal from "../../components/Modal.svelte";
import Button from "../../components/basicComponent/Button.svelte";
import type {Character} from "../../storage/dto/character";
import {PROXY_URL} from "../../config";
import { toast } from '@zerodevx/svelte-toast'
import NumberInput from "../../components/basicComponent/NumberInput.svelte";
import IconButton from "../../components/basicComponent/IconButton.svelte";
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import {liveQuery} from "dexie";
import {idb} from "../../storage/idb";
import Select from "../../components/basicComponent/Select.svelte";
import type {AccountWorld, World} from "../../storage/dto/world";
import {WorldList} from "../../storage/dto/world";
import {insertWorldOrGetWorldId} from "../../storage/queries/worldQuery.js";
import {
  deleteCharacter,
  putCharacter
} from "../../storage/queries/characterQuery";
import {
  requestMapleCharacterBasicInfo
} from "../../util/mapleParser/mapleParserRequester";

export let isOpen = false;
let account = liveQuery(async () => await idb.account.toArray())
let character:Character = reset()
let selectedWorld:World = "리부트"
let isManualMode = false;
let isParsing = false;

export let onClose = () => {};
export let isEditMode = false;
export let editCharacter:Character|undefined = undefined;
 let nameRef;

$: {
  if(editCharacter !== undefined && isEditMode){
    character = editCharacter
  }
}

$: if(isOpen){
  setTimeout(()=> nameRef.focus(),100)
}

account.subscribe((accounts)=>{
  if(accounts.length === 0) return;
  character.accountId = accounts[0].id!
})

function reset():Character{
  return {
    name: "",
    classType: "",
    worldId: 0,
    accountId: ($account)?.[0].id ?? 0,
    imgUrl: "",
    level: 1,
    order: 0,
    useTodo:true,
    orderInCharacterPage:0,
    spec:{}
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
      const result = await requestMapleCharacterBasicInfo(character.name)
      isParsing = false;
      character.name = result.nickname;
      character.classType = result.classType;
      character.imgUrl = result.imgUrl;
      character.level = result.level;
      character.detailInfoKey = result.detailInfoKey;
      character.worldId = await insertWorldOrGetWorldId(character.accountId, result.world as World)
      character.isReboot = result.world.includes("리부트")
    }else{
      if(character.level < 1 || character.level > 300){
        toast.push("레벨은 1~300 사이입니다.");
        return;
      }
      character.worldId = await insertWorldOrGetWorldId(character.accountId, selectedWorld)
      character.isReboot = selectedWorld.includes("리부트")
    }

    await putCharacter(character)
    onCloseProxy()
  }catch (e){
    isManualMode = true;
  }finally {
    isParsing = false;
  }
}

const onClickDeleteButton = async () => {
  if (isParsing) {
    toast.push("캐릭터 정보를 불러오는 중입니다. 잠시만 기다려 주세요.")
    return;
  }
  try{
    await deleteCharacter(character)
    onCloseProxy()
  }catch (e:any){
    toast.push(e.message)
  }
}

const onCloseProxy = () => {
  if (isParsing) {
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
  {#if ($account ?? []).length > 1}
    <Select bind:value={character.accountId} title="계정">
      {#each $account as account}
        <option value={account.id}>{account.name}</option>
      {/each}
    </Select>
  {/if}
  {#if isManualMode}
    <div class="error-message">서버에서 데이터를 불러오는데 문제가 발생하여<br/>직업 정보를 수동으로 입력해야합니다.</div>
    <NumberInput title="레벨" bind:value={character.level}/>
    <Input title="직업" bind:value={character.classType}/>
    <Select title="월드" bind:value={selectedWorld}>
      {#each Object.keys(WorldList) as world}
        <option value={world}>{world}</option>
      {/each}
    </Select>
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
</style>
