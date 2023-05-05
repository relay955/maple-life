<script lang="ts">
import Input from "../../shared/Input.svelte";
import Select from "../../shared/Select.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import type {Todo} from "../../../storage/dto/todo";
import type {Character} from "../../../storage/dto/character";
import {Jumper} from "svelte-loading-spinners";
import {requestMapleCharacterInfo} from "../../../util/mapleParser";
import {PROXY_URL} from "../../../config";

export let isOpen = false;
let character:Character = reset()
let isEditMode = false;
let isManualMode = false;
let isParsing = false;
export let onClose = () => {};
export let onSubmit = (character:Character) => {};

function reset():Character{
  return {
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
        name: result.nickname,
        classType: result.classType,
        imgUrl: result.imgUrl,
        level: result.level,
      }
    }
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
    {#if isManualMode}<div>서버에서 데이터를 불러오는데 문제가 발생하여 직업 정보를 수동으로 입력해야합니다.</div>{/if}
    <Input title="레벨"/>
    <Input title="직업"/>
  {/if}
  <Button onClick={onClickSubmitButton} isLoading={isParsing} style="margin-top: 10px">생성</Button>
</Modal>
