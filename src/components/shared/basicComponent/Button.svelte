<script lang="ts">
  import {Jumper} from "svelte-loading-spinners";

  export let onClick:()=>void;
  export let style:string = "";
  export let isLoading:boolean = false;

</script>
<button on:click={onClick} style={style}>
  {#if !isLoading}
    <slot></slot>
  {/if}
  {#if isLoading}
    <Jumper color="white" size="30" />
  {/if}
</button>

<style>
  button{
    background-color: #70a5e0;
    border: none;
    color: white;
    padding: 5px;
    text-align: center;
    text-decoration: none;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    width: 100%;
    transition: 0.2s all;
    justify-content: center;
    display: flex;
  }
  button:hover{
    background-color: #6391c1;
  }
  .loading{
    width:30px;
    height:30px;
  }
</style>
