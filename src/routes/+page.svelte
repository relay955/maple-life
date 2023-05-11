<script>
  import {onMount} from "svelte";
  import {routeToPage} from "../util/svelteNavigation.ts";

  onMount(async () => {
    await routeToPage("todo")
  })
</script>
