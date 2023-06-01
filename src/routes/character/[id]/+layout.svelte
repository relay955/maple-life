<script lang="ts">
import {isOnTauri} from "../../../backendAdapter/backendAdapter";
import PageContainer
  from "../../../components/shared/basicComponent/PageContainer.svelte";
import {idb} from "../../../storage/idb";
import CharacterImage
  from "../../../components/shared/CharacterImage.svelte";
import {page} from "$app/stores";
import {liveQuery} from "dexie";
import Title from "../../../components/shared/basicComponent/Title.svelte";
import {goto} from "$app/navigation";
import {summarizeSpec} from "../../../logic/specCalculator.js";

export let character = liveQuery(() => idb.character.get(Number($page.params.id)))

/** @type {import('./$types').LayoutData} */
export let data;

</script>

{#if isOnTauri() && $character}
  <PageContainer>
    <Title text="캐릭터 정보"/>
    <div class="header">
      <CharacterImage character={$character} style="margin-bottom: 10px"/>
      <div>
        <div class="name">{$character.name}</div>
        <div class="level-class">Lv.{$character.level}, {$character.classType}</div>
      </div>
      <div class="universal-score">
        <div class="title">종합점수</div>
        <div class="value">{summarizeSpec($character,"default").statIndicators["종합점수"]}</div>
      </div>
    </div>
    <div class="tab">
<!--      하이퍼스텟, 어빌리티, 유니온, 링크스킬, 버프 설정, n당스텟 스텟별 목록-->
      <a on:click={goto(`/character/${$character.id}/stat`)}
         class:selected={$page.url.pathname.includes('stat')}>스탯</a>
      <!--      장비 확인 및 장비 변경, 시뮬레이션-->
      <a on:click={goto(`/character/${$character.id}/equipment`)}>장비</a>
<!--      보스 점수컷, 계산과정 표시-->
      <a on:click={goto(`/character/${$character.id}/cutline`)}>보스/사냥</a>
      <!--      점수계산 과정 표시-->
      <a on:click={goto(`/character/${$character.id}/universal-score`)}>종합점수</a>
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
    a {
      margin-left: 10px;
      margin-right: 10px;
      font-size: 14px;
      color: #666;
      cursor:pointer;
      transition: 0.2s all;
    }
    a:hover{

    }

    a.selected{
      color: #2b91da;
      font-weight: bold;
      border-bottom: 2px solid #2b91da;
    }
  }
</style>
