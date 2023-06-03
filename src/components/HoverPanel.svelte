<script lang="ts">
  export let width = 300;
  export let x = 0;
  export let y = 0;
  export let isVisible;
</script>

{#if isVisible}
  <div class="main"
       style={`width:${width}px; top:${y+10}px; left:${x+10}px`}>
    <slot></slot>
  </div>
{/if}

<style>
  .main{
    position:absolute;
    backdrop-filter: blur(4px);
    background: rgba(255,255,255,0.5);
    z-index: 1000;
    padding:10px;
    border-radius: 5px;
    border:solid 1px #cccccc;
  }
</style>
