<script lang="ts">
    import HoverPanel from "../../../../components/HoverPanel.svelte";
    import SubTitle from "../../../../components/basicComponent/SubTitle.svelte";
    import { buffDict, type Buff } from "../../../../infoDictionary/BuffDict";
    import type { Skill } from "../../../../infoDictionary/SkillDict";
    import { linkSkillDict } from "../../../../infoDictionary/skill/linkSkill";
    import type { Character } from "../../../../storage/dto/character";
    import { idb } from "../../../../storage/idb";
    import type { CharacterSpec } from "../../../../util/mapleParser/mapleStat";

    export let character:Character;
    export let spec:CharacterSpec;

const onClickBuff = (buffName:string,buff:Buff) => {
    if(character === undefined) return
    const spec:CharacterSpec = character.spec!.default!
    if(spec.buff[buffName] === undefined){
      spec.buff[buffName] = true;
    }else{
      delete spec.buff[buffName]
    }
    idb.character.put(character)
  }

  const onClickLinkSkill = (linkSkillName:string,linkSkill:Skill) => {
    if(character === undefined) return
    const spec:CharacterSpec = character.spec!.default!
    if(spec.linkSkills[linkSkillName] === undefined || spec.linkSkills[linkSkillName] < linkSkill.maxLevel!){
      spec.linkSkills[linkSkillName] = linkSkill.maxLevel!
    }else{
      delete spec.linkSkills[linkSkillName]
    }
    idb.character.put(character)
  }

  const onRightClickLinkSkill = (linkSkillName:string,linkSkill:Skill) => {
    if(character === undefined) return
    const spec:CharacterSpec = character.spec!.default!
    if(spec.linkSkills[linkSkillName] !== undefined && spec.linkSkills[linkSkillName] > 1){
      spec.linkSkills[linkSkillName] -= 1 
    }else{
      delete spec.linkSkills[linkSkillName]
    }
    idb.character.put(character)
  }

  //hoverPanel
  let hoveredItem:Buff | Skill;
  let hoveredItemName:string;
  let hoverPanelX = 0;
  let hoverPanelY = 0;
  let isVisibleHoverPanel = false;

  const onMouseMove = (e:MouseEvent,name:string,item:Buff|Skill) =>{
    hoverPanelX = e.clientX;
    hoverPanelY = e.clientY;
    isVisibleHoverPanel = true;
    hoveredItemName = name;
    hoveredItem=item;
  }
  const onMouseLeave = (e:MouseEvent) => isVisibleHoverPanel = false

</script>
<div class="bufflink-list-container">
    <SubTitle>버프</SubTitle>
    <div class="bufflink-list">
      {#each Object.keys(buffDict) as buffName}
        {@const buff = buffDict[buffName]}
        <button
             on:click={()=>onClickBuff(buffName,buff)}
             on:mousemove={(e)=>onMouseMove(e,buffName,buff)}
             on:mouseleave={onMouseLeave}>
          <img src={buff.imgUrl}
              alt={buffName}
              class:active={spec.buff[buffName] !== undefined} />
        </button>
      {/each}
    </div>
    <SubTitle>링크스킬 ({Object.keys(spec.linkSkills).length}/13)</SubTitle>
    <div class="bufflink-list">
      {#each Object.keys(linkSkillDict) as linkSkillName}
        {@const linkSkill = linkSkillDict[linkSkillName]}
        {@const skillLevel = spec.linkSkills[linkSkillName]}
        <button
             on:click={()=>onClickLinkSkill(linkSkillName,linkSkill)}
             on:contextmenu|preventDefault={()=>onRightClickLinkSkill(linkSkillName,linkSkill)}
             on:mousemove={(e)=>onMouseMove(e,linkSkillName,linkSkill)}
             on:mouseleave={onMouseLeave}> 
          {#if skillLevel !== undefined}
          <div class="linkskill-level">Lv.{skillLevel}</div>
          {/if}
          <img src={linkSkill.imgUrl}
              alt={linkSkillName}
              class:active={skillLevel !== undefined} />
        </button>
      {/each}
    </div>
</div>
<HoverPanel isVisible={isVisibleHoverPanel}
            x={hoverPanelX} y={hoverPanelY}>
    <div class="hoverpanel-title">{hoveredItemName}</div>
    <div class="hoverpanel-description">{hoveredItem.description ?? "설명 없음"}</div>
</HoverPanel>

<style lang="scss">

  .bufflink-list{
    display: flex;
    margin-bottom: 5px;
    button{
      margin-right: 3px;
      height:30px;
      padding: 0;
      background-color: transparent;
      position: relative;
      border: none;
      .linkskill-level{
        position: absolute;
        bottom:0;
        right:3px;
        z-index: 1;
        color: rgb(255, 255, 255);
        text-shadow: #000000 0px 0px 2px, #000000 0px 0px 2px,
         #000000 0px 0px 2px, #000000 0px 0px 2px, #000000 0px 0px 2px;
        font-size: 8px;
        margin-top: 3px;
      }
      img{
        filter:grayscale(1); opacity: (0.5);
        cursor:pointer;
      }
      img.active{
        filter: none; opacity: 1;
      }
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