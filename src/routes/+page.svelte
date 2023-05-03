<script>
  import Toolbar from "../components/app/main/Toolbar.svelte";
  import Logo from "../components/app/main/Logo.svelte";
  import Title from "../components/shared/Title.svelte";
  import DragDropList from "../components/shared/DragDropList.svelte";

  let data = ["Adams", "Boston", "Chicago", "Denver"];
</script>

<Logo/>
<Toolbar/>
<div class="main">
  <div class="container">
    <Title text="할일"/>
    <DragDropList bind:data={data}/>
  </div>
</div>

<style>
  :global(.dragdroplist > .list){
    cursor:default !important;
  }
  :global(.dragdroplist > .list > div.item){
    cursor:default;
  }
  :global(.dragdroplist > .list > div.item > .buttons){
    display:none !important;
    opacity: 0;
  }
  .main{
    width:100%;
    text-align: center;
  }
  .container{
    text-align: left;
    display: inline-block;
    width: 1420px;
  }
  @media(max-width: 1420px){
    .container{
      width:calc(100% - 20px)
    }
  }
</style>

