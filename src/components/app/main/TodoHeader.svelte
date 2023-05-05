<script lang="ts">
  import type {Character} from "../../../storage/dto/character";

  export let characters:Character[];
  export let onClickCharacter:(character:Character)=>void;
</script>
<div class="header">
  <div class="title">할일</div>
  {#each characters as character (character.name)}
    <div class="character" on:click={()=>onClickCharacter(character)}>
      <div>
        <div class="name">
          {character.name}
        </div>
        <div class="subtitle">
          Lv.{character.level}, {character.classType}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .header{
    display: flex;
    align-items: center;
    margin-top: 2px;
    margin-bottom: 5px;
    position: sticky;
    top:0;
    z-index: 1;
    background-color: white;

    .title{
      width: 500px;
      font-size: 20px;
      font-weight: bold;
    }
    .character{
      padding-top: 5px;
      padding-bottom: 5px;
      cursor: pointer;
      flex-grow: 1;
      width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: 0.2s all;
      .name{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .subtitle{
        font-size: 12px;
        color: gray;
      }
    }
    .character:hover{
      background-color: #f5f5f5;
    }
  }
</style>
