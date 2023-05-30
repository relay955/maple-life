<script lang="ts">
import {calculateBonusOptionGrade} from "../../../../logic/specCalculator";
import type {EquipmentType} from "../../../../util/mapleParser/mapleStat";
import MdStar from 'svelte-icons/md/MdStar.svelte'
import GiFire from 'svelte-icons/gi/GiFire.svelte'
import GiScrollUnfurled from 'svelte-icons/gi/GiScrollUnfurled.svelte'
import type {Character} from "../../../../storage/dto/character";
import {classesDict} from "../../../../infoDictionary/ClassesDict";

export let character:Character;
export let equipmentType:EquipmentType;

let equipment = character.spec.boss?.equipments[equipmentType] ?? character.spec.default?.equipments[equipmentType]
let classInfo = classesDict[character.classType]
</script>
{#if equipment !== undefined}
  <div class="main">
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
  <div class="main">
    <div class="equipment-type-on-unequip">{equipmentType}</div>
    <div class="unequip">미착용</div>
  </div>
{/if}


<style lang="scss">
  .main{
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

  .small-icon{
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-bottom: 3px;
    margin-right: 2px;
  }

  .equipment-type-on-unequip{
    font-size: 13px;
    font-weight: bold;
  }
  .unequip{
    color: gray;
  }
</style>
