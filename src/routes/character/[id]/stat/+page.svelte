<script lang="ts">
  import {liveQuery} from "dexie";
  import {idb} from "../../../../storage/idb";
  import {page} from "$app/stores";
  import {isOnTauri} from "../../../../backendAdapter/backendAdapter";
  import type {Buff} from "../../../../infoDictionary/BuffDict";
  import {buffDict} from "../../../../infoDictionary/BuffDict";
  import {simulate, summarizeSpec} from "../../../../logic/specCalculator";
  import HoverPanel from "../../../../components/HoverPanel.svelte";
  import {linkSkillDict} from "../../../../infoDictionary/LinkSkillDict";
  import type {Skill} from "../../../../infoDictionary/Skill";

  export let character = liveQuery(() => idb.character.get(Number($page.params.id)))


  const debug = () => {
    if($character === undefined) return
    let specSummary = summarizeSpec($character, $character.spec.default)
    simulate(specSummary)
  }

  const onClickBuff = (buffName:string,buff:Buff) => () => {
    // @ts-ignore
    const spec:CharacterSpec = $character.spec.default
    if(spec.buff[buffName] !== undefined){
      delete c.default.buff[buffName]
    }else{
      $character.spec.default.buff[buffName] = buff
    }
    idb.character.put($character)
  }

  //hoverPanel
  let hoveredItem:Buff | Skill;
  let hoveredItemName:string;
  let hoverPanelX = 0;
  let hoverPanelY = 0;
  let isVisibleHoverPanel = false;

  const onMouseMove = (e:MouseEvent,name:string,item:Buff) =>{
    hoverPanelX = e.clientX;
    hoverPanelY = e.clientY;
    isVisibleHoverPanel = true;
    hoveredItemName = name;
    hoveredItem=item;
  }
  const onMouseLeave = (e:MouseEvent) => isVisibleHoverPanel = false

</script>
{#if isOnTauri() && $character}
<div>
  <div class="bufflink-list-container">
    <div class="subtitle">버프</div>
    <div class="bufflink-list">
      {#each Object.keys(buffDict) as buffName}
        {@const buff = buffDict[buffName]}
        <img src={buff.imgUrl}
             on:click={onClickBuff(buffName,buff)}
             on:mousemove={(e)=>onMouseMove(e,buffName,buff)}
             on:mouseleave={onMouseLeave}
             class:active={$character.spec.default.buff[buffName] !== undefined} />
      {/each}
    </div>
    <div class="subtitle">링크스킬</div>
    <div class="bufflink-list">
      {#each Object.keys(linkSkillDict) as linkSkillName}
        {@const linkSkill = linkSkillDict[linkSkillName]}
        <img src={linkSkill.imgUrl}
             on:mousemove={(e)=>onMouseMove(e,linkSkillName,linkSkill)}
             on:mouseleave={onMouseLeave}
             class:active={$character.spec.default.linkSkills[linkSkillName] !== undefined} />
      {/each}
    </div>
    <button on:click={debug}>디버그</button>
  </div>
</div>
  <HoverPanel isVisible={isVisibleHoverPanel}
              x={hoverPanelX} y={hoverPanelY}>
    <div class="hoverpanel-title">{hoveredItemName}</div>
    <div class="hoverpanel-description">{hoveredItem.description ?? "설명 없음"}</div>
  </HoverPanel>
{/if}

<style lang="scss">
  .subtitle{
    font-size: 14px;
    font-weight: bold;
    color: #949494;
    margin-bottom: 3px;
  }

  .bufflink-list{
    display: flex;
    margin-bottom: 5px;
    img{
      margin-right: 3px;
      filter:grayscale(1); opacity: (0.5);
      cursor:pointer;
    }
    img.active{
      filter: brightness(0.5);
    }
  }
  .hoverpanel-title{
    font-size:14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .hoverpanel-description{
    font-size: 12px;
    color: #5e5e5e;
    white-space: pre-line;
  }
</style>
