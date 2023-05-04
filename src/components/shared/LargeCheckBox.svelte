<script lang="ts">
  import type {TodoCheckType} from "../../storage/dto/todo";
  export let checked:TodoCheckType;
</script>
<div class="main">
  {checked}
</div>

<style lang="scss">
  .main{
    background-color: white;
    border:1px solid #cccccc;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
  }
</style>
