<script lang="ts">
import Button from "../../components/basicComponent/Button.svelte";

export let onClickStartScreenCapture:()=>void;
export let onClickStopScreenCapture:()=>void;
export let onClickRestart:()=>void;
export let onClickPause:()=>void;
export let isCapturing:boolean;
export let isOcrRunning:boolean;
   
</script>
<div class="controller">
{#if !isCapturing}
<Button onClick={onClickStartScreenCapture} style="padding: 10px">캡처 시작</Button>
{:else}
  {#if isOcrRunning}
    <Button onClick={onClickPause} style="padding: 10px;width: 150px">OCR 일시중지</Button>
  {:else}
    <Button onClick={onClickRestart} style="padding: 10px; width: 150px">OCR 시작</Button>
  {/if}
  <Button onClick={onClickStopScreenCapture} style="padding: 10px">캡처 종료</Button>
{/if}
</div>

<style lang="scss">
  .controller {
    display: flex;
    gap: 10px;
  }
</style>
