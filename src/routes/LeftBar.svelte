<script lang="ts">
  import MdCheckBox from 'svelte-icons/md/MdCheckBox.svelte'
  import MdPerson from 'svelte-icons/md/MdPerson.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../components/basicComponent/IconButton.svelte";
  import MdHome from 'svelte-icons/md/MdHome.svelte'
  import MdInsertComment from 'svelte-icons/md/MdInsertComment.svelte'
  import MdBuild from 'svelte-icons/md/MdBuild.svelte'
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
  <IconButton tooltip="파운틴 타이머"
              style="margin-bottom: 4px"
              direction="right"
              onClick="{()=>goto('/repeat-timer')}">
    <div class="material-symbols--av-timer"/>
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

  .material-symbols--av-timer {
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M12 21q-1.85 0-3.488-.712T5.65 18.35t-1.937-2.863T3 12q0-1.1.25-2.137t.725-1.95t1.138-1.7T6.6 4.8l6.8 6.8L12 13L6.6 7.6q-.75.9-1.175 2.013T5 12q0 2.9 2.05 4.95T12 19t4.95-2.05T19 12q0-2.675-1.713-4.612T13 5.1V7h-2V3h1q1.85 0 3.488.713T18.35 5.65t1.938 2.863T21 12t-.712 3.488t-1.938 2.862t-2.863 1.938T12 21m-5-8q-.425 0-.712-.288T6 12t.288-.712T7 11t.713.288T8 12t-.288.713T7 13m5 5q-.425 0-.712-.288T11 17t.288-.712T12 16t.713.288T13 17t-.288.713T12 18m5-5q-.425 0-.712-.288T16 12t.288-.712T17 11t.713.288T18 12t-.288.713T17 13'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }

</style>
