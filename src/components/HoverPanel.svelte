<script lang="ts">
    import { hoverPanelState } from "./HoverPanelStore";

  
</script>

{#if $hoverPanelState.isVisible}
  <div class="main"
       style={`width:${$hoverPanelState.width}px; 
       top:${$hoverPanelState.y+10}px; left:${$hoverPanelState.x+10}px`}>
       <div class="title"> {$hoverPanelState.title} </div>
       <div class="description"> {$hoverPanelState.description} </div>
  </div>
{/if}

<style>
  .main{
    position:absolute;
    backdrop-filter: blur(10px);
    background: rgba(255,255,255,0.7);
    z-index: 1000;
    padding:10px;
    border-radius: 5px;
    border:solid 1px #cccccc;
  }

  .title{
    font-size:14px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .description{
    font-size: 12px;
    color: #5e5e5e;
    white-space: pre-line;
  }
</style>
