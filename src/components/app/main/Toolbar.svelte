<script lang="ts">
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'
  import MdUnfoldLess from 'svelte-icons/md/MdUnfoldLess.svelte'
  import MdPhotoSizeSelectLarge from 'svelte-icons/md/MdPhotoSizeSelectLarge.svelte'
  //@ts-ignore
  import SvelteTooltip from "svelte-tooltip";
  import IconButton from "../../shared/IconButton.svelte";
  import type {Settings} from "../../../storage/dto/settings";

  export let onClickCharacterAddButton:()=>void;
  export let onClickShortHeightModeButton:()=>void;
  export let onClickShowCharacterPreviewButton:()=>void;
  export let settings:Settings;
</script>

<div class="toolbar">
  <IconButton onClick={onClickCharacterAddButton} tooltip="캐릭터 추가"
              activated="">
    <MdPersonAdd/>
  </IconButton>
  <IconButton onClick={onClickShortHeightModeButton}
              tooltip="좁은높이 모드 - 한 화면에 더 많은 할일을 보고싶을때 사용해보세요."
              activated={settings.shortHeightMode}>
    <MdUnfoldLess/>
  </IconButton>
  <IconButton onClick={onClickShowCharacterPreviewButton}
              tooltip="캐릭터 사진 보기 - 한 화면에 더 많은 할일을 보고싶을때 사용해보세요."
              activated={settings.showCharacterPreview}>
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
