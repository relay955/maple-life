<script lang="ts">
import LargeCheckBox from "../../shared/LargeCheckBox.svelte";
import Label from "../../shared/Label.svelte";
import type {Character} from "../../../storage/dto/character";
import type {Todo} from "../../../storage/dto/todo";
import IconButton from "../../shared/IconButton.svelte";
import MdEdit from 'svelte-icons/md/MdEdit.svelte'
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import Space from "../../shared/Space.svelte";
import type {Settings} from "../../../storage/dto/settings";

export let todo:Todo;
export let characters:Character;
export let onClickCheckbox:(type:"right"|"left",todo:Todo, character:Character)=>void;
export let onClickEdit:(todo:Todo)=>void;
export let onClickDelete:(todo:Todo)=>void;
export let isMouseOver=false;
export let settings:Settings;
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
  <div class="title" style={todo.color !== "default" ? `color:${todo.color}`:""}>
    {todo.name}
  </div>
  <div class={`icons ${isMouseOver ? "visible":""}`}>
    <IconButton onClick={()=>onClickEdit(todo)} tooltip="수정"
                size={settings.shortHeightMode ? "small" : "medium"}>
      <MdEdit/>
    </IconButton>
    <IconButton onClick={()=>onClickDelete(todo)} tooltip="삭제"
                size={settings.shortHeightMode ? "small" : "medium"}>
      <MdDelete/>
    </IconButton>
  </div>
</div>
{#if todo.type === "perCharacter"}
  <div class="item-checkbox-lists">
    {#each characters as character (character.id)}
      <LargeCheckBox
        style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}
        ${settings.shortHeightMode?"height:28px;":""} min-width:80px;`}
        onClick={()=>onClickCheckbox("left",todo, character)}
        onRightClick={()=>onClickCheckbox("right",todo,character)}
        checked={todo.isChecked[character.id] ?? "unchecked"}/>
    {/each}
  </div>
{/if}
{#if todo.type === "perAccount"}
  <LargeCheckBox
    style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}
    ${settings.shortHeightMode?"height:28px;":""} min-width:80px;`}
    onClick={()=>onClickCheckbox("left",todo)}
    onRightClick={()=>onClickCheckbox("right",todo)}
    checked="{todo.isChecked}"/>
{/if}

<style lang="scss">
  .item-title-container{
    position: sticky;
    left:60px;

    min-width:500px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;

    display: inline-flex;
    background: white;
    align-items: center;

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
  @media (max-width: 1250px){
    .item-title-container{
      min-width: 300px;
      .title{
        font-size: 12px;
      }
    }
  }
  @media (max-width: 750px){
    .item-title-container{
      min-width: 200px;
      width: 100%;
      margin-bottom: 3px;
      .title{
        font-size: 12px;
      }
      .icons{
        opacity: 1;
      }
    }
  }
  .icons{
    transition: 0.2s all;
    z-index: 3;
    opacity: 0;
  }
  .icons.visible{
    opacity: 1;
  }
</style>
