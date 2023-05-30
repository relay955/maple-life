<script lang="ts">
  import type {Character} from "../../storage/dto/character";
  import MdFavoriteBorder from 'svelte-icons/md/MdFavoriteBorder.svelte'

  export let character:Character;
</script>

{#if character.imgUrl !== ""}
  <div class='img' style={`background:url(${character.imgUrl})`}>
  </div>
{:else}
  <div class='default-img'>
    <MdFavoriteBorder/>
  </div>
{/if}

<style lang="scss">
  .img {
    width: 50px;
    height: 50px;
    background-position: 52% 61% !important;
    background-size: 218% !important;
  }
  .default-img {
    width: 40px;
    height: 40px;
    padding: 5px;
  }

  @media(max-width: 750px){
    .img {
      width: 36px;
      height: 36px;
      background-position: 52% 61% !important;
      background-size: 218% !important;
    }

    .default-img {
      width: 30px;
      height: 30px;
      padding: 3px;
    }
  }
</style>
