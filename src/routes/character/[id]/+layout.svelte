<script lang="ts">
import {isOnTauri} from "../../../backendAdapter/backendAdapter";
import PageContainer
  from "../../../components/shared/basicComponent/PageContainer.svelte";
import type {Character} from "../../../storage/dto/character";
import {idb} from "../../../storage/idb";
import CharacterImage
  from "../../../components/shared/CharacterImage.svelte";
import {page} from "$app/stores";
import {liveQuery} from "dexie";
import Title from "../../../components/shared/basicComponent/Title.svelte";
import {summarizeSpec} from "../../../logic/specCalculator";

export let character = liveQuery(() => idb.character.get(Number($page.params.id)))
$:spec = $character?.spec.default
$:summarizedSpec = $character ? summarizeSpec($character, "default") : undefined

/** @type {import('./$types').LayoutData} */
export let data;

</script>

{#if isOnTauri() && $character}
  <PageContainer>
    <Title text="캐릭터 정보"/>
    <div class="header">
      <CharacterImage character={$character}/>
      <div>
        <div class="name">{$character.name}</div>
        <div class="level-class">Lv.{$character.level}, {$character.classType}</div>
      </div>
      <div class="universal-score">
        <div class="title">종합점수</div>
        <div class="value">{summarizedSpec.statIndicators["종합점수"]}</div>
      </div>
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
</style>
