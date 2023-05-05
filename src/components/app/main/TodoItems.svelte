<script lang="ts">
import LargeCheckBox from "../../shared/LargeCheckBox.svelte";
import Label from "../../shared/Label.svelte";
import type {Character} from "../../../storage/dto/character";
import type {Todo} from "../../../storage/dto/todo";
import IconButton from "../../shared/IconButton.svelte";
import MdEdit from 'svelte-icons/md/MdEdit.svelte'
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import Space from "../../shared/Space.svelte";

export let todo:Todo;
export let characters:Character;
export let onClickCheckbox:(type:"right"|"left",todo:Todo, character:Character)=>void;
export let onClickEdit:(todo:Todo)=>void;
export let onClickDelete:(todo:Todo)=>void;
export let isMouseOver=false;

</script>

<div class="item-title-container" on:mouseenter={()=>isMouseOver = true}
     on:mouseleave={()=>isMouseOver = false}>
  {#if todo.repeatType === "daily"}
    <Label color="#70a5e0">일일</Label>
  {/if}
  {#if todo.repeatType === "weeklyMonday"}
    <Label color="#e3b676">주간(월)</Label>
  {/if}
  {#if todo.repeatType === "weeklyThursday"}
    <Label color="#e3b676">주간(목)</Label>
  {/if}
  {#if todo.repeatType === "monthly"}
    <Label color="#e376e1">월간</Label>
  {/if}
  <div class="title" style={`color:${todo.color}`}>
    {todo.name}
  </div>
  <IconButton onClick={()=>onClickEdit(todo)} style={`opacity:${isMouseOver?1:0}`} tooltip="수정">
    <MdEdit fill="gray"/>
  </IconButton>
  <IconButton onClick={()=>onClickDelete(todo)} style={`opacity:${isMouseOver?1:0}`} tooltip="삭제">
    <MdDelete fill="gray"/>
  </IconButton>
</div>
{#if todo.type === "perCharacter"}
  <div class="item-checkbox-lists">
    {#each characters as character (character.id)}
      <LargeCheckBox
        onClick={()=>onClickCheckbox("left",todo, character)}
        onRightClick={()=>onClickCheckbox("right",todo,character)}
        checked={todo.isChecked[character.id] ?? "unchecked"}/>
    {/each}
  </div>
{/if}
{#if todo.type === "perAccount"}
  <LargeCheckBox
    onClick={()=>onClickCheckbox("left",todo)}
    onRightClick={()=>onClickCheckbox("right",todo)}
    checked="{todo.isChecked}"/>
{/if}

<style lang="scss">
  .item-title-container{
    display: inline-flex;
    min-width:500px;
    align-items: center;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;
    .title{
      font-size: 16px;
      margin-left: 10px;
      flex-grow: 1;
      width: 0;
      overflow: hidden;
      word-break: keep-all;
    }
  }
  .item-checkbox-lists{
    display: flex;
    flex-grow: 1;
  }
</style>
