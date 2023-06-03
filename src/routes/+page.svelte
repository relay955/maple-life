<script>
  import {onMount} from "svelte";
  import {routeToPage} from "../util/svelteNavigation";

  onMount(async () => {
    await routeToPage("todo",true)
  })
</script>
