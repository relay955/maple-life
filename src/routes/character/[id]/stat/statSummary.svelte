<script lang="ts">
    import SubTitle from "../../../../components/basicComponent/SubTitle.svelte";
    import { defaultCalcDmgFomula } from "../../../../infoDictionary/JobDict";
    import { summarizeSpec } from "../../../../logic/specCalculator";
    import type { Character } from "../../../../storage/dto/character";
    import type { CharacterSpec } from "../../../../util/mapleParser/mapleStat";

    export let character:Character;
    export let spec:CharacterSpec;
    let specSummary = summarizeSpec(character, spec);
    
</script>
<div>
    <SubTitle>스텟 요약</SubTitle>
    <div class="stat-list">
        <div>
            <!-- {#if isArray(specSummary.job.mainStat)} -->
            <!-- {#each specSummary.job.mainStat as statName} -->
            <!-- <div>
                주스텟({statName})
            </div>
            <div>
            </div> -->
            <!-- {/each} -->
            <!-- {/if} -->
        </div>
    </div>
</div>

<style lang="scss">
    .stat-list{
        border-left:2px solid lightgray;
        padding-left: 5px;
    }

</style>