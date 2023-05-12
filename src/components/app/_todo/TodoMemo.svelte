<script lang="ts">
  import {
    lqMemo,
    lqShowMemo,
    updateMemo
  } from "../../../storage/queries/systemQuery.ts";
  import TextAreaAutoResize
    from "../../shared/basicComponent/TextAreaAutoResize.svelte";

</script>

{#if $lqShowMemo}
  <TextAreaAutoResize onUpdate={(e)=>updateMemo(e.target.value)}
                      value={$lqMemo}/>
{/if}

