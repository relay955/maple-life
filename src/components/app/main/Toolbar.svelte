<script>
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'
  import SvelteTooltip from "svelte-tooltip";
</script>

<div class="toolbar">
  <div class="icon-button">
    <SvelteTooltip tip="캐릭터 추가" top>
      <span class="icon">
        <MdPersonAdd fill="gray"/>
      </span>
    </SvelteTooltip>
  </div>
</div>

<style>
  .toolbar{
    position: fixed;
    bottom: 0;
    left: calc(50% - 150px);
    width: 300px;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    z-index: 100;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
  .icon-button{
    width:35px;
    height:35px;
    padding:5px;
    box-sizing: border-box;
    border-radius: 30px;
    color:white;
    cursor: pointer;
    transition: 0.2s all;
  }
  .icon-button:hover{
    background-color: lightgray;
  }
  .icon{
    color:gray;
  }
</style>
