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
import type {EquipmentType} from "../../../util/mapleParser/mapleStat";
import MdStar from 'svelte-icons/md/MdStar.svelte'
import GiFire from 'svelte-icons/gi/GiFire.svelte'
import GiScrollUnfurled from 'svelte-icons/gi/GiScrollUnfurled.svelte'
import {calculateBonusOptionGrade} from "../../../logic/specCalculator";
import {classesDict} from "../../../infoDictionary/ClassesDict";

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

      <div class="left-field">
        <CharacterImage character={character}/>
        <div class='img' style={`background:url(${character.imgUrl})`}>
        </div>
        <div class="name">{character.name}</div>
        <div class="level-class">Lv.{character.level}, {character.classType}</div>
      </div>

      {#if character.spec.default || character.spec.boss}
        {@const classInfo = (classesDict[character.classType])}
        {#each equipmentTypeOrder as equipmentType}
          {@const equipment = (character.spec.default?.equipments[equipmentType])}
          {#if equipment !== undefined}
          <div class="item">
            <div class="img-container">
              <img src={equipment.imageUrl}/>
            </div>
            <div class="name">{equipment.name}</div>
            <div class="starforce">
              {#if equipment.starForce}
              <div class="small-icon" style="color:#d8b625">
                <MdStar/>
              </div>
              {equipment.starForce}
              {/if}
            </div>
            <div class="bonus-stats">
              {#if Object.keys(equipment.bonusStats).length>1}
                <div class="small-icon" style="color:red">
                  <GiFire/>
                </div>
                {calculateBonusOptionGrade(equipment.bonusStats,classInfo)}
              {/if}
            </div>
            <div class="potential">
              {#if equipment.potential}
                <div class="small-icon" style="color:#4f9d37">
                  <GiScrollUnfurled/>
                </div>
                {(equipment.potential.stats[classInfo.mainStat+"%"] ?? 0)+
                (equipment.potential.stats["올스탯%"] ?? 0)
                }%
              {/if}
            </div>
          </div>
          {:else}
            <div class="item">
              미착용
            </div>
          {/if}

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
    .item{
      width:60px;
      max-width: 60px;

      display: flex;
      flex-direction: column;
      align-items: center;
      font-size: 10px;
      .img-container {
        height:35px;
        width:35px;
        display: flex;
        align-items: center;
        justify-content: center;
        .img {
          height: 30px;
        }
      }
      .name{
        text-align: center;
        height: 20px;

        overflow: hidden;
        word-break: keep-all;
        line-height: 10px;
      }
      .starforce{
        height: 12px;
        display: flex;
        align-items: center;
      }
      .bonus-stats{
        height: 12px;
        display: flex;
        align-items: center;
      }
      .potential{
        height: 12px;
        display: flex;
        align-items: center;
      }
    }
  }

  .small-icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-bottom: 3px;
    margin-right: 2px;
  }

</style>
