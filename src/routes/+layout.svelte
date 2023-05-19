<script lang="ts">
  import Logo from "../components/shared/Logo.svelte";
  import LeftBar from "../components/app/layout/LeftBar.svelte";
  import {SvelteToast} from "@zerodevx/svelte-toast";
  import {onMount} from "svelte";
  import {runOnInitialize} from "../logic/runOnInitialize";

  onMount(runOnInitialize)
  export const prerender = true;
  export const ssr = false;

</script>

<Logo isFixed/>
<LeftBar/>

<div class="main">
  <slot></slot>
</div>

<SvelteToast/>

<style>
  .main{
    width:100%;
    text-align: center;
    padding-bottom: 400px;
  }
</style>
