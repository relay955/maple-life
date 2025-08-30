<script lang="ts">
  import Logo from "../components/Logo.svelte";
  import LeftBar from "./LeftBar.svelte";
  import {SvelteToast} from "@zerodevx/svelte-toast";
  import {onMount} from "svelte";
  import {runOnInitialize} from "../logic/runOnInitialize";
    import HoverPanel from "../components/HoverPanel.svelte";

  onMount(runOnInitialize)

</script>

<Logo isFixed/>
<LeftBar/>

<div class="main">
  <slot></slot>
  <div class="bottom-info">
    <div class="title">MapleLife</div>
    <div>MapleLife는 비영리 목적으로 배포됩니다.</div>
    <div>사용자는 MIT 라이선스 조건 및 넥슨의 저작권을 침해하지 않는 범위 내에서
      프로그램을 사용, 수정, 배포할 수 있는 권리가 부여됩니다. 자세한 내용은
      <a href="https://github.com/relay955/maple-life/blob/master/LICENCE" target="_blank">github</a>
      라이선스 문서를 참고하세요.</div>
    <div>MapleLife는
      <a href="https://maplestory.nexon.com/" target="_blank">메이플스토리</a>
      의 리소스(이미지,사운드,스텟정보 등)을 사용합니다.</div>
    <div>MapleLife는
      <a href="https://nexon.com" target="_blank">NEXON</a>
        의 공식 컨텐츠가 아니며, NEXON과 관련이 없습니다.
      <a href="https://member.nexon.com/policy/gameipguide.aspx" target="_blank">게임IP 사용가이드</a>
    </div>
  </div>
</div>

<SvelteToast/>
<HoverPanel/>

<style lang="scss">
  .main{
    width:100%;
    text-align: center;
    padding-bottom: 100px;
  }
  .bottom-info{
    .title{
      font-size: 12px;
      color:black;
      font-weight: bold;
      margin-bottom: 3px;
    }
    border-top: 1px solid #cccccc;
    padding-top: 10px;
    font-size: 11px;
    color: gray;
  }
  
  :global(input){
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
    color: #666;
    outline: none;
    &:focus{
      border: 1px solid #2b91da;
    }
  }
  
  :global(select){
    border: 1px solid #cccccc;
    border-radius: 5px;
    padding: 5px;
    font-size: 14px;
    color: #666;
    outline: none;
  }
  
  :global(input[type=checkbox]){
    width: 18px;
    height: 18px;
    margin: 2px 0 0;
    cursor: pointer;
    appearance: none;
    border: 2px solid #cccccc;
    border-radius: 4px;
    background-color: white;
    position: relative;
    vertical-align: middle;
    transition: all 0.2s ease;
    padding: 0;

    &:checked {
      background-color: #2b91da;
      border-color: #2b91da;

      &:after {
        content: '';
        position: absolute;
        left: 5px;
        top: 2px;
        width: 4px;
        height: 8px;
        border: solid white;
        border-width: 0 2px 2px 0;
        transform: rotate(45deg);
      }
    }

    &:hover {
      border-color: #2b91da;
    }
  }
</style>
