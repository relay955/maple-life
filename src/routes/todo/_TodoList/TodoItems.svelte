<script lang="ts">
import LargeCheckBox from "./LargeCheckBox.svelte";
import Label from "../../../components/basicComponent/Label.svelte";
import type {Todo} from "../../../storage/dto/todo";
import IconButton from "../../../components/basicComponent/IconButton.svelte";
import MdEdit from 'svelte-icons/md/MdEdit.svelte'
import MdDelete from 'svelte-icons/md/MdDelete.svelte'
import {idb} from "../../../storage/idb";
import {calcAccountCharacterCount} from "../../../storage/dto/account.js";
import {lqCharacterTree} from "../../../storage/queries/characterQuery";
import {lqShortHeightMode} from "../../../storage/queries/systemQuery";
import {deleteTodo} from "../../../storage/queries/todoQuery";

export let todo:Todo;
export let onClickEdit:(todo:Todo)=>void;
export let isMouseOver=false;

const onClickCheckbox = (type:"right"|"left",item:Todo,checkId:string) =>{
  if(type==="right"){
    const targetCharacterChecked = item.isChecked[checkId];
    item.isChecked[checkId] = targetCharacterChecked === "blocked" ? "unchecked" : "blocked";
  }

  if(type==="left" && item.isChecked[checkId] !== "blocked") {
    const targetCharacterChecked = item.isChecked[checkId];
    if (targetCharacterChecked === "checked") {
      item.isChecked[checkId] = "unchecked";
    } else if (targetCharacterChecked === "unchecked" || targetCharacterChecked === undefined) {
      item.isChecked[checkId] = "checked";
    }
  }
  idb.todo.put(item)
}

</script>

<div class={`item-title-container ${$lqShortHeightMode ? "short-height":""}`} on:mouseenter={()=>isMouseOver = true}
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
                size={$lqShortHeightMode ? "small" : "medium"}>
      <MdEdit/>
    </IconButton>
    <IconButton onClick={()=>deleteTodo(todo)} tooltip="삭제"
                size={$lqShortHeightMode ? "small" : "medium"}>
      <MdDelete/>
    </IconButton>
  </div>
</div>
<div class="checkbox-lists">
{#if todo.type === "perCharacter"}
  {#each ($lqCharacterTree ?? []) as account (account.id)}
    {#each account.worlds ?? [] as world (world.id)}
      {#each world.characters ?? [] as character (character.id)}
      <div class="checkbox-item" style={`min-width:80px;`}>
        <LargeCheckBox
          isShortHeight={$lqShortHeightMode}
          style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
          onClick={()=>onClickCheckbox("left",todo, `${character.id}`)}
          onRightClick={()=>onClickCheckbox("right",todo,`${character.id}`)}
          checked={todo.isChecked[character.id ?? 0] ?? "unchecked"}/>
      </div>
      {/each}
    {/each}
  {/each}
{/if}
{#if todo.type === "perWorld"}
  {#each ($lqCharacterTree ?? []) as account (account.id)}
    {#each account.worlds ?? [] as world (world.id)}
      <div class="checkbox-item" style={`min-width:80px; flex-grow:${world.characters?.length}`}>
        <LargeCheckBox
          isShortHeight={$lqShortHeightMode}
          style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
          onClick={()=>onClickCheckbox("left",todo,`${world.id}`)}
          onRightClick={()=>onClickCheckbox("right",todo,`${world.id}`)}
          checked={todo.isChecked[`${world.id}`] ?? "unchecked"}/>
      </div>
    {/each}
  {/each}
{/if}
{#if todo.type === "perAccount"}
  {#each ($lqCharacterTree ?? []) as account (account.id)}
  {#if (account.worlds?.length ?? 0) > 0}
    <div class="checkbox-item" style={`min-width:80px; flex-grow:${calcAccountCharacterCount(account)}`}>
      <LargeCheckBox
        isShortHeight={$lqShortHeightMode}
        style={`${todo.color !== "default"?`background-color:${todo.color}22;`:""}`}
        onClick={()=>onClickCheckbox("left",todo,`${account.id}`)}
        onRightClick={()=>onClickCheckbox("right",todo,`${account.id}`)}
        checked={todo.isChecked[account?.id ?? 0] ?? "unchecked"}/>
    </div>
  {/if}
  {/each}
{/if}
</div>

<style lang="scss">
  .item-title-container{
    position: sticky;
    height:40px;
    left:50px;
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
    flex-grow: 1;
    width:0;
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
