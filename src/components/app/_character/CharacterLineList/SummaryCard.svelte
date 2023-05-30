<script lang="ts">
import type {Character} from "../../../../storage/dto/character";
import {equipmentSetOptions} from "../../../../infoDictionary/EquipmentDict";
import {summarizeSpec} from "../../../../logic/specCalculator";

export let character:Character;
let spec = summarizeSpec(character,character.spec.boss ? "boss":"default");
</script>

<div class="main">
  <div class="set-option">
    {Object.keys(spec.sets)
      .map(setName=>`${spec.sets[setName]}${equipmentSetOptions[setName].nickName}`)
      .join("/")}
  </div>
  <div class="starforce">

  </div>
</div>

<style lang="scss">
  .main{
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
</style>
