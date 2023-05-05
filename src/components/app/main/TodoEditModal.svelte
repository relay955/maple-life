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



export let isOpen = false;
export let isEditMode = false;
export let editTodo:Todo|undefined = undefined;
export let onClose = () => {};
export let onSubmit = (todo:Todo) => {};

let nameRef;

let todo:Todo = resetTodo()
let todoPresets = getTodoPresets()

function resetTodo():Todo{
  return {
    id:"",
    isChecked: {},
    name:"",
    type:"perCharacter",
    repeatType:"daily",
    color:"default",
  };
}

$: {
  if (editTodo !== undefined && isEditMode) {
    todo = editTodo
  }
}

$: if(isOpen){
  setTimeout(()=> nameRef.focus(),100)
}

const onCloseProxy = () => {
  todo = resetTodo();
  onClose()
}


const onClickSubmitButton = () => {
  todo.isChecked = todo.type === "perCharacter" ? {} : "unchecked";
  if(todo.name.trim() === ""){
    toast.push("할일 이름을 입력해주세요.");
    return;
  }
  if(!isEditMode) todo.id = uuidv4();
  onSubmit(todo);
  todo = resetTodo();
  onCloseProxy()
}

const onSelectAutoComplete = (e:any)=>{
  const todoPreset = todoPresets[e.target.value]
  todo = {
    ...todo,
    ...todoPreset,
  }
}
</script>

<Modal title={isEditMode ? "할일 수정" : "할일 생성"} isOpen={isOpen}
       onClose={onCloseProxy} onEnter={onClickSubmitButton}>
  <Input title="할일 이름" bind:value={todo.name}
         listId="todo-name"
         bind:ref={nameRef}
         useAutoComplete={true} onSelect={(e)=>onSelectAutoComplete(e)}>
  </Input>
  <datalist id="todo-name">
    {#each Object.keys(todoPresets) as todoPresetName (todoPresetName)}
      <option value={todoPresetName}></option>
    {/each}
  </datalist>
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

  <Select title="(옵션) 색상" bind:value={todo.color}>
    <option value="default">검정색</option>
    <option value="#5789ea" style="color:#5789ea">파란색</option>
    <option value="#edac5e" style="color:#edac5e">주황색</option>
  </Select>
  <Button onClick={onClickSubmitButton} style="margin-top: 10px">{isEditMode ? "수정":"생성"}</Button>
</Modal>
