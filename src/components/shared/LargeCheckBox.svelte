<script lang="ts">
  import type {TodoCheckType} from "../../storage/dto/todo";
  import MdRadioButtonUnchecked from 'svelte-icons/md/MdRadioButtonUnchecked.svelte'
  import MdCheckCircle from 'svelte-icons/md/MdCheckCircle.svelte'
  export let checked:TodoCheckType;
  export let onClick:()=>void;
  export let onRightClick:()=>void;
  export let style:string="";

</script>
<div class={`main ${checked}`} on:click={onClick} style={style}
     on:contextmenu|preventDefault={onRightClick}>
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
    display: flex;
    margin-left: 2px;
    margin-right: 2px;
    align-items: center;
    flex-grow: 1;;
    justify-content: center;
    box-sizing: border-box;
    padding-top: 3px;
    padding-bottom: 3px;
    cursor:pointer;

    transition: 0.2s all;
  }

  .main.checked{
    background-color: #93dc75 !important;
    color:white;
  }
  .main.checked:hover{
    background-color: #abed8f !important;
  }

  .main.unchecked{
    color:lightgray;
  }
  .main.unchecked:hover{
    background-color: #f4f4f4;
    color: #a2a2a2;
  }
  .main.blocked{
    background: repeating-linear-gradient(45deg, #EEE, #EEE 10px, #DDD 0, #DDD 20px) !important;
    cursor: not-allowed;
  }
</style>
