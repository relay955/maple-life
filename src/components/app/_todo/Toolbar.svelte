<script lang="ts">
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'
  import MdUnfoldLess from 'svelte-icons/md/MdUnfoldLess.svelte'
  import MdPhotoSizeSelectLarge from 'svelte-icons/md/MdPhotoSizeSelectLarge.svelte'
  import MdGroupAdd from 'svelte-icons/md/MdGroupAdd.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../../shared/basicComponent/IconButton.svelte";
  import {
    lqShortHeightMode,
    lqShowCharacterPreview, updateShortHeightMode, updateShowCharacterPreview
  } from "../../../storage/queries/systemQuery";

  export let onClickAccountAddButton:()=>void;
  export let onClickCharacterAddButton:()=>void;

  const onClickShortHeightModeButton = () => updateShortHeightMode(!$lqShortHeightMode)
  const onClickShowCharacterPreviewButton = () => updateShowCharacterPreview(!$lqShowCharacterPreview)

</script>

<div class="toolbar">
  <IconButton onClick={onClickCharacterAddButton} tooltip="캐릭터 추가"
              activated="">
    <MdPersonAdd/>
  </IconButton>
  <IconButton onClick={onClickAccountAddButton} tooltip="계정 추가 - 메이플스토리 계정을 여러개 사용하는 경우에만 추가하세요.">
    <MdGroupAdd/>
  </IconButton>
  <IconButton onClick={onClickShortHeightModeButton}
              tooltip="좁은높이 모드 - 한 화면에 더 많은 할일을 보고싶을때 사용해보세요."
              activated={$lqShortHeightMode}>
    <MdUnfoldLess/>
  </IconButton>
  <IconButton onClick={onClickShowCharacterPreviewButton}
              tooltip="캐릭터 사진 보기 - 한 화면에 더 많은 할일을 보고싶다면 끌 수 있어요."
              activated={$lqShowCharacterPreview}>
    <MdPhotoSizeSelectLarge/>
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
