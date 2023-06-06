<script lang="ts">
    import Space from "../../../../components/basicComponent/Space.svelte";
    import SubTitle from "../../../../components/basicComponent/SubTitle.svelte";
    import { summarizeSpec } from "../../../../logic/specCalculator";
    import type { Character } from "../../../../storage/dto/character";
    import type { CharacterSpec, Stat } from "../../../../util/mapleParser/mapleStat";
    export let character:Character;
    export let targetStat:Stat[];
    export let spec:CharacterSpec;

    $:specSummary = summarizeSpec(character, spec);
    $:targetStatOriginList = specSummary.statList[targetStat] ?? {};

</script>

<div class="main">
    <SubTitle>스텟 출처 - {targetStat}</SubTitle>
    <div class="stat-origin-list">
        {#each Object.keys(targetStatOriginList) as infoName}
        <div class="origin-info">
            <div class="name"> {infoName} </div>
            <Space/>
            <div class="value"> {targetStatOriginList[infoName]} </div>
        </div>
        {/each}
    </div>
</div>

<style lang="scss">
    .main{
        margin-left:30px;
    }
    .stat-origin-list{
        height: 500px;
        overflow-y: auto;
        overflow-x: hidden;
        .origin-info{
            display: flex;
            flex-direction: row;
            width:400px;
            padding:3px 10px;
            margin-bottom: 5px;
            border-left:4px solid #cccccc;
            box-shadow: -2px 2px 5px #eeeeee;
        }
    }
</style>