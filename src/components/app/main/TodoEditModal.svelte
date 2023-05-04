<script lang="ts">
import Input from "../../shared/Input.svelte";
import Select from "../../shared/Select.svelte";
import Modal from "../../shared/Modal.svelte";
import Button from "../../shared/Button.svelte";
import type {Todo} from "../../../storage/dto/todo";

export let isOpen = false;
export let onClose = () => {};
export let onSubmit = (todo:Todo) => {};

const resetTodo = ():Todo => {
  return {
    isChecked: "unchecked",
    name:"",
    type:"perCharacter",
    repeatType:"daily",
    color:"black"
  };
}

let todo:Todo = resetTodo()


const onClickSubmitButton = () => {
  console.log(todo)
  onSubmit(todo);
  todo = resetTodo();
  onClose();
}
</script>

<Modal title="할일 생성" isOpen={isOpen} onClose={onClose}>
  <Input title="할일 이름" bind:value={todo.name} />
  <Select title="초기화 간격" bind:value={todo.repeatType}>
    <option value="daily">일일</option>
    <option value="weeklyMonday">주간(월요일 초기화)</option>
    <option value="weeklyThursday">주간(목요일 초기화)</option>
    <option value="monthly">월간</option>
  </Select>
  <Select title="할일 처리 단위" bind:value={todo.type}>
    <option value="perCharacter">캐릭터 별</option>
    <option value="perAccount">계정 별</option>
  </Select>
  <Button onClick={onClickSubmitButton} style="margin-top: 10px">생성</Button>
</Modal>
