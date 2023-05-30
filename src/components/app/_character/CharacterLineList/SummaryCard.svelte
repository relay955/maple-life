<script lang="ts">
import type {Character} from "../../../../storage/dto/character";
import {equipmentSetOptions} from "../../../../infoDictionary/EquipmentDict";
import {summarizeSpec} from "../../../../logic/specCalculator";
import {calculateBonusOptionGrade} from "../../../../logic/specCalculator.js";
import {classesDict} from "../../../../infoDictionary/ClassesDict.js";
import type {EquipmentInfo, Stat} from "../../../../util/mapleParser/mapleStat";
import MdStar from 'svelte-icons/md/MdStar.svelte'
import GiFire from 'svelte-icons/gi/GiFire.svelte'
import GiScrollUnfurled from 'svelte-icons/gi/GiScrollUnfurled.svelte'

export let character:Character;
const classInfo = classesDict[character.classType];
let spec = character.spec.boss ? character.spec.boss : character.spec.default!;
let summarizedSpec = summarizeSpec(character,character.spec.boss ? "boss":"default");

let bonusStatTotal = 0;
let potentialTotal = 0;
let arcaneForceTotal = 0;
let atkpercentLines = 0;
let bossdmgLines = 0;
let armorPiercingLines = 0;

Object.keys(spec.equipments).map(equipmentName=>{
  let equipment:EquipmentInfo = spec.equipments[equipmentName];
  bonusStatTotal += calculateBonusOptionGrade(equipment.bonusStats,classInfo);
  potentialTotal += (equipment.potential?.stats[classInfo.mainStat+"%"] ?? 0) +
    (equipment.potential?.stats["올스탯%"] ?? 0);
  arcaneForceTotal += equipment.stats["아케인 포스"] ?? 0;
  equipment.potential?.options?.forEach((option:Stat)=>{
    if(option==="공격력%") atkpercentLines++;
    if(option==="보스 데미지") bossdmgLines++;
    if(option==="방어율 무시") armorPiercingLines++;
  })
})

console.log(spec.equipments)

</script>

<div class="main">
  <div class="subtitle">세트옵션</div>
  <div class="set-option">
    {Object.keys(summarizedSpec.sets)
      .map(setName=>`${summarizedSpec.sets[setName]}${equipmentSetOptions[setName].nickName}`)
      .join("/")}
  </div>
  <div class="total-container">
    <div class="item-summary">
      <div class="subtitle">아이템합계</div>
      <div class="starforce">
        <div class="small-icon" style="color:#d8b625"><MdStar/></div>
        {summarizedSpec.starforce}
      </div>
      <div class="bonusStats">
        <div class="small-icon" style="color:red"><GiFire/></div>
        {bonusStatTotal}
      </div>
      <div class="potential">
        <div class="small-icon" style="color:#4f9d37"><GiScrollUnfurled/></div>
        {potentialTotal}%
      </div>
    </div>
    <div class="weapon-summary">
      <div class="subtitle">무보엠</div>
      <div>공퍼 {atkpercentLines}줄</div>
      <div>보공 {bossdmgLines}줄</div>
      <div>방무 {armorPiercingLines}줄</div>
    </div>
    <div class="force-core-summary">
      <div class="subtitle">포스/코어</div>
      <div class="arcane-force" style>
        Arc {arcaneForceTotal}
      </div>
      <div class="core">
        코어 0
      </div>
    </div>
  </div>
</div>

<style lang="scss">
  .subtitle{
    font-size: 10px;
    color: gray;
  }
  .main{
    width: 170px;
    display: flex;
    flex-direction: column;
    font-size: 12px;
  }
  .total-container{
    width: 170px;
    display: flex;
    flex-direction: row;
    .item-summary{
      flex-grow: 1;
    }
    .weapon-summary{
      flex-grow: 1;
    }
    .force-core-summary{
      flex-grow: 1;
    }
  }
  .small-icon{
    display: inline-block;
    width: 12px;
    height: 12px;
    margin-bottom: 2px;
    margin-right: 2px;
  }
</style>
