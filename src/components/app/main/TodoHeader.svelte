<script lang="ts">
  import type {Character} from "../../../storage/dto/character";

  export let characters:Character[];
</script>
<div class="header">
  <div class="title">할일</div>
  {#each characters as character (character.name)}
    <div class="character">
      <div>
        <div class="name">
          {character.name}
        </div>
        <div class="subtitle">
          Lv.{character.level}, {character.classType}
        </div>
      </div>
    </div>
  {/each}
</div>

<style lang="scss">
  .header{
    margin-top: 10px;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    position: sticky;
    .title{
      width: 510px;
      font-size: 20px;
      font-weight: bold;
    }
    .character{
      flex-grow: 1;
      width: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      .name{
        font-size: 16px;
        font-weight: bold;
        text-align: center;
      }
      .subtitle{
        font-size: 12px;
        color: gray;
      }
    }
  }
</style>
