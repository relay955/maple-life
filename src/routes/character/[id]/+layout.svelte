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
import SvelteTooltip from "svelte-tooltip";

export let character = liveQuery(() => idb.character.get(Number($page.params.id)))


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
        <div class="universal-score">
          <div class="title">기본약식점수</div>
          <div class="value">{spec.simulateScore ?? "계산필요"}</div>
        </div>
      <div class="universal-score">
        <div class="title">최종 스텟공격력</div>
        <div class="value">
          {numberWithCommas(Math.round(calcDamage(specSummary)))} </div>
      </div>
      <div class="universal-score">
        <div class="title">가변인자 (방무/아케인/어센틱)</div>
        <div class="value">
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
    .universal-score {
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
