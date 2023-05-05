<script lang="ts">
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";

  export let tooltip;
  export let onClick = () => {};
  export let style:string = "";
  export let activated=false;
  export let size:"small"|"medium" = "medium"
</script>
<span style="color:white;">
  <SvelteTooltip tip={tooltip} top>
    <div class={`icon-button ${size}`} on:click={onClick} style={style}>
      <span class={`${activated ? "activated":""} icon`}>
        <slot></slot>
      </span>
    </div>
  </SvelteTooltip>
</span>

<style lang="scss">
  .icon-button{
    display: inline-block;
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
  .icon-button.small{
    width:24px;
    height:24px;
    padding:0;
  }
  .icon-button:hover{
    background-color: lightgray;
  }
  .icon{
    color: #aeaeae;
  }
  .icon.activated{
    filter:
      drop-shadow(1px 1px 10px gray)
      drop-shadow(1px 1px 10px gray);
    color:black;
  }
</style>
