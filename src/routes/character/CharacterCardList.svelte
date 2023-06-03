<script lang="ts">
import {lqCharacter} from "../../storage/queries/characterQuery";
import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'
import {lqSelectedWorldId} from "../../storage/queries/systemQuery.js";
import type {Character} from "../../storage/dto/character";
import {getWorldById} from "../../storage/queries/worldQuery";
import {
  requestMapleCharacterDetailInfo
} from "../../util/mapleParser/mapleParserRequester";
import {toast} from "@zerodevx/svelte-toast";
import CharacterImage from "../../components/CharacterImage.svelte";
import {goto} from "$app/navigation";
import {summarizeSpec} from "../../logic/specCalculator";
import {calcDamage} from "../../logic/specCalculator.js";

let filteredCharacter:Character[] = [];

$:{
  //@ts-ignore
  let characters:Character[] = $lqCharacter ?? []
  filteredCharacter = characters.filter((character) => character.worldId === $lqSelectedWorldId);
}

const onClickCharacterCard = async (character: Character) => {
  try {
    await goto(`/character/${character.id}/stat`)
  }catch(e:any){
    toast?.push(e.message)
  }
}
</script>

<div class="character-list">
  {#each filteredCharacter as character (character.id)}
    <button class="character-card" on:click={()=>onClickCharacterCard(character)}>
      <CharacterImage character={character}/>
      <div class="name">{character.name}</div>
      <div class="subtitle">
        Lv.{character.level}, {character.classType}
      </div>
      {#if character.spec.default}
      <div class="score">
        {calcDamage(summarizeSpec(character,character.spec.default))}
      </div>
      {/if}
    </button>
  {/each}
</div>

<style lang="scss">
  .character-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
  .character-card{
    margin-right:8px;
    background-color: transparent;

    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    width:150px;
    height:200px;

    border-radius: 7px;
    border: 1px solid #d5d5d5;

    transition: 0.2s all;
    cursor: pointer;

    .name {
      font-size: 16px;
      font-weight: bold;
    }

    .subtitle {
      font-size: 12px;
      color: gray;
    }
  }
  .character-card:hover{
    background-color: #f1f1f1;
  }
  .score{
    font-size: 14px;
  }
</style>
