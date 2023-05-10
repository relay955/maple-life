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
import {liveQuery} from "dexie";
import {idb} from "../../../storage/idb";
import Select from "../../shared/Select.svelte";
import type {AccountWorld, World} from "../../../storage/dto/world";
import {WorldList} from "../../../storage/dto/world";

export let isOpen = false;
let account = liveQuery(async () => await idb.account.toArray())
let character:Character = reset()
let selectedWorld:World = "리부트"
let isManualMode = true;
let isParsing = false;
export let onClose = () => {};
export let isEditMode = false;
export let editCharacter:Character|undefined = undefined;
export let nameRef;

$: {
  if(editCharacter !== undefined && isEditMode){
    character = editCharacter
  }
}

$: if(isOpen){
  setTimeout(()=> nameRef.focus(),100)
}

account.subscribe((accounts)=>{
  character.accountId = accounts[0].id
})

function reset():Character{
  return {
    name: "",
    classType: "",
    worldId: 0,
    accountId: ($account)?.[0].id ?? 0,
    imgUrl: "",
    level: 1,
    order: 0
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
      character.name = result.nickname;
      character.classType = result.classType;
      character.imgUrl = result.imgUrl;
      character.level = result.level;
    }else{
      if(character.level < 1 || character.level > 300){
        toast.push("레벨은 1~300 사이입니다.");
        return;
      }
    }
    if(!isEditMode) character.order = (await idb.character
      .filter(c => c.worldId === character.worldId).count()+1)

    character.worldId = await getOrCreateWorld(character.accountId, selectedWorld)
    await idb.character.put(character)
    onCloseProxy()
  }catch (e){
    isManualMode = true;
  }finally {
    isParsing = false;
  }
}

async function getOrCreateWorld(accountId: number, worldName: World) {
  let worldInAccount = await idb.accountWorld.where("accountId")
    .equals(accountId)
    .toArray()

  let targetWorld = worldInAccount
    .filter(accountWorld => accountWorld.world === worldName)
    .pop()

  if (targetWorld === undefined) {
    let newWorld:AccountWorld = {
      accountId: $account[0].id,
      world: worldName,
      order: 0,
    }

    worldInAccount.forEach((world)=>{
      if(world.order >= newWorld.order) world.order = newWorld.order
    })
    newWorld.order ++;

    return idb.accountWorld.add(newWorld);
  }else{
    return targetWorld.id!
  }
}

const onClickDeleteButton = async () => {
  if (isParsing) {
    toast.push("캐릭터 정보를 불러오는 중입니다. 잠시만 기다려 주세요.")
    return;
  }
  if ((await idb.character.count()) <= 1) {
    toast.push("최소 1개 이상의 캐릭터가 존재해야합니다.");
    return;
  }
  await idb.character.delete(character.id!)
  onCloseProxy()
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
    <Select bind:value={character.accountId}>
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
  .delete-button{
    margin-left: 10px;
  }
</style>
