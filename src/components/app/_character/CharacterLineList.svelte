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
import DragDropList from "../../shared/DragDropList.svelte";
import TodoEditModal from "../_todo/TodoEditModal.svelte";
import CharacterImage from "../../shared/CharacterImage.svelte";

let filteredCharacter = [];

$:{
  //@ts-ignore
  let characters:Character[] = $lqCharacter ?? []
  filteredCharacter = characters.filter((character) => character.worldId === $lqSelectedWorldId);
}

const onClickCharacterCard = async (character: Character) => {
  try {
    await requestMapleCharacterDetailInfo(character);
  }catch(e){
    toast?.push(e.message)
  }
}

const onMoveCharacter = (event) => {
  console.log(event.detail)
}
</script>

<div class="main">
  <DragDropList data={filteredCharacter} let:slotProps={character}
                onMove={onMoveCharacter} dataIdField="id">
    <div class="character-item">
      <div class="left-field">
        <CharacterImage character={character}/>
        <div class='img' style={`background:url(${character.imgUrl})`}>
        </div>
        <div class="name">{character.name}</div>
        <div class="level-class">Lv.{character.level}, {character.classType}</div>
      </div>
      {#if character.spec.default || character.spec.boss}

        <div class="item">

        </div>
      {:else}
        <div>
          스텟정보 갱신 필요
        </div>
      {/if}
    </div>
  </DragDropList>
</div>

<style lang="scss">
  .character-item{
    display: flex;
    height: 80px;
    align-items: center;
    .left-field{
      width: 100px;
      display: flex;
      flex-direction: column;
      align-items: center;

      .name{
        font-size: 10px;
        white-space: nowrap;
        overflow: hidden;
      }
      .level-class{
        text-align: center;
        font-size: 8px;
        color: gray;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
    }
  }

</style>
