<script lang="ts">
import {lqCharacterTree} from "../../storage/queries/characterQuery";
import {
  lqSelectedWorldId,
  updateSelectedWorldId
} from "../../storage/queries/systemQuery";

const onClickWorld = (worldId:number) => {
  updateSelectedWorldId(worldId);
}

</script>
<div class="world-selector">
  {#each ($lqCharacterTree ?? []) as account (account.id)}
    <div class="account">{account.name}</div>
    {#each account.worlds as world (world.id)}
      <div class={`world ${$lqSelectedWorldId === world.id ? 'selected':''}`}
           on:click={()=>onClickWorld(world.id)}>
        {world.world}
      </div>
    {/each}
  {/each}
</div>

<style lang="scss">
  .world-selector{
    display:flex;
    align-items: center;
    .account{
      color:gray;
      font-size: 12px;
      margin-bottom: 3px;
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
      color:white;
    }
  }
</style>
