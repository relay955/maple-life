<script lang="ts">
import {isOnTauri} from "../../../backendAdapter/backendAdapter";
import PageContainer
  from "../../../components/basicComponent/PageContainer.svelte";
import {idb} from "../../../storage/idb";
import CharacterImage
  from "../../../components/CharacterImage.svelte";
import {page} from "$app/stores";
import {liveQuery} from "dexie";
import Title from "../../../components/basicComponent/Title.svelte";
import {goto} from "$app/navigation";
import {calcDamage, summarizeSpec} from "../../../logic/specCalculator.js";
  import { numberWithCommas } from "../../../util/formatter";
  import { hoverPanelState } from "../../../components/HoverPanelStore";

export let character = liveQuery(() => idb.character.get(Number($page.params.id)))

const onMouseHoverInformalScore = (e:MouseEvent) =>{
  hoverPanelState.show(
    "기본약식점수(Informal score)",
    "약식점수는 일반적인 상황이라고 가정할 수 있는 보스대상 방어율 300%, 포뻥렙뻥 없음 기준으로,"+
    "약식 시뮬레이션을 통해 얻은 DPS(2분직업은 2분, 3분직업은 3분 기준)을 10000으로 나누어 산출한 값입니다.\n\n"+
    "약식점수는 실제 피해량에 정비례하는 지표로 설계되었습니다. 예를들어 두 캐릭터간 약식점수가 3배 차이난다면, 실제 피해량도 3배 차이에 가깝습니다.\n"+
    "또한 파티 모집시에도 파티원의 해당 보스 대상 약식점수를 합하여 보스 기준 점수를 넘었는지를 확인함으로써"+
    "적정 파티원 수를 계산할 수 있습니다. 다만 이 경우, 보스별 방어율, 포스, 레벨 기준이 상이하므로 보스대상 약식점수를 확인하는 것이 정확합니다.\n\n"+
    "약식 시뮬레이션은 직업별로 쿨타임마다 우선순위 대로 스킬을 사용하는 단순한 AI가 운용한다고 가정하는 시뮬레이션입니다.\n"+
    "계산속도에 중점을 두어 정확도는 다소 떨어질 수 있지만 측정 편의성이 높습니다.\n",
    e.clientX, e.clientY,500
  )
}

const onMouseHoverFinalStatDamage = (e:MouseEvent) => {
hoverPanelState.show(
    "최종 스텟공격력",
    "메이플스토리 스텟창의 스텟공격력이 반영하지 못하는 보스공격력, 크리티컬확률, 크리티컬데미지, 속성내성 무시를 모두 반영한 보스대상 최종 스텟공격력입니다.\n"+
    "약식 시뮬레이션 보다도 빠르게 계산되지만, 해당 캐릭터의 액티브 버프 스킬과 스킬퍼뎀 지표를 반영하지 않으므로 직업간 최종 스텟공격력 비교는 부적절할 수 있습니다.\n\n"+
    "스킬 퍼뎀을 곱하여 스킬 사용시 1타당 데미지를 계산하는데 사용할 수 있습니다.\n\n"+
    "최종 스텟공격력에는 공격 대상의 스텟에 따라 실질적인 피해량이 달라지는 방어율무시, 렙뻥, 포뻥을 제외하고 계산됩니다.\n",
    e.clientX, e.clientY,500
  )
}

const onMouseOverVariableFactor = (e:MouseEvent) => {
hoverPanelState.show(
    "가변 인자",
    "가변 인자에 속하는 스텟들은 공격하는 대상에 따라서 실제 피해량이 다르게 측정될 수 있는 값입니다.\n"+
    "예를 들어 방어율 무시가 높은 경우, 방어율이 높은 보스 대상으로 높은 피해를 입힐 수 있지만 방어율이 낮을수록 스텟의 효과가 약해집니다. \n"+
    "아케인포스와 어센틱포스는 보스의 기준 포스에 따라 추가피해량이 다르게 적용됩니다.",
    e.clientX, e.clientY,500
  )
}

</script>

{#if isOnTauri() && $character && $character.spec && $character.spec.default}
{@const spec = $character.spec.default}
{@const specSummary = summarizeSpec($character, spec)}
  <PageContainer>
    <Title text="캐릭터 정보"/>
    <div class="header">
      <CharacterImage character={$character} style="margin-bottom: 10px"/>
      <div>
        <div class="name">{$character.name}</div>
        <div class="level-class">Lv.{$character.level}, {$character.classType}</div>
      </div>
        <div class="informal-score"
          on:mousemove={onMouseHoverInformalScore}
          on:mouseleave={hoverPanelState.hide}>
          <div class="title">기본약식점수</div>
          <div class="value">{spec.simulateScore ?? "계산필요"}</div>
        </div>
      <div class="informal-score"
          on:mousemove={onMouseHoverFinalStatDamage}
          on:mouseleave={hoverPanelState.hide}>
        <div class="title">최종 스텟공격력</div>
        <div class="value">
          {numberWithCommas(Math.round(calcDamage(specSummary)))} </div>
      </div>
      <div class="informal-score"
          on:mousemove={onMouseOverVariableFactor}
          on:mouseleave={hoverPanelState.hide}>
        <div class="title">가변인자 (레벨/방무/아케인/어센틱)</div>
        <div class="value">
          Lv.{$character.level} /
          {specSummary.statTotal["방어율 무시"] ?? 0}% /
          {specSummary.statTotal["아케인 포스"] ?? 0} /
          {specSummary.statTotal["어센틱 포스"] ?? 0}
        </div>
      </div>
    </div>
    <div class="tab">
<!--      하이퍼스텟, 어빌리티, 유니온, 링크스킬, 버프 설정, n당스텟 스텟별 목록-->
      <button on:click={()=>goto(`/character/${$character?.id}/stat`)}
         class:selected={$page.url.pathname.includes('stat')}>스탯</button>
      <!--      장비 확인 및 장비 변경, 시뮬레이션-->
      <button on:click={()=>goto(`/character/${$character?.id}/equipment`)}>장비</button>
<!--      보스 점수컷, 계산과정 표시-->
      <button on:click={()=>goto(`/character/${$character?.id}/cutline`)}>보스/사냥</button>
      <!--      점수계산 과정 표시-->
      <button on:click={()=>goto(`/character/${$character?.id}/universal-score`)}>약식점수(약식 시뮬레이션)</button>
    </div>
    <div class="body">
      <slot></slot>
    </div>
  </PageContainer>
{/if}

<style lang="scss">
  .header{
    display: flex;
    align-items: center;
    height: 80px;
    border-bottom: 1px solid #e6e6e6;
    .name{
      font-size: 16px;
    }
    .level-class{
      font-size: 14px;
      color: #666;
    }
    .informal-score {
      margin-left: 30px;
      .title {
        font-size: 14px;
        color: #666;
        margin-bottom: -5px;
      }
      .value {
        font-size: 24px;
        font-weight: bold;
      }
    }
  }

  .tab {
    margin-top: 5px;
    margin-bottom: 10px;
    button {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: #666;
      cursor:pointer;
      transition: 0.2s all;
      border:none;
      background-color: transparent;
    }

    button.selected{
      color: #2b91da;
      font-weight: bold;
      border-bottom: 2px solid #2b91da;
    }
  }
</style>
