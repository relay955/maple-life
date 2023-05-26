<script lang="ts">
import {isOnTauri} from "../../backendAdapter/backendAdapter";
import Title from "../../components/shared/basicComponent/Title.svelte";
import PageContainer
  from "../../components/shared/basicComponent/PageContainer.svelte";
import Space from "../../components/shared/basicComponent/Space.svelte";
import WorldSelector from "../../components/shared/WorldSelector.svelte";
import {idb} from "../../storage/idb";
import {summarizeSpec} from "../../logic/specCalculator.js";
import MdDehaze from 'svelte-icons/md/MdDehaze.svelte'
import MdViewModule from 'svelte-icons/md/MdViewModule.svelte'
import IconButton
  from "../../components/shared/basicComponent/IconButton.svelte";
import {
  lqCharacterTabViewMode,
  updateCharacterTabViewMode
} from "../../storage/queries/systemQuery";
import CharacterLineList
  from "../../components/app/_character/CharacterLineList.svelte";
import CharacterCardList
  from "../../components/app/_character/CharacterCardList.svelte";

const onClickDebug = async () => {
  console.log(summarizeSpec((await idb.character.get(6))!,"default"))
}
</script>

{#if !isOnTauri()}
  <div>웹 버전에서는 해당 기능을 지원하지 않습니다.</div>
  <div>해당 기능을 사용하시려면 데스크탑 앱(설치형 버전)을 사용해주세요.</div>
{:else}
  <PageContainer>
    <div class="header">
      <Title text="캐릭터 관리"/>
      <Space/>
      <WorldSelector/>
    </div>
    <div class="view-mode-container">
      <IconButton selected={$lqCharacterTabViewMode === "card"}
                  onClick={()=>updateCharacterTabViewMode("card")}>
        <MdViewModule/>
      </IconButton>
      <IconButton selected={$lqCharacterTabViewMode === "list"}
                  onClick={()=>updateCharacterTabViewMode("list")}>
        <MdDehaze/>
      </IconButton>
    </div>
    {#if $lqCharacterTabViewMode === "card"}
      <CharacterCardList/>
    {:else }
      <CharacterLineList/>
    {/if}
    <button on:click={onClickDebug}>디버그</button>
  </PageContainer>
{/if}

<style lang="scss">
  .header{
    display: flex;
  }
  .view-mode-container{
    margin-bottom: 10px;
  }

</style>
