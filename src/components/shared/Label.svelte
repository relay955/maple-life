<script>
  export let color = 'gray';
</script>
<div class="main" style={`background-color:${color}`}>
  <slot></slot>
</div>

<style>
  .main{
    display: inline-flex;
    font-size: 13px;
    font-weight: bold;
    color: white;
    border-radius: 20px;
    width: 60px;
    height: 20px;
    padding-bottom: 2px;
    justify-content: center;
    align-items: center;
  }
</style>
