<script lang="ts">
  import MdAddCircleOutline from 'svelte-icons/md/MdAddCircleOutline.svelte'
  export let onClick:()=>void;
</script>

<div class="add-todo-button" on:click={onClick}>
  <MdAddCircleOutline/>
</div>

<style lang="scss">
  .add-todo-button{
    box-sizing: border-box;
    width: 100%;
    height:40px;
    display: flex;
    border: 1px solid #589de1;
    border-radius: 4px;
    padding-top:2px;
    padding-bottom:2px;
    background-color: white;
    align-items: center;
    margin-top: 5px;
    cursor: pointer;
    color: #589de1;
    transition: 0.2s all;
  }
  .add-todo-button:hover{
    background-color: #cce3fa;
  }
</style>
