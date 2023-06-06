<script lang="ts">
    import SubTitle from "../../../../components/basicComponent/SubTitle.svelte";
    import { calcAPStatTotal, defaultCalcDmgFomula } from "../../../../infoDictionary/JobDict";
    import { summarizeSpec } from "../../../../logic/specCalculator";
    import type { Character } from "../../../../storage/dto/character";
    import type { CharacterSpec } from "../../../../util/mapleParser/mapleStat";

    export let character:Character;
    export let spec:CharacterSpec;

    $: specSummary=summarizeSpec(character, spec);
    $: statTotal=specSummary.statTotal;
    
</script>
<div class="main">
    <SubTitle>스텟 요약</SubTitle>
    <div class="stat-list">
        {#each Array.isArray(specSummary.job.mainStat) ? specSummary.job.mainStat : [specSummary.job.mainStat] as statName}
        <div class="stat">
            <div class="name"> 주스텟({statName}) </div>
            <div class="value"> { calcAPStatTotal(statTotal,statName ?? "STR")} </div>
        </div>
        <div class="stat-sub">
            <div class="name"> AP{statName} </div>
            <div class="value"> { statTotal["AP"+statName]} </div>
        </div>
        <div class="stat-sub">
            <div class="name"> {statName} </div>
            <div class="value"> { (statTotal[statName ?? "STR"] ?? 0) + (statTotal["올스탯"] ?? 0)} </div>
        </div>
        <div class="stat-sub">
            <div class="name"> {statName}% </div>
            <div class="value"> { (statTotal[statName+"%"] ?? 0)+(statTotal["올스탯%"] ?? 0)}% </div>
        </div>
        <div class="stat-sub">
            <div class="name"> 고정{statName} </div>
            <div class="value"> { statTotal["고정"+statName]} </div>
        </div>
        {/each}

        {#if specSummary.job.subStat !== undefined}
        {@const subStat = specSummary.job.subStat}
        <div class="stat">
            <div class="name"> 부스텟({specSummary.job.subStat}) </div>
            <div class="value"> { calcAPStatTotal(statTotal,specSummary.job.subStat)} </div>
        </div>
        <div class="stat-sub">
            <div class="name"> {subStat} </div>
            <div class="value"> { (statTotal[subStat] ?? 0) + (statTotal["올스탯"] ?? 0)} </div>
        </div>
        <div class="stat-sub">
            <div class="name"> {subStat}% </div>
            <div class="value"> { (statTotal[subStat+"%"] ?? 0)+(statTotal["올스탯%"] ?? 0)}% </div>
        </div>
        <div class="stat-sub">
            <div class="name"> 고정{subStat} </div>
            <div class="value"> {statTotal["고정"+subStat] ?? 0} </div>
        </div>
        {/if}
        <div class="stat">
            <div class="name"> {specSummary.job.atkType} </div>
            <div class="value"> {(statTotal[specSummary.job.atkType] ?? 0) * (1+(statTotal[specSummary.job.atkType+"%"] ?? 100)/100)}</div>
        </div>
        <div class="stat-sub">
            <div class="name"> {specSummary.job.atkType} </div>
            <div class="value"> { statTotal[specSummary.job.atkType] ?? 0 }</div>
        </div>
        <div class="stat-sub">
            <div class="name"> {specSummary.job.atkType}% </div>
            <div class="value"> { statTotal[specSummary.job.atkType+"%"] ?? 0}%</div>
        </div>
        <div class="stat">
            <div class="name"> 총데미지% </div>
            <div class="value"> { (statTotal["데미지"] ?? 0) + (statTotal["보스 데미지"] ?? 0) + (statTotal["상태이상 추가데미지"] ?? 0)}% </div>
        </div>
        <div class="stat-sub">
            <div class="name"> 데미지% </div>
            <div class="value"> { (statTotal["데미지"] ?? 0) }</div>
        </div>
        <div class="stat-sub">
            <div class="name"> 보스 데미지% </div>
            <div class="value"> { (statTotal["보스 데미지"] ?? 0) }</div>
        </div>
        <div class="stat-sub">
            <div class="name"> 상태이상 추가데미지% </div>
            <div class="value"> {statTotal["상태이상 추가데미지"] ?? 0} </div>
        </div>
        <div class="stat">
            <div class="name"> 최종 데미지 </div>
            <div class="value"> {statTotal["최종 데미지"]?? 0}% </div>
        </div>
        <div class="stat">
            <div class="name"> 방어율 무시 </div>
            <div class="value"> {statTotal["방어율 무시"]?? 0}% </div>
        </div>
        <div class="stat">
            <div class="name"> 속성내성 무시 </div>
            <div class="value"> {statTotal["속성내성 무시"]?? 0}% </div>
        </div>
        <div class="stat">
            <div class="name"> 크리티컬 확률 </div>
            <div class="value"> {statTotal["크리티컬 확률"]?? 0}% </div>
        </div>
        <div class="stat">
            <div class="name"> 크리티컬 데미지 </div>
            <div class="value"> {statTotal["크리티컬 데미지"]?? 0}% </div>
        </div>
        <div class="stat">
            <div class="name"> 무기 상수 </div>
            <div class="value"> {statTotal["무기 상수"]?? 0} </div>
        </div>
        <div class="stat">
            <div class="name"> 숙련도 </div>
            <div class="value"> {(statTotal["숙련도"] ?? 0)*100}% </div>
        </div>
    </div>
</div>

<style lang="scss">
    .main{
        width:450px;
    }
    .stat-list{
        width:450px;
        height:340px;
        padding:5px 10px;
        box-sizing: border-box;
        border-left:2px solid lightgray;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .stat{
            display: flex;
            width:225px;
            flex-direction: row;
            align-items: center;
            .name{
                width: 120px;
                background-color: #f0f0f0;
                border-radius: 3px;
                padding:2px 10px;
                margin-right: 7px;
            }
            .value{
                flex-grow: 1;
                font-weight: bold;
            }
            margin-bottom: 3px;
        }
        .stat-sub{
            display: flex;
            flex-direction: row;
            width:225px;
            box-sizing: border-box;
            font-size: 12px;
            padding-left: 30px;
            .name{
                width:120px;
            }
            .value{
                flex-grow: 1;
                font-weight: bold;
            }
        }
    }

</style>