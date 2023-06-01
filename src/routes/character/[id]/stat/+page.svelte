<script lang="ts">
  import {liveQuery} from "dexie";
  import {idb} from "../../../../storage/idb";
  import {page} from "$app/stores";
  import {isOnTauri} from "../../../../backendAdapter/backendAdapter";
  import {buffDict} from "../../../../infoDictionary/BuffDict";
  import {CharacterSpec} from "../../../../util/mapleParser/mapleStat";

  export let character = liveQuery(() => idb.character.get(Number($page.params.id)))
  let a:CharacterSpec;

</script>
{#if isOnTauri() && $character}
<div>
  <div class="bufflink-list-container">
    <div class="subtitle">버프/링크</div>
    <div class="bufflink-list">
      {#each Object.keys(buffDict) as buffName}
        {@const buff = buffDict[buffName]}
        <img src={buff.imgUrl}
             class:active={$character.spec.default.buff[buffName] !== undefined} />
      {/each}
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
    margin-bottom: 3px;
  }

  .bufflink-list{
    display: flex;
    img{
      margin-right: 3px;
      filter:grayscale(1); opacity: (0.5);
    }
    img.active{
      filter: brightness(0.5);
    }
  }
</style>
