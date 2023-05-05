<script lang="ts">
import Input from "../../shared/Input.svelte";
import Select from "../../shared/Select.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import type {Todo} from "../../../storage/dto/todo";
import type {Character} from "../../../storage/dto/character";

export let isOpen = false;
export let onClose = () => {};
export let onSubmit = (character:Character) => {};

const reset = ():Character => {
  return {
    name:"",
    classType:"",
    imgUrl:"",
    level:1
  };
}

let character:Character = reset()


const onClickSubmitButton = () => {
  onSubmit(character);
  character = reset();
  onClose();
}
</script>

<Modal title="캐릭터 등록" isOpen={isOpen} onClose={onClose}>
  <Input title="닉네임" bind:value={character.name} />
  <Button onClick={onClickSubmitButton} style="margin-top: 10px">생성</Button>
</Modal>
