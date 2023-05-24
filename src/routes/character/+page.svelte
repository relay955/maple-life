<script lang="ts">
import {isOnTauri} from "../../backendAdapter/backendAdapter";
import Title from "../../components/shared/basicComponent/Title.svelte";
import PageContainer
  from "../../components/shared/basicComponent/PageContainer.svelte";
import Space from "../../components/shared/basicComponent/Space.svelte";
import WorldSelector from "../../components/shared/WorldSelector.svelte";
import CharacterList
  from "../../components/app/_character/CharacterList.svelte";
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
    <CharacterList/>
  </PageContainer>
{/if}

<style lang="scss">
  .header{
    display: flex;
  }

</style>
