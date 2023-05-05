<script lang="ts">
import LargeCheckBox from "../../shared/LargeCheckBox.svelte";
import Label from "../../shared/Label.svelte";
import type {Character} from "../../../storage/dto/character";
import type {Todo} from "../../../storage/dto/todo";

export let todo:Todo;
export let characters:Character;
export let onClickCheckbox:(todo:Todo, character:Character)=>void;

</script>

<div class="item-title-container">
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
</div>
{#if todo.type === "perCharacter"}
  <div class="item-checkbox-lists">
    {#each characters as character (character.name)}
      <LargeCheckBox
        onClick={()=>onClickCheckbox(todo, character)}
        checked={todo.isChecked[character.name] ?? "unchecked"}/>
    {/each}
  </div>
{/if}
{#if todo.type === "perAccount"}
  <LargeCheckBox
    onClick={()=>onClickCheckbox(todo)}
    checked="{todo.isChecked}"/>
{/if}

<style lang="scss">
  .item-title-container{
    display: inline-flex;
    min-width:500px;
    align-items: center;
  .title{
    font-size: 16px;
    margin-left: 10px;
    }
  }
  .item-checkbox-lists{
    display: flex;
    flex-grow: 1;
  }
</style>
