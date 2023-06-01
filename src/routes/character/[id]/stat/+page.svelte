<script lang="ts">
  import {liveQuery} from "dexie";
  import {idb} from "../../../../storage/idb";
  import {page} from "$app/stores";
  import {isOnTauri} from "../../../../backendAdapter/backendAdapter";
  import {buffDict} from "../../../../infoDictionary/BuffDict";

  export let character = liveQuery(() => idb.character.get(Number($page.params.id)))

</script>
{#if isOnTauri() && $character}
<div>
  <div class="bufflink-list-container">
    <div class="subtitle">버프/링크</div>
    <div class="bufflink-list">
      {#each Object.keys(buffDict) as buffName}
        {@const buff = buffDict[buffName]}
        <img src={buff.imgUrl}/>
      {/each}
<!--      <img src={buffDict["길드스킬 - 길드의 매운 맛"].imgUrl}/>-->
      <!--{#each Object.keys(buffDict) as buff}-->
      <!--<div class="buff">-->
      <!--  <div class="buff-icon">-->
      <!--    <img src={buff.icon} alt={buff.name}/>-->
      <!--  </div>-->
      <!--  <div class="buff-name">{buff.name}</div>-->
      <!--  <div class="buff-duration">{buff.duration}</div>-->
      <!--</div>-->
      <!--{/each}-->
    </div>
    <div class="bufflink-list">

    </div>
  </div>
</div>
{/if}

<style lang="scss">
  .subtitle{
    font-size: 14px;
    font-weight: bold;
    color: #949494;
  }

  .bufflink-list{
    display: flex;
  }
</style>
