<script>
  import logo from '$lib/images/icon/logo.png'
  export let isFixed = false;
</script>

<div class={`logo ${isFixed ? "fixed":""}`}>
  <img src={logo}/>
  MapleLife
</div>

<style lang="scss">
  .logo{
    display: inline-flex;
    align-items: center;
    font-size: 18px;
    font-weight: 700;
    color: #4d4d4d;
    img{
      margin-right: 5px;
      width: 30px;
      height: 30px;
    }
  }
  .logo.fixed{
    top:10px;
    left:60px;
    position: fixed;
    z-index: 100;
  }
  @media (max-width: 1739px){
    .logo.fixed{
      display:none
    }
  }
</style>
