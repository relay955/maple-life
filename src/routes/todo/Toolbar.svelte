<script lang="ts">
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'
  import MdUnfoldLess from 'svelte-icons/md/MdUnfoldLess.svelte'
  import MdPhotoSizeSelectLarge
    from 'svelte-icons/md/MdPhotoSizeSelectLarge.svelte'
  import MdGroupAdd from 'svelte-icons/md/MdGroupAdd.svelte'
  import MdDescription from 'svelte-icons/md/MdDescription.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../../components/basicComponent/IconButton.svelte";
  import {
    lqShortHeightMode,
    lqShowCharacterPreview, lqShowMemo,
    updateShortHeightMode,
    updateShowCharacterPreview, updateShowMemo
  } from "../../storage/queries/systemQuery";

  export let onClickAccountAddButton:()=>void;
  export let onClickCharacterAddButton:()=>void;



</script>

<div class="toolbar">
  <IconButton onClick={onClickCharacterAddButton} tooltip="캐릭터 추가">
    <MdPersonAdd/>
  </IconButton>
  <IconButton onClick={onClickAccountAddButton} tooltip="계정 추가 - 메이플스토리 계정을 여러개 사용하는 경우에만 추가하세요.">
    <MdGroupAdd/>
  </IconButton>
  <IconButton onClick={() => updateShortHeightMode(!$lqShortHeightMode)}
              tooltip="좁은높이 모드 - 한 화면에 더 많은 할일을 보고싶을때 사용해보세요."
              activated={$lqShortHeightMode}>
    <MdUnfoldLess/>
  </IconButton>
  <IconButton onClick={() => updateShowCharacterPreview(!$lqShowCharacterPreview)}
              tooltip="캐릭터 사진 보기 - 한 화면에 더 많은 할일을 보고싶다면 끌 수 있어요."
              activated={$lqShowCharacterPreview}>
    <MdPhotoSizeSelectLarge/>
  </IconButton>
  <IconButton onClick={() => updateShowMemo(!$lqShowMemo)}
              tooltip="메모 사용 - 간략한 메모를 남길 수 있어요. (할일목록 최상단에 표시)"
              activated={$lqShowMemo}>
    <MdDescription/>
  </IconButton>
</div>

<style>
  .toolbar{
    position: fixed;
    bottom: 0;
    left: calc(50% - 150px);
    width: 300px;
    height: 50px;
    background-color: #f5f5f5;
    border-bottom: 1px solid #e5e5e5;
    z-index: 100;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    display: flex;
    justify-content: space-around;
    align-items: center;
  }
</style>
