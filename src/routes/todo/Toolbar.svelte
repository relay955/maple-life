<script lang="ts">
  import MdPersonAdd from 'svelte-icons/md/MdPersonAdd.svelte'
  import MdUnfoldLess from 'svelte-icons/md/MdUnfoldLess.svelte'
  import MdPhotoSizeSelectLarge
    from 'svelte-icons/md/MdPhotoSizeSelectLarge.svelte'
  import MdGroupAdd from 'svelte-icons/md/MdGroupAdd.svelte'
  import MdDescription from 'svelte-icons/md/MdDescription.svelte'
  import MdFileDownload from 'svelte-icons/md/MdFileDownload.svelte'
  import MdFileUpload from 'svelte-icons/md/MdFileUpload.svelte'
  import {toast} from "@zerodevx/svelte-toast";
  import IconButton from "../../components/basicComponent/IconButton.svelte";
  import {
    lqShortHeightMode,
    lqShowCharacterPreview, lqShowMemo,
    updateShortHeightMode,
    updateShowCharacterPreview, updateShowMemo
  } from "../../storage/queries/systemQuery";
  import {exportDatabaseToJsonFile} from "../../storage/jsonExporter";
  import {importDatabaseFromJsonFile} from "../../storage/jsonImporter";

  export let onClickAccountAddButton:()=>void;
  export let onClickCharacterAddButton:()=>void;

  let importInput: HTMLInputElement | null = null;

  const onClickExportButton = async () => {
    try{
      await exportDatabaseToJsonFile();
      toast.push("파일을 저장했습니다.");
    }catch (error){
      toast.push(error instanceof Error ? error.message : "파일 저장에 실패했습니다.");
    }
  }

  const onClickImportButton = () => {
    importInput?.click();
  }

  const onChangeImportFile = async (event: Event) => {
    const target = event.currentTarget as HTMLInputElement | null;
    const file = target?.files?.[0];
    if (!file) return;

    try{
      await exportDatabaseToJsonFile("before-import");
      await importDatabaseFromJsonFile(file);
      toast.push("파일을 불러왔습니다. 기존 데이터는 백업 파일로 저장되었습니다.");
    }catch (error){
      toast.push(error instanceof Error ? error.message : "파일 불러오기에 실패했습니다.");
    }finally {
      if (target) target.value = "";
    }
  }
</script>

<input bind:this={importInput}
       type="file"
       accept="application/json,.json"
       style="display: none;"
       on:change={onChangeImportFile}/>

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
  <IconButton onClick={onClickExportButton}
              tooltip="현재 할일 목록을 파일로 저장합니다.">
    <MdFileDownload/>
  </IconButton>
  <IconButton onClick={onClickImportButton}
              tooltip="저장했던 파일에서 할일 목록을 다시 불러옵니다.">
    <MdFileUpload/>
  </IconButton>
</div>

<style>
  .toolbar{
    position: fixed;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: min(420px, calc(100vw - 20px));
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
