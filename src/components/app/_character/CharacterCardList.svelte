<script lang="ts">
import {lqCharacter} from "../../../storage/queries/characterQuery";
import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'
import {lqSelectedWorldId} from "../../../storage/queries/systemQuery.js";
import type {Character} from "../../../storage/dto/character";
import {getWorldById} from "../../../storage/queries/worldQuery";
import {
  requestMapleCharacterDetailInfo
} from "../../../util/mapleParser/mapleParserRequester";
import {toast} from "@zerodevx/svelte-toast";
import CharacterImage from "../../shared/CharacterImage.svelte";
import {summarizeSpec} from "../../../logic/specCalculator";
import {goto} from "$app/navigation";

let filteredCharacter = [];

$:{
  //@ts-ignore
  let characters:Character[] = $lqCharacter ?? []
  filteredCharacter = characters.filter((character) => character.worldId === $lqSelectedWorldId);
}

const onClickCharacterCard = async (character: Character) => {
  try {
    await goto(`/character/${character.id}/stat`)
  }catch(e){
    toast?.push(e.message)
  }
}
</script>

<div class="character-list">
  {#each filteredCharacter as character (character.id)}
    <div class="character-card" on:click={()=>onClickCharacterCard(character)}>
      <CharacterImage character={character}/>
      <div class="name">{character.name}</div>
      <div class="subtitle">
        Lv.{character.level}, {character.classType}
      </div>
      <div class="score">
        {character.spec.default.statDetails.statIndicators["종합점수"]}
      </div>
    </div>
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
  .character-card:hover{
    background-color: #f1f1f1;
  }
  .score{
    font-size: 14px;
  }
</style>
