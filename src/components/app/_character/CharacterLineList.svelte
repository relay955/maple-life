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
        <div class='img' style={`background:url(${character.imgUrl})`}>
        </div>
        <div class="name">{character.name}</div>
        <div class="level-class">Lv.{character.level}, {character.classType}
      </div>
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
      .img {
        width: 50px;
        height: 50px;
        background-position: 52% 61% !important;
        background-size: 218% !important;
      }
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
