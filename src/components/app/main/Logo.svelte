<script>
  import logo from '$lib/images/icon/logo.png'
</script>

<div class="logo">
  <img src={logo}/>
  MapleLife
</div>

<style lang="scss">
  .logo{
    top:10px;
    left:60px;
    display: flex;
    position: fixed;
    z-index: 100;
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
  @media (max-width: 1739px){
    .logo{
      display:none
    }
  }
</style>
