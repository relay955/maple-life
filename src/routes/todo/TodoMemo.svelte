<script lang="ts">
  import {
    lqMemo,
    lqShowMemo,
    updateMemo
  } from "../../storage/queries/systemQuery.ts";
  import TextAreaAutoResize
    from "../../components/basicComponent/TextAreaAutoResize.svelte";

</script>

{#if $lqShowMemo}
  <TextAreaAutoResize onUpdate={(e)=>updateMemo(e.target.value)}
                      placeholder="여기에 메모를 남겨보세요!"
                      value={$lqMemo}/>
{/if}

