<script lang="ts">
    import SubTitle from "../../../../components/basicComponent/SubTitle.svelte";
    import { calcAPStatTotal, defaultCalcDmgFomula } from "../../../../infoDictionary/JobDict";
    import { summarizeSpec } from "../../../../logic/specCalculator";
    import type { Character } from "../../../../storage/dto/character";
    import type { CharacterSpec} from "../../../../util/mapleParser/mapleStat";

    export let character:Character;
    export let spec:CharacterSpec;
    export let detailStatTarget:string[] = ["최종 데미지"];

    $: specSummary=summarizeSpec(character, spec);
    $: statTotal=specSummary.statTotal;
    
</script>
<div class="main">
    <SubTitle>스텟 요약</SubTitle>
    <div class="stat-list">
        {#each Array.isArray(specSummary.job.mainStat) ? specSummary.job.mainStat : [specSummary.job.mainStat] as statName}
        <button class="stat" on:click={()=>detailStatTarget = [(statName ?? "STR")]}>
            <div class="name"> 주스텟({statName}) </div>
            <div class="value"> { calcAPStatTotal(statTotal,statName ?? "STR")} </div>
        </button>
        <button class="stat sub" on:click={()=>detailStatTarget = "AP"+statName}>
            <div class="name"> AP{statName} </div>
            <div class="value"> { statTotal["AP"+statName]} </div>
        </button>
        <button class="stat sub" on:click={()=>detailStatTarget = "AP"+statName}>
            <div class="name"> {statName} </div>
            <div class="value"> { (statTotal[statName ?? "STR"] ?? 0) + (statTotal["올스탯"] ?? 0)} </div>
        </button>
        <button class="stat sub">
            <div class="name"> {statName}% </div>
            <div class="value"> { (statTotal[statName+"%"] ?? 0)+(statTotal["올스탯%"] ?? 0)}% </div>
        </button>
        <button class="stat sub">
            <div class="name"> 고정{statName} </div>
            <div class="value"> { statTotal["고정"+statName]} </div>
        </button>
        {/each}

        {#if specSummary.job.subStat !== undefined}
        {@const subStat = specSummary.job.subStat}
        <button class="stat">
            <div class="name"> 부스텟({specSummary.job.subStat}) </div>
            <div class="value"> { calcAPStatTotal(statTotal,specSummary.job.subStat)} </div>
        </button>
        <button class="stat sub">
            <div class="name"> {subStat} </div>
            <div class="value"> { (statTotal[subStat] ?? 0) + (statTotal["올스탯"] ?? 0)} </div>
        </button>
        <button class="stat sub">
            <div class="name"> {subStat}% </div>
            <div class="value"> { (statTotal[subStat+"%"] ?? 0)+(statTotal["올스탯%"] ?? 0)}% </div>
        </button>
        <button class="stat sub">
            <div class="name"> 고정{subStat} </div>
            <div class="value"> {statTotal["고정"+subStat] ?? 0} </div>
        </button>
        {/if}
        <button class="stat">
            <div class="name"> {specSummary.job.atkType} </div>
            <div class="value"> {(statTotal[specSummary.job.atkType] ?? 0) * (1+(statTotal[specSummary.job.atkType+"%"] ?? 100)/100)}</div>
        </button>
        <button class="stat sub">
            <div class="name"> {specSummary.job.atkType} </div>
            <div class="value"> { statTotal[specSummary.job.atkType] ?? 0 }</div>
        </button>
        <button class="stat sub">
            <div class="name"> {specSummary.job.atkType}% </div>
            <div class="value"> { statTotal[specSummary.job.atkType+"%"] ?? 0}%</div>
        </button>
        <button class="stat">
            <div class="name"> 총데미지% </div>
            <div class="value"> { (statTotal["데미지"] ?? 0) + (statTotal["보스 데미지"] ?? 0) + (statTotal["상태이상 추가데미지"] ?? 0)}% </div>
        </button>
        <button class="stat sub">
            <div class="name"> 데미지% </div>
            <div class="value"> { (statTotal["데미지"] ?? 0) }</div>
        </button>
        <button class="stat sub">
            <div class="name"> 보스 데미지% </div>
            <div class="value"> { (statTotal["보스 데미지"] ?? 0) }</div>
        </button>
        <button class="stat sub">
            <div class="name"> 상태이상 추가데미지% </div>
            <div class="value"> {statTotal["상태이상 추가데미지"] ?? 0} </div>
        </button>
        <button class="stat">
            <div class="name"> 최종 데미지 </div>
            <div class="value"> {statTotal["최종 데미지"]?? 0}% </div>
        </button>
        <button class="stat">
            <div class="name"> 방어율 무시 </div>
            <div class="value"> {statTotal["방어율 무시"]?? 0}% </div>
        </button>
        <button class="stat">
            <div class="name"> 속성내성 무시 </div>
            <div class="value"> {statTotal["속성내성 무시"]?? 0}% </div>
        </button>
        <button class="stat">
            <div class="name"> 크리티컬 확률 </div>
            <div class="value"> {statTotal["크리티컬 확률"]?? 0}% </div>
        </button>
        <button class="stat">
            <div class="name"> 크리티컬 데미지 </div>
            <div class="value"> {statTotal["크리티컬 데미지"]?? 0}% </div>
        </button>
        <button class="stat">
            <div class="name"> 무기 상수 </div>
            <div class="value"> {statTotal["무기 상수"]?? 0} </div>
        </button>
        <button class="stat">
            <div class="name"> 숙련도 </div>
            <div class="value"> {(statTotal["숙련도"] ?? 0)*100}% </div>
        </button>
    </div>
</div>

<style lang="scss">
    .main{
        width:450px;
    }
    .stat-list{
        width:450px;
        height:340px;
        padding:5px 8px;
        box-sizing: border-box;

        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        .stat{
            cursor:pointer;
            border: none;
            background-color: transparent;
            text-align: left;
            font-size: 16px;
            margin-bottom: 3px;
            padding: 0;

            display: flex;
            width:225px;
            flex-direction: row;
            align-items: center;

            transition: 0.2s all;
            .name{
                width: 120px;
                background-color: #f0f0f0;
                border-radius: 3px;
                padding:2px 10px;
                margin-right: 7px;
                transition: 0.2s all;
            }
            .value{
                flex-grow: 1;
                font-weight: bold;
            }
        }

        .stat:hover{
            background-color: #dbd9d9;
            .name{
                background-color: #dbd9d9;
            }
        }

        .stat.sub{
            padding:0 0 0 30px;
            font-size: 12px;
            margin-bottom: 0;
            .name{
                background-color: transparent;;
                padding:0;
                margin-right: 0;
            }
        }

    }

</style>