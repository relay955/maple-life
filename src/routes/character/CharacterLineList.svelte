<script lang="ts">
import {lqCharacter} from "../../storage/queries/characterQuery";
import {lqSelectedWorldId} from "../../storage/queries/systemQuery.js";
import type {Character} from "../../storage/dto/character";
import {
  requestMapleCharacterDetailInfo
} from "../../util/mapleParser/mapleParserRequester";
import {toast} from "@zerodevx/svelte-toast";
import DragDropList from "../../components/DragDropList.svelte";
import type {EquipmentType} from "../../util/mapleParser/mapleStat";
import EquipmentCard from "./_CharacterLineList/EquipmentCard.svelte";
import CharacterBasicCard from "./_CharacterLineList/CharacterBasicCard.svelte";
import SummaryCard from "./_CharacterLineList/SummaryCard.svelte";
import IconButton from "../../components/basicComponent/IconButton.svelte";
import MdRefresh from 'svelte-icons/md/MdRefresh.svelte'
import {idb} from "../../storage/idb";
import {calcDamage, summarizeSpec} from "../../logic/specCalculator";

let filteredCharacter:Character[] = [];

const equipmentTypeOrder:EquipmentType[] = [
  "반지1","반지2","반지3","반지4","포켓아이템","펜던트1","펜던트2","벨트","얼굴장식", "눈장식","귀고리",
  "무기","보조무기","엠블렘","모자","상의","하의","신발","어깨장식","장갑","뱃지","훈장"
]

$:{
  let characters:Character[] = $lqCharacter ?? []
  filteredCharacter = characters.filter((character) => character.worldId === $lqSelectedWorldId);
}

const onClickRefreshCharacter = async (character: Character) => {
  try {
    await requestMapleCharacterDetailInfo(character);
    idb.character.put(character);

  }catch(e:any){
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
      {#if character.spec.default}
        {@const specSummary = summarizeSpec(character, character.spec.default)}
        <CharacterBasicCard character={character} universalScore={calcDamage(specSummary)}/>
        <SummaryCard character={character} specSummary={specSummary}/>
        {#each equipmentTypeOrder as equipmentType}
          <EquipmentCard character={character} equipmentType={equipmentType}/>
        {/each}
      {:else}
        <CharacterBasicCard character={character} universalScore={0}/>
        <div>
          스텟정보 갱신 필요
        </div>
      {/if}
      <IconButton style="margin-left: 10px; margin-right: 10px;"
                  onClick={()=>onClickRefreshCharacter(character)}
      >
        <MdRefresh/>
      </IconButton>
    </div>
  </DragDropList>
</div>

<style lang="scss">
  .character-item{
    display: flex;
    height: 100px;
    align-items: center;
  }
</style>
