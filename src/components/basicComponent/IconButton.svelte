<script lang="ts">
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";

  export let tooltip:string|undefined = undefined;
  export let onClick = () => {};
  export let style:string = "";
  export let activated=false;
  export let selected=false;
  export let size:"small"|"medium" = "medium"
  export let direction:"top"|"bottom"|"left"|"right" = "top"
</script>
<div class="main">
  <SvelteTooltip tip={tooltip} top={direction==="top"} right={direction==="right"} bottom={direction==="bottom"}>
    <button class={`icon-button ${size} ${selected ? "selected":""}`} on:click={onClick} style={style}>
      <span class={`${activated ? "activated":""} icon`}>
        <slot></slot>
      </span>
    </button>
  </SvelteTooltip>
</div>

<style lang="scss">
  .main{
    display: inline-block;
    color: white;
    z-index: 1;
  }
  .icon-button{
    display: inline-block;
    width:35px;
    height:35px;
    padding:5px;
    box-sizing: border-box;
    border-radius: 30px;
    color:white;
    cursor: pointer;
    transition: 0.2s all;
    border:none;
    background-color: transparent;
  }
  .icon-button.small{
    width:24px;
    height:24px;
    padding:0;
  }
  .icon-button:hover{
    background-color: lightgray;
  }
  .icon-button.selected{
    background-color: #44aaee;
    .icon{
      color: white;
    }
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

  @media(max-width: 750px){
    .icon-button{
      width:24px;
      height:24px;
      padding:0;
    }
    .icon-button.small{
      width:20px;
      height:20px;
      padding:0;
    }
  }
</style>
