<script lang="ts">
  import MdInbox from 'svelte-icons/md/MdInbox.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../../shared/IconButton.svelte";
  import MdHome from 'svelte-icons/md/MdHome.svelte'
  import MdInsertComment from 'svelte-icons/md/MdInsertComment.svelte'
  import MdBuild from 'svelte-icons/md/MdBuild.svelte'
  import MdMonetizationOn from 'svelte-icons/md/MdMonetizationOn.svelte'
  import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte'
  import {onMount} from "svelte";
  import Space from "../../shared/Space.svelte";
  import Modal from "../../shared/Modal.svelte";
  import logo from '$lib/images/icon/logo.png'
  import Logo from "./Logo.svelte";

  let location;
  let isOpenInfoPopup = false;

  onMount(()=>{
    location = window.location;
  })
</script>


<div class="main">
  <div class="link-header">Link</div>
  <IconButton tooltip="메이플 홈페이지"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>window.open("https://maplestory.nexon.com/Home/Main")}>
    <MdHome/>
  </IconButton>
  <IconButton tooltip="메이플 인벤"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>window.open("https://maple.inven.co.kr/")}>
    <MdInsertComment/>
  </IconButton>
  <IconButton tooltip="메이플 유틸 - 시드/몬라 유틸리티"
              direction="right"
              style="margin-bottom: 4px"
              onClick={()=>window.open("https://mapleutils.com/")}>
    <MdBuild/>
  </IconButton>
  <IconButton tooltip="큐브매수통 - 큐브 기댓값 계산기"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>window.open("https://cubemesu.co/")}>
    <MdInbox/>
  </IconButton>
  <IconButton tooltip="쓸만한 분배금 계산기"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>window.open("https://141.kr")}>
    <MdMonetizationOn/>
  </IconButton>
  <Space/>
  <IconButton tooltip="웹사이트 정보"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>isOpenInfoPopup = true}>
    <MdInfoOutline/>
  </IconButton>
</div>
<Modal isOpen={isOpenInfoPopup} onClose={()=>isOpenInfoPopup = false}>
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
  .main{
    padding-top: 20px;
    position: fixed;
    display: flex;
    flex-direction: column;
    align-items: center;
    left: 0;
    height:100%;
    width:50px;
    background-color: #f1f1f1;
    z-index: 200;
    box-sizing: border-box;
  }
  .link-header{
    font-weight: bold;
    margin-bottom: 10px;
  }

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
