<script lang="ts">
import type {Character} from "../../../../storage/dto/character";
import CharacterImage from "../../../shared/CharacterImage.svelte";
//@ts-ignore
import SvelteTooltip from "svelte-tooltip";

export let character:Character;
</script>

<div class="main">
  <CharacterImage character={character}/>
  <div class='img' style={`background:url(${character.imgUrl})`}>
  </div>
  <div class="name">{character.name}</div>
  <div class="level-class">Lv.{character.level}, {character.classType}</div>
  <div style="color:white; margin-top: -5px;">
    <SvelteTooltip tip="종합점수 : 캐릭터의 딜관련 모든 지표를 반영한 값입니다. 자세한 계산 방식은 스텟 상세보기에서 확인해주세요.">
      <span class="universal-score">
        {character.spec.default.statDetails.statIndicators["종합점수"]}
      </span>
    </SvelteTooltip>
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
    .universal-score{
      font-size: 13px;
      font-weight: bold;
      color: #000000;
    }
  }
</style>
