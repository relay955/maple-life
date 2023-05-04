<script lang="ts">
  import type {TodoCheckType} from "../../storage/dto/todo";
  import MdRadioButtonUnchecked from 'svelte-icons/md/MdRadioButtonUnchecked.svelte'
  import MdCheckCircle from 'svelte-icons/md/MdCheckCircle.svelte'
  export let checked:TodoCheckType;
  export let onClick:()=>void;
</script>
<div class={`main ${checked}`} on:click={onClick}>
  {#if checked==="checked"}
    <MdCheckCircle/>
  {/if}
  {#if checked==="unchecked"}
    <MdRadioButtonUnchecked/>
  {/if}
</div>

<style lang="scss">
  .main{
    background-color: white;
    border:2px solid #e6e6e6;
    border-radius: 5px;
    height: 40px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 2px;
    box-sizing: border-box;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor:pointer;

    transition: 0.2s all;
  }

  .main.checked{
    background-color: #93dc75;
    color:white;
  }
  .main.checked:hover{
    background-color: #abed8f;
  }

  .main.unchecked{
    color:lightgray;
  }
  .main.unchecked:hover{
    background-color: #f4f4f4;
    color: #a2a2a2;
  }
  .main.blocked{
    background: repeating-linear-gradient(45deg, #EEE, #EEE 10px, #DDD 0, #DDD 20px);
    cursor: not-allowed;
  }
</style>
