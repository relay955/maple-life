<script lang="ts">
import LargeCheckBox from "../../../shared/LargeCheckBox.svelte";
import Label from "../../../shared/Label.svelte";
import type {Character} from "../../../../storage/dto/character";
import type {Todo} from "../../../../storage/dto/todo";
import IconButton from "../../../shared/IconButton.svelte";
import MdEdit from 'svelte-icons/md/MdEdit.svelte'
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import Space from "../../../shared/Space.svelte";
import type {Settings} from "../../../../storage/dto/settings";
import {liveQuery} from "dexie";
import {idb} from "../../../../storage/idb";
import {characterQuery} from "../../../../storage/queries/characterQuery";
import {calcAccountCharacterCount} from "../../../../storage/dto/account.js";

export let todo:Todo;
export let onClickEdit:(todo:Todo)=>void;
export let isMouseOver=false;

let shortHeightMode = liveQuery(async () => (await idb.settings.get("shortHeightMode"))?.value)

let characterTree = liveQuery(characterQuery.generateCharacterTree)

const onClickCheckbox = (type:"right"|"left",item:Todo,checkId:string) =>{
  if(type==="right"){
    const targetCharacterChecked = item.isChecked[checkId];
    if (targetCharacterChecked === "blocked") {
      item.isChecked[checkId] = "unchecked";
    } else {
      item.isChecked[checkId] = "blocked";
    }
  }

  if(type==="left" && item.isChecked !== "blocked") {
    const targetCharacterChecked = item.isChecked[checkId];
    if (targetCharacterChecked === "checked") {
      item.isChecked[checkId] = "unchecked";
    } else if (targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined) {
      item.isChecked[checkId] = "checked";
    }
  }
  idb.todo.put(item)
}

const onClickDelete = (todo:Todo) => idb.todo.delete(todo.id!)

</script>

<div class={`item-title-container ${$shortHeightMode ? "short-height":""}`} on:mouseenter={()=>isMouseOver = true}
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
                size={$shortHeightMode ? "small" : "medium"}>
      <MdEdit/>
    </IconButton>
    <IconButton onClick={()=>onClickDelete(todo)} tooltip="삭제"
                size={$shortHeightMode ? "small" : "medium"}>
      <MdDelete/>
    </IconButton>
  </div>
</div>
<div class="checkbox-lists">
{#if todo.type === "perCharacter"}
  {#each ($characterTree ?? []) as account (account.id)}
    {#each account.worlds as world (world.id)}
      {#each world.characters as character (character.id)}
      <div class="checkbox-item" style={`min-width:80px;`}>
        <LargeCheckBox
          isShortHeight={$shortHeightMode}
          style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
          onClick={()=>onClickCheckbox("left",todo, `${character.id}`)}
          onRightClick={()=>onClickCheckbox("right",todo,`${character.id}`)}
          checked={todo.isChecked[character.id] ?? "unchecked"}/>
      </div>
      {/each}
    {/each}
  {/each}
{/if}
{#if todo.type === "perWorld"}
  {#each ($characterTree ?? []) as account (account.id)}
    {#each account.worlds as world (world.id)}
      <div class="checkbox-item" style={`min-width:80px; flex-grow:${world.characters.length}`}>
        <LargeCheckBox
          isShortHeight={$shortHeightMode}
          style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
          onClick={()=>onClickCheckbox("left",todo,`${account.id}:${world.id}`)}
          onRightClick={()=>onClickCheckbox("right",todo,`${account.id}:${world.id}`)}
          checked={todo.isChecked[`${account.id}:${world.id}`] ?? "unchecked"}/>
      </div>
    {/each}
  {/each}
{/if}
{#if todo.type === "perAccount"}
  {#each ($characterTree ?? []) as account (account.id)}
    <div class="checkbox-item" style={`min-width:80px; flex-grow:${calcAccountCharacterCount(account)}`}>
      <LargeCheckBox
        isShortHeight={$shortHeightMode}
        style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
        onClick={()=>onClickCheckbox("left",todo,`${account.id}`)}
        onRightClick={()=>onClickCheckbox("right",todo,`${account.id}`)}
        checked={todo.isChecked[account.id] ?? "unchecked"}/>
    </div>
  {/each}
{/if}
</div>

<style lang="scss">
  .item-title-container{
    position: sticky;
    height:40px;
    left:61px;
    &.short-height{
      height: 28px;
    }

    min-width:500px;
    padding-left: 10px;
    padding-right: 10px;
    box-sizing: border-box;

    display: inline-flex;
    background: white;
    align-items: center;
    transition: 0.2s all;

    .title{
      font-size: 16px;
      margin-left: 10px;
      flex-grow: 1;
      width: 0;
      overflow: hidden;
      word-break: keep-all;
    }
  }

  .checkbox-lists{
    display: flex;
    flex-grow: 1;
  }

  .checkbox-item{
    display: flex;
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
