<script lang="ts">
import {isOnTauri} from "../../backendAdapter/backendAdapter";
import Title from "../../components/basicComponent/Title.svelte";
import PageContainer
  from "../../components/basicComponent/PageContainer.svelte";
import Space from "../../components/basicComponent/Space.svelte";
import WorldSelector from "../../components/WorldSelector.svelte";
import MdDehaze from 'svelte-icons/md/MdDehaze.svelte'
import MdViewModule from 'svelte-icons/md/MdViewModule.svelte'
import IconButton
  from "../../components/basicComponent/IconButton.svelte";
import {
  lqCharacterTabViewMode,
  updateCharacterTabViewMode
} from "../../storage/queries/systemQuery";
import CharacterLineList
  from "./CharacterLineList.svelte";
import CharacterCardList
  from "./CharacterCardList.svelte";

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
