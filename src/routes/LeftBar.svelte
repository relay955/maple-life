<script lang="ts">
  import MdInbox from 'svelte-icons/md/MdInbox.svelte'
  import MdCheckBox from 'svelte-icons/md/MdCheckBox.svelte'
  import MdPerson from 'svelte-icons/md/MdPerson.svelte'
  import IoMdMegaphone from 'svelte-icons/io/IoMdMegaphone.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../components/basicComponent/IconButton.svelte";
  import MdHome from 'svelte-icons/md/MdHome.svelte'
  import MdInsertComment from 'svelte-icons/md/MdInsertComment.svelte'
  import MdBuild from 'svelte-icons/md/MdBuild.svelte'
  import MdMonetizationOn from 'svelte-icons/md/MdMonetizationOn.svelte'
  import MdInfoOutline from 'svelte-icons/md/MdInfoOutline.svelte'
  import Space from "../components/basicComponent/Space.svelte";
  import WebsiteInfoModal from "./_LeftBar/WebsiteInfoModal.svelte";
  import {goto} from "$app/navigation";

  let isOpenInfoPopup = false;
</script>

<div class="main">
  <IconButton tooltip="할일"
              style="margin-bottom: 4px"
              direction="right"
              onClick="{()=>goto('/todo')}">
    <MdCheckBox/>
  </IconButton>

  <IconButton tooltip="캐릭터"
              style="margin-bottom: 4px"
              direction="right"
              onClick="{()=>goto('/character')}">
    <MdPerson/>
  </IconButton>

  <div class="link-header">Link</div>
  <IconButton tooltip="메이플 홈페이지"
              style="margin-bottom: 4px"
              direction="right">
    <a href="https://maplestory.nexon.com/Home/Main" target="_blank" style="color:gray;">
      <MdHome/>
    </a>
  </IconButton>
  <IconButton tooltip="메이플 인벤"
              style="margin-bottom: 4px"
              direction="right">
    <a href="https://maple.inven.co.kr" target="_blank" style="color:gray;">
      <MdInsertComment/>
    </a>
  </IconButton>
  <IconButton tooltip="메이플 유틸 - 시드/몬라 유틸리티"
              direction="right"
              style="margin-bottom: 4px">
    <a href="https://mapleutils.com" target="_blank" style="color:gray;">
      <MdBuild/>
    </a>
  </IconButton>
  <IconButton tooltip="큐브매수통 - 큐브 기댓값 계산기"
              style="margin-bottom: 4px"
              direction="right">
    <a href="https://cubemesu.co" target="_blank" style="color:gray;">
      <MdInbox/>
    </a>
  </IconButton>
  <IconButton tooltip="쓸만한 분배금 계산기"
              style="margin-bottom: 4px"
              direction="right">
    <a href="https://141.kr" target="_blank" style="color:gray;">
      <MdMonetizationOn/>
    </a>
  </IconButton>
  <IconButton tooltip="메소리 - 고확 확인 및 경뿌 알림"
              style="margin-bottom: 4px"
              direction="right">
    <a href="https://maplesori.com/sori" target="_blank" style="color:gray;">
      <IoMdMegaphone/>
    </a>
  </IconButton>
  <Space/>
  <IconButton tooltip="웹사이트 정보"
              style="margin-bottom: 4px"
              direction="right"
              onClick={()=>isOpenInfoPopup = true}>
    <MdInfoOutline/>
  </IconButton>
</div>

<WebsiteInfoModal bind:isOpen={isOpenInfoPopup}/>

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

  a{
    color: #aeaeae !important;
  }


</style>
