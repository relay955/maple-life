<script>
import Logo from "../../components/Logo.svelte";
import Modal from "../../components/Modal.svelte";
export let isOpen = false
</script>

<Modal isOpen={isOpen} onClose={()=>isOpen = false}>
  <div class="info-modal">
    <Logo/>
    <div class="description">for playing Maplestory as life</div>
    <div class="description">
      모든 데이터는 사용자 PC에 저장되며, 사이트는 데이터를 수집하지 않습니다.
    </div>
    <div class="license">
      distributed under the MIT license
    </div>
    <div class="info-body">
      <div><a href="https://github.com/relay955/maple-life">github</a></div>
      <div>contact : <a href="mailto:refcell22@naver.com">refcell22@naver.com</a></div>
    </div>
  </div>
</Modal>

<style lang="scss">
  .info-modal{
    text-align: center;
    margin-bottom: 40px;
    .description{
      font-size: 12px;
      color: gray;
      margin-bottom: 3px;
    }
    .license{
      margin-top: 10px;
      font-size: 12px;
      color: gray;
      margin-bottom: 13px;
    }
    .info-body{
      font-size: 13px;
      div{
        margin-bottom: 3px;
      }
    }
  }
</style>
