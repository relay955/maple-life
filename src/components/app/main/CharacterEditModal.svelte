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

export let isOpen = false;
let character:Character = reset()
let isEditMode = false;
let isManualMode = false;
let isParsing = false;
export let onClose = () => {};
export let onSubmit = (character:Character) => {};

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
  try {
    if (!isManualMode) {
      isParsing = true;
      const result = await requestMapleCharacterInfo(character.name, PROXY_URL)
      character = {
        id: uuidv4(),
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
    }
    character.id = uuidv4()
    onSubmit(character);
    onClose();
  }catch (e){
    isManualMode = true;
  }finally {
    isParsing = false;
  }
}
</script>

<Modal title="캐릭터 등록" isOpen={isOpen} onClose={onClose}>
  <Input title="닉네임" bind:value={character.name} />
  {#if isEditMode || isManualMode}
    {#if isManualMode}
      <div class="error-message">서버에서 데이터를 불러오는데 문제가 발생하여<br/>직업 정보를 수동으로 입력해야합니다.</div>
    {/if}
    <NumberInput title="레벨" bind:value={character.level}/>
    <Input title="직업" bind:value={character.classType}/>
  {/if}
  <Button onClick={onClickSubmitButton} isLoading={isParsing} style="margin-top: 10px">생성</Button>
</Modal>


<style>
  .error-message{
    color: red;
    font-size: 12px;
    margin-top: 5px;
    margin-bottom: 5px;
  }
</style>
