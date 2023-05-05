<script lang="ts">
  import type {Character} from "../../../storage/dto/character";
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'
  import type {Settings} from "../../../storage/dto/settings";

  export let characters:Character[];
  export let onClickCharacter:(character:Character)=>void;
  export let onChangeOrderCharacter:(firstCharacter:Character, secondCharacter:Character)=>void;
  export let settings:Settings;

  let dragCharacter:Character|undefined = undefined;

  const onDragStartCharacter = (e:Event,character:Character)=>{
    console.log("a")
    dragCharacter = character;
  }
  const onDragOverCharacter = (e:Event)=>{
    e.preventDefault()
  }
  const onDragEndChracter = (e:Event,character:Character)=>{
    e.preventDefault()
    if(dragCharacter === undefined) return;
    if(dragCharacter.id === character.id) return;
    onChangeOrderCharacter(dragCharacter, character);
    dragCharacter = undefined;
  }
</script>
<div class="header">
  <div class="title">할일</div>
  {#each characters as character (character.name)}
    <div class="character" on:click={()=>onClickCharacter(character)}
         draggable="true"
         on:dragstart={(e)=>onDragStartCharacter(e,character)}
         on:dragover={onDragOverCharacter}
         on:drop={(e)=>onDragEndChracter(e,character)}
    >
      {#if character.imgUrl !== "" && settings.showCharacterPreview}
        <div class="img" style={`background:url(${character.imgUrl})`}></div>
      {/if}
      {#if character.imgUrl === "" && settings.showCharacterPreview}
        <div class="default-img">
          <MdFavoriteBorder/>
        </div>
      {/if}
      <div class="name">
        {character.name}
      </div>
      <div class="subtitle">
        Lv.{character.level}, {character.classType}
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .header {
    display: flex;
    align-items: center;
    padding-top: 2px;
    margin-bottom: 5px;
    position: sticky;
    top: 0;
    z-index: 1;
    background-color: white;

    .title {
      width: 500px;
      font-size: 20px;
      font-weight: bold;
    }

    .character {
      padding-top: 5px;
      padding-bottom: 5px;
      cursor: pointer;
      flex-grow: 1;
      width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      transition: 0.2s all;

      .name {
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }

      .subtitle {
        font-size: 12px;
        color: gray;
      }

      .img {
        width: 50px;
        height: 50px;
        background-position: 52% 61% !important;
        background-size: 218% !important;
      }

      .default-img {
        width: 40px;
        height: 40px;
        padding: 5px;
      }
    }

    .character:hover {
      background-color: #f5f5f5;
    }

    @media (max-width: 1200px) {
      .title {
        width: 300px;
        font-size: 16px;
      }
    }
  }
</style>
