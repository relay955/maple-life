<script lang="ts">
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";

  export let tooltip;
  export let onClick = () => {};
  export let style:string = "";
</script>
<div class="icon-button" on:click={onClick} style={style}>
  <SvelteTooltip tip={tooltip} top>
    <span class="icon">
      <slot></slot>
    </span>
  </SvelteTooltip>
</div>

<style lang="scss">
  .icon-button{
    z-index: 100;
    width:35px;
    height:35px;
    padding:5px;
    box-sizing: border-box;
    border-radius: 30px;
    color:white;
    cursor: pointer;
    transition: 0.2s all;
  }
  .icon-button:hover{
    background-color: lightgray;
  }
  .icon{
    color:gray;
  }
</style>
