<script lang="ts">
import {lqCharacter} from "../../../storage/queries/characterQuery";
import {lqSelectedWorldId} from "../../../storage/queries/systemQuery.js";
import type {Character} from "../../../storage/dto/character";
import {
  requestMapleCharacterDetailInfo
} from "../../../util/mapleParser/mapleParserRequester";
import {toast} from "@zerodevx/svelte-toast";
import DragDropList from "../../shared/DragDropList.svelte";
import type {EquipmentType} from "../../../util/mapleParser/mapleStat";
import {
  summarizeSpec
} from "../../../logic/specCalculator";
import {equipmentSetOptions} from "../../../infoDictionary/EquipmentDict";
import EquipmentCard from "./CharacterLineList/EquipmentCard.svelte";
import CharacterBasicCard from "./CharacterLineList/CharacterBasicCard.svelte";
import SummaryCard from "./CharacterLineList/SummaryCard.svelte";

let filteredCharacter = [];

//무보엠은 따로
const equipmentTypeOrder:EquipmentType[] = [
  "반지1","반지2","반지3","반지4","포켓아이템","펜던트1","펜던트2","벨트","모자","얼굴장식",
  "눈장식","상의","하의","신발","귀고리","어깨장식","장갑","뱃지","훈장"
]

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
      <CharacterBasicCard character={character}/>
      {#if character.spec.default || character.spec.boss}
        <SummaryCard character={character}/>
        {#each equipmentTypeOrder as equipmentType}
          <EquipmentCard character={character} equipmentType={equipmentType}/>
        {/each}
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
    height: 100px;
    align-items: center;

    .main{
      width: 150px;
    }
  }
</style>
