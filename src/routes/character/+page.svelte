<script lang="ts">
import {isOnTauri} from "../../backendAdapter/backendAdapter";
import Title from "../../components/shared/basicComponent/Title.svelte";
import PageContainer
  from "../../components/shared/basicComponent/PageContainer.svelte";
import Space from "../../components/shared/basicComponent/Space.svelte";
import {lqCharacterTree} from "../../storage/queries/characterQuery";

</script>

{#if !isOnTauri()}
  <div>웹 버전에서는 해당 기능을 지원하지 않습니다.</div>
  <div>해당 기능을 사용하시려면 데스크탑 앱(설치형 버전)을 사용해주세요.</div>
{:else}
  <PageContainer>
    <div class="header">
      <Title text="캐릭터 관리"/>
      <Space/>
      <div class="world-selector">
        {#each ($lqCharacterTree ?? []) as account (account.id)}
          <div class="account">{account.name}</div>
          {#each account.worlds as world (world.id)}
            <div class="world">{world.world}</div>
          {/each}
        {/each}
      </div>
    </div>
  </PageContainer>
{/if}

<style lang="scss">
  .header{
    display: flex;
  }
  .world-selector{
    display:flex;
    align-items: center;
    .account{
      color:gray;
      font-size: 12px;
      margin-right: 5px;
    }
    .world{
      font-size: 13px;
      margin-right: 3px;
      padding: 3px 10px;
      background-color: white;
      border:1px solid lightgrey;
      border-radius: 30px;
      cursor: pointer;
      transition: 0.2s all;
    }
    .world:hover{
      background-color: #f4f4f4;
    }
    .world.selected{
      background-color: #44aaee;
    }
  }
</style>
