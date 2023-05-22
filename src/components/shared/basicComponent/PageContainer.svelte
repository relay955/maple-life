<div class="container">
  <slot></slot>
</div>

<style>
  .container{
    text-align: left;
    display: inline-block;
    min-width: 1420px;
    margin-left: 60px;
    margin-right: 20px;
    padding-bottom: 400px;
  }
  @media(max-width: 1550px){
    .container{
      min-width: calc(100% - 70px);
    }
  }
</style>
