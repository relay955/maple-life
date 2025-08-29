<script lang="ts">
  import type {TimerRect} from "../../logic/repeat-timer/timerRect";

  let overlayEl: HTMLDivElement | null = null;
  type Point = { x: number; y: number };

  let isSelecting = false;
  let startPt: Point = { x: 0, y: 0 };
  let currPt: Point = { x: 0, y: 0 };
  export let selectedArea: TimerRect | null = null;


  const getRelativePoint = (e: MouseEvent): Point => {
    if (!overlayEl) return { x: 0, y: 0 };
    const r = overlayEl.getBoundingClientRect();
    const x = Math.min(Math.max(e.clientX - r.left, 0), r.width);
    const y = Math.min(Math.max(e.clientY - r.top, 0), r.height);
    return { x, y };
  }

  const toRect = (a: Point, b: Point): TimerRect => {
    const left = Math.min(a.x, b.x);
    const top = Math.min(a.y, b.y);
    const width = Math.abs(a.x - b.x);
    const height = Math.abs(a.y - b.y);
    return { left, top, width, height };
  }

  const onMouseDown = (e: MouseEvent) => {
    isSelecting = true;
    startPt = getRelativePoint(e);
    currPt = startPt;
    selectedArea = null;
  }

  const onMouseMove = (e: MouseEvent) => {
    if (!isSelecting) return;
    currPt = getRelativePoint(e);
  }

  const finishSelection = (e?: MouseEvent) => {
    if (!isSelecting) return;
    if (e) currPt = getRelativePoint(e);
    isSelecting = false;
    selectedArea = toRect(startPt, currPt);

    // 좌표 결과: 픽셀 및 정규화(0~1)
    if (overlayEl && selectedArea) {
      const r = overlayEl.getBoundingClientRect();
      const norm = {
        x: selectedArea.left / r.width,
        y: selectedArea.top / r.height,
        w: selectedArea.width / r.width,
        h: selectedArea.height / r.height
      };
      console.log("선택 영역(px):", selectedArea);
      console.log("선택 영역(normalized 0~1):", norm);
    }
  }

  const onMouseUp = (e: MouseEvent) => {
    finishSelection(e);
  }

  const onMouseLeave = (e: MouseEvent) => {
    if (isSelecting) finishSelection(e);
  }

  $: drawRect = isSelecting ? toRect(startPt, currPt) : selectedArea;
</script>
<div
    class="overlay"
    bind:this={overlayEl}
    on:mousedown={onMouseDown}
    on:mousemove={onMouseMove}
    on:mouseup={onMouseUp}
    on:mouseleave={onMouseLeave}
    aria-label="selection-overlay"
>
  {#if drawRect && drawRect.width > 0 && drawRect.height > 0}
    <div
        class="selection-rect"
        style="
              left: {drawRect.left}px;
              top: {drawRect.top}px;
              width: {drawRect.width}px;
              height: {drawRect.height}px;
            "
    />
  {/if}
</div>

<style lang="scss">
  .overlay{
    position: absolute;
    inset: 0;
    pointer-events: auto;
    cursor: crosshair;
    background: transparent;
  }


  .selection-rect{
    position: absolute;
    box-sizing: border-box;
    border: 2px solid #1e90ff;
    background: rgba(30,144,255,0.15);
    border-radius: 2px;
    pointer-events: none;
  }
</style>