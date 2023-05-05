<script lang="ts">
  export let title:string = "";
  export let value:number = 1;
</script>

<div>
  <div class="title">{title}</div>
  <input bind:value={value} type="number"/>
</div>

<style>
  .title{
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }
  input{
    width: 100%;
    border: none;
    border-radius: 2px;
    outline: none;
    box-sizing: border-box;
    padding: 4px;
    margin-bottom: 8px;
  }
</style>
