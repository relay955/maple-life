<script lang="ts">
  export let title:string|number = "";
  export let value:string|number = "";
</script>

<div>
  <div class="title">{title}</div>
  <select bind:value={value}>
    <slot></slot>
  </select>
</div>

<style>
  .title{
    font-size: 14px;
    color: #666;
    margin-bottom: 4px;
  }

  select{
    width: 100%;
    height: 32px;
    border: 1px solid #ccc;
    border-radius: 4px;
    padding: 0 8px;
    font-size: 14px;
    color: #666;
    margin-bottom: 8px;
  }
</style>
