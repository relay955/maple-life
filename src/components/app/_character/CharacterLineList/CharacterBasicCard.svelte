<script lang="ts">
import type {Character} from "../../../../storage/dto/character";
import CharacterImage from "../../../shared/CharacterImage.svelte";

export let character:Character;
</script>

<div class="main">
  <CharacterImage character={character}/>
  <div class='img' style={`background:url(${character.imgUrl})`}>
  </div>
  <div class="name">{character.name}</div>
  <div class="level-class">Lv.{character.level}, {character.classType}</div>
</div>

<style lang="scss">
  .main{
    width: 100px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .name{
      font-size: 10px;
      white-space: nowrap;
      overflow: hidden;
    }
    .level-class{
      text-align: center;
      font-size: 8px;
      color: gray;
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
  }
</style>
