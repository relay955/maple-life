<script lang="ts">
  import {liveQuery} from "dexie";
  import {idb} from "../../../../storage/idb";
  import {page} from "$app/stores";
  import {isOnTauri} from "../../../../backendAdapter/backendAdapter";
  import {calcDamage, summarizeSpec} from "../../../../logic/specCalculator";
  import { simulate } from "../../../../logic/dpmSimulator";
  import Bufflink from "./bufflink.svelte";
    import { numberWithCommas } from "../../../../util/formatter";
    import StatSummary from "./statSummary.svelte";
    import type { Stat } from "../../../../util/mapleParser/mapleStat";
    import StatOrigins from "./StatOrigins.svelte";

  export let character = liveQuery(() => idb.character.get(Number($page.params.id)))
  let detailStatTarget:Stat[] = ["최종 데미지"]

  const debug = () => {
    if($character === undefined) return
    let specSummary = summarizeSpec($character, $character.spec!.default!)
    simulate(specSummary)
  }

</script>
{#if isOnTauri() && $character && $character.spec && $character.spec.default}
{@const spec = $character.spec.default}
<div>

  <Bufflink character={$character} spec={spec}/>
  <div class="stat-info">
    <StatSummary character={$character} spec={spec} bind:detailStatTarget={detailStatTarget}/>
    <StatOrigins character={$character} spec={spec} targetStat={detailStatTarget}/>
  </div>
  <!-- <button on:click={debug}>디버그</button> -->
</div>
{/if}

<style lang="scss">
  .stat-info{
    margin-top: 15px;

    width:100%;
    display: flex;
    flex-direction: row;
  }
</style>
