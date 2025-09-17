<script lang="ts">
  import Button from "../../components/basicComponent/Button.svelte";
  import PageContainer from "../../components/basicComponent/PageContainer.svelte";
  import Title from "../../components/basicComponent/Title.svelte";
  import DraggableOverlay from "./DraggableOverlay.svelte";
  import type {TimerRect} from "../../logic/repeat-timer/timerRect";
  import {
    addSavedRect,
    base64ToObjectURL,
    fileToBase64,
    findSavedRect,
    timerSettings,
    timerSoundSettings, timerUISettings
  } from "../../storage/persistedstore";
  import {getOrCreateWorker, recognizeNumber} from "../../logic/repeat-timer/ocr";
  import alertSound from "$lib/sounds/notification-alert-269289.mp3";
  import RangeSlider from 'svelte-range-slider-pips';
  import Space from "../../components/basicComponent/Space.svelte";
  import IconButton from "../../components/basicComponent/IconButton.svelte";
  import {openFloatingTimerPip, updateLeftSecond} from "../../logic/repeat-timer/timerPIP";
  import CaptureController from "./CaptureController.svelte";

  let videoEl: HTMLVideoElement | null = null;
  let currentStream: MediaStream | null = null;
  let selectedArea: TimerRect | null = null;
  
  const tickMs=100;

  let cropCanvas: HTMLCanvasElement | null = null;
  let cropCtx: CanvasRenderingContext2D | null = null;
  let ocrResult: string = "";
  let isOcrRunning = false;
  let ocrRecognizeLeftTick = 0;
  let alertStartTick = 0;
  let alertLeftTick = 0;
  let alertActived = false;
  let firstTimerDetected = false;
  let alertAudio: HTMLAudioElement | null = null;
  let unConfirmedAlertLeftTick = 0;
  let soundFile = "";
  let pipWindow:any|null = null;
  let lastTickTime = new Date();
  let pause=false;

  $: if (alertAudio) alertAudio.volume = $timerSettings.volume;

  // 컴포넌트 마운트 시 저장된 blob 데이터로부터 사운드 파일 복원
  $: if ($timerSoundSettings.soundFileBlob && !soundFile) {
    soundFile = base64ToObjectURL($timerSoundSettings.soundFileBlob);
  }

  const playSoundAlert = async () => {
    if (!alertAudio) return;
    try {
      await alertAudio.play();
    } catch (err:any) {
      onClickResetSoundFile();
      try {
        await alertAudio.play();
      } catch (err) {
        alert("알림음을 재생할 수 없습니다.");
      }
    }
  };

  //시스템 업데이트 루프, 1틱=0.1초
  window.setInterval(async () => {
    // 현재 시간과 마지막 틱 시간을 비교하여 스킵된 틱 계산
    const now = new Date();
    const elapsedMs = now.getTime() - lastTickTime.getTime();
    let skipedTick = Math.max(1, Math.round(elapsedMs / tickMs));
    lastTickTime = now;

    await detectOcr(skipedTick);
    await tickTimer(skipedTick);
  },tickMs);
  
  const detectOcr = async (skipedTick: number) => {
    if (!isOcrRunning || alertLeftTick > 0) return;
    if (!cropCtx || !cropCanvas || !videoEl || !selectedArea) return;
    ocrRecognizeLeftTick-=skipedTick;
    if (ocrRecognizeLeftTick > 0) return;
    ocrRecognizeLeftTick = 6;
    ocrResult = await recognizeNumber(videoEl, cropCanvas, cropCtx, selectedArea) ?? "식별불가";
    let ocrResultNumber = parseInt(ocrResult);
    if (ocrResultNumber >= 48 && ocrResultNumber <= 55) {
      alertLeftTick = (ocrResultNumber + $timerSettings.alertTime) * 10;
      alertStartTick = alertLeftTick;
      firstTimerDetected = true;
      alertActived = false;
      unConfirmedAlertLeftTick = 0;
      if ($timerSettings.randomDelay) alertLeftTick += Math.floor(Math.random() * 30);
    }
  }
  
  const tickTimer = async (skipedTick: number) => {
    if (!isOcrRunning) return;
    if (alertLeftTick > 0) {
      alertLeftTick-= skipedTick;
    }else if(!alertActived){
      playSoundAlert();
      alertActived = true;
      unConfirmedAlertLeftTick = 70;
    }
    //PIP 플로팅 타이머가 켜져있는경우 상태 업데이트
    if (pipWindow) updateLeftSecond(pipWindow, alertStartTick,alertLeftTick);
    //미확인 재알림
    if (alertActived && firstTimerDetected && $timerSettings.unConfirmedAlert && alertLeftTick <= 0) {
      unConfirmedAlertLeftTick-= skipedTick;
      if (unConfirmedAlertLeftTick <= 0) {
        unConfirmedAlertLeftTick = 70;
        await playSoundAlert();
      }
    }
  }
  
  const onChangeSoundFile = async (e: Event) => {
    const target = e.target as HTMLInputElement;
    if (!target.files || !target.files[0]) return;
    
    const file = target.files[0]
    if (file.size > 1024 * 1024) {
      alert('1MB 이하의 파일만 사용할 수 있습니다.');
      return;
    }


    try {
      // 파일을 base64로 변환하여 저장
      $timerSoundSettings.soundFileBlob = await fileToBase64(file);
      $timerSoundSettings.soundFileName = file.name;
      soundFile = URL.createObjectURL(file);
    } catch (error) {
      alert('파일을 처리하는 중 오류가 발생했습니다.');
    }
  }
  
  const onClickResetSoundFile = () => {
    // URL 객체 해제
    if (soundFile && soundFile !== alertSound) {
      URL.revokeObjectURL(soundFile);
    }
    soundFile = "";
    $timerSoundSettings.soundFileBlob = undefined;
    $timerSoundSettings.soundFileName = undefined;
  }

  const onClickStartScreenCapture = async () => {
    if (videoEl === null) return;
    try {
      // 기존 스트림이 있으면 정리
      if (currentStream) {
        currentStream.getTracks().forEach((t) => t.stop());
        currentStream = null;
      }

      currentStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          displaySurface: "window",
          frameRate: $timerSettings.frameRate,
        },
        audio: false
      });

      videoEl.srcObject = currentStream;
      // 자동재생 시도, 자동재생이 막히면 muted로 재시도
      await videoEl.play().catch(() => {
        videoEl!.muted = true;
        return videoEl?.play();
      });

      const [videoTrack] = currentStream.getVideoTracks();
      //예전에 저장된 영역이 있으면 그대로 적용
      const savedRect = findSavedRect($timerSettings.rects, videoEl.videoWidth, videoEl.videoHeight)
      if (savedRect) selectedArea = savedRect.rect;

      // 사용자가 브라우저 UI에서 "공유 중지"를 누를 수 있으므로 이벤트 처리
      if (videoTrack) {
        videoTrack.onended = () => {
          videoEl!.srcObject = null;
          currentStream = null;
        };
      }

      startOcr();
      
      //PIP 또는 플로팅 타이머 옵션이 활성화되어있다면 즉시 실행
      if ($timerUISettings.floatingOption === "PIP" && !document.pictureInPictureElement){
        await openPip();
      }else if ($timerUISettings.floatingOption === "floatingTimer" && !pipWindow){
        pipWindow = await openFloatingTimerPip(window)
      }
    } catch (err) {
      alert("화면 캡처 권한이 거부되었거나 지원되지 않습니다.");
    }
  }

  const onClickStopScreenCapture = async () => {
    if (videoEl === null) return;
    if (currentStream) {
      currentStream.getTracks().forEach((t) => t.stop());
      currentStream = null;
    }
    videoEl.srcObject = null;
    selectedArea = null;
    stopOcr();
  }

  const startOcr = async () => {
    await getOrCreateWorker();
    if (!cropCanvas) cropCanvas = document.createElement('canvas');
    if (!cropCtx) cropCtx = cropCanvas.getContext('2d');
    stopOcr();
    isOcrRunning = true;
  };
  
  const stopOcr = () => {
    isOcrRunning = false;
    ocrRecognizeLeftTick = 0;
    alertLeftTick = 0;
    unConfirmedAlertLeftTick = 0;
    alertActived = true;
    firstTimerDetected = false;
  }

  const onSelectArea = (rect: TimerRect) => {
    if (!videoEl) return;
    let resolutionWidth = videoEl.videoWidth;
    let resolutionHeight = videoEl.videoHeight;
    $timerSettings.rects = addSavedRect($timerSettings.rects, resolutionWidth, resolutionHeight, rect);
  }
  
  const onClickPip = async () => {
    if ($timerUISettings.floatingOption != "PIP"){
      await openPip()
    }else{
      $timerUISettings.floatingOption = "none";
    }
  }
  
  const openPip = async () => {
    if (!videoEl) return;
    if (!videoEl.requestPictureInPicture) {
      alert("PIP를 사용할 수 없습니다.");
      return;
    }
    try {
      await videoEl.requestPictureInPicture()
    }catch (e){
      alert("PIP를 사용할 수 없습니다. 먼저 캡처를 시작해 주세요.");
      return;
    }
    $timerUISettings.floatingOption = "PIP";
  }
  
  const onClickFloatingBar = async () => {
    if ($timerUISettings.floatingOption != "floatingTimer"){
      $timerUISettings.floatingOption = "floatingTimer";
      pipWindow = await openFloatingTimerPip(window)
    }else{
      $timerUISettings.floatingOption = "none";
    }
  }

</script>

<PageContainer>
  <Title text="파운틴 타이머"/>
  <div class="settings">
    <div>
    알림 시간(-60~60초)
    <input type="number" style="width: 50px;" bind:value={$timerSettings.alertTime} />
    초
    </div>
    <div>
    프레임속도
    <select bind:value={$timerSettings.frameRate} style="width: 70px;">
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={60}>60</option>
    </select>
   hz
    </div>
    <div>
    랜덤 지연
    <input type="checkbox" bind:checked={$timerSettings.randomDelay} />
    <div style="width: 10px;"/>
    </div>
    <div>
    미확인 재알림
    <input type="checkbox" bind:checked={$timerSettings.unConfirmedAlert} />
    <div style="width: 10px;"/>
    </div>
    {#if isOcrRunning}
      {#if selectedArea === null}
      <div style="color: red;">
        캡처 화면에서 에르다 파운틴의 퀵슬롯 부분을 드래그하세요.
      </div>
      {:else}
        <div>
          OCR 결과 : {ocrResult === "" ? "없음" : ocrResult ?? "없음"}
        </div>
        <div>
          타이머 : {alertLeftTick > 0 ? `${Math.floor(alertLeftTick / 10)}초` : "미탐지"}
        </div>
      {/if}
    {/if}
    <Space/>
    <IconButton tooltip="PIP" onClick={onClickPip} 
                activated={$timerUISettings.floatingOption === "PIP"}>
      <div class="pip-icon"></div>
    </IconButton>
    <IconButton tooltip="플로팅 타이머" onClick={onClickFloatingBar} 
                activated={$timerUISettings.floatingOption === "floatingTimer"}>
      <div class="floating-bar-icon"></div>
    </IconButton>
  </div>
  <div class="settings">
    <div>
      볼륨
      <RangeSlider bind:value={$timerSettings.volume} min={0} max={1} step={0.05} style="width: 150px;" />
    </div>
    <div>
      사운드 파일
      {#if soundFile === ""}
      <input type="file" accept="audio/*" on:change={onChangeSoundFile}
             style="width: 200px;" />
      {:else}
      <div style="display: flex; align-items: center; gap: 5px;">
        <span style="font-size: 12px; color: #666;">
          {$timerSoundSettings.soundFileName ?? "사용자 지정"}
        </span>
        <button on:click={onClickResetSoundFile}>초기화</button>
      </div>
      {/if}
    </div>
  </div>
  <CaptureController onClickStartScreenCapture={onClickStartScreenCapture}
                     onClickStopScreenCapture={onClickStopScreenCapture}
                     onClickPause={stopOcr}
                     onClickRestart={startOcr}
                     isCapturing={videoEl?.srcObject != null}
                     isOcrRunning={isOcrRunning}/>
  <div class="horizontal-center">
  <div class="display-area">
    <video class="display" bind:this={videoEl} autoplay muted></video>
    <DraggableOverlay bind:selectedArea={selectedArea} onSelection={onSelectArea}/>
  </div>
  </div>
  <CaptureController onClickStartScreenCapture={onClickStartScreenCapture}
                     onClickStopScreenCapture={onClickStopScreenCapture}
                     onClickPause={stopOcr}
                     onClickRestart={startOcr}
                     isCapturing={videoEl?.srcObject != null}
                     isOcrRunning={isOcrRunning}/>
  <audio 
    bind:this={alertAudio} 
    src={soundFile === "" ? alertSound : soundFile }  
    preload="auto"
    style="display: none;"
  ></audio>

  <div class="notice">
    <div class="title">도움말</div>
    <ul>
      <li>숫자 OCR 인식을 사용하여 에르다 파운틴 쿨다운이 감소한 경우 알림음으로 알려주는 도구입니다.</li>
      <li>사용 방법</li>
      <ol>
        <li>캡처 시작 버튼을 클릭하고 메이플스토리 화면 캡처를 시작합니다.</li>
        <li>퀵슬롯의 파운틴 영역을 드래그하세요.</li>
      </ol>
      <li>옵션</li>
      <ol>
        <li>랜덤 지연 : 알람 시간에 0~3초의 랜덤한 지연을 추가합니다</li>
        <li>프레임 속도 : 값을 높이면 출력 화면이 부드러워지지만 CPU를 더 많이 사용합니다. 화면 PIP를 사용하지 않고 알림만 사용하는 경우 10hz가 유리합니다. </li>
        <li>미확인 재알림 : 알람 시간이 지났는데도 파운틴을 설치하지 않은경우 6초마다 다시 알립니다.</li>
        <li>알림 시간 : 알림을 띄울 시간을 설정합니다. 0초로 설정한 경우 파운틴 쿨다운이 0초가 된 경우에 알림이 울립니다. 지연을 추가하려는 경우 음수를 입력하세요.</li>
      </ol>
      <li>추가 기능</li>
      <ol>
        <li>추가기능은 처음 한번만 선택하면 이후 캡처 시작시 자동으로 활성화됩니다.</li>
        <li>PIP : 메이플스토리 창을 조그만 화면으로 축소하여 표시할 수 있습니다.</li>
        <li>플로팅 타이머 : 작은 타이머 표시기를 항상 위에 표시할 수 있습니다. 다른 작업을 하는 중 타이머 남은시간을 확인하고 싶을때 유용합니다. </li>
      </ol>
      <li>참고</li>
      <ol>
        <li>OCR 영역 설정은 해상도별로 저장됩니다. 전체화면으로 플레이하다가 작은 화면 해상도로 변경한 경우 새로 캡처 시작을 하시면 저장된 해상도를 다시 불러옵니다.</li>
        <li>48~55초 사이의 값을 인식하면 알림 타이머가 시작됩니다. 에르다 파운틴 외의 쿨다운이 있는 대부분의 스킬에 사용할 수 있습니다.</li>
        <li>네트워크를 사용하지 않으며, 화면을 아무곳에도 전송하지 않고, 설정은 PC에 저장됩니다. 본 웹사이트는 오픈소스입니다.</li>
      </ol>
    </ul>
  </div>
</PageContainer>

<style lang="scss">
  .settings{
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 8px;
    &>div{
      display: flex;
      align-items: center;
      gap: 5px;
    }
  }
  .horizontal-center{
    display: flex;
    justify-content: center;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  .display-area{
    position: relative;
    .display{
      position: relative;
      height: 600px;
      width: auto;
      min-width: 800px;
      border: 1px solid #dddddd;
    }
  }
  .horizontal-center{
    display: flex;
    justify-content: center;
  }
  .notice{
    .title{
      font-weight: bold;
      margin-bottom: 5px;
      font-size: 16px;
    }
    font-size: 14px;
    color: #666;
    margin-top: 10px;
    margin-bottom: 10px;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 8px;
  }
  .pip-icon{
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M2 11V9h3.6L1.3 4.7l1.4-1.4L7 7.6V4h2v7zm2 9q-.825 0-1.412-.587T2 18v-5h2v5h8v2zm16-7V6h-9V4h9q.825 0 1.413.588T22 6v7zm-6 7v-5h8v5z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
    
  }
  .floating-bar-icon{
    display: inline-block;
    width: 24px;
    height: 24px;
    --svg: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24'%3E%3Cpath fill='%23000' d='M8.5 20q-3.125 0-5.312-2.187T1 12.5t2.188-5.312T8.5 5q1.3 0 2.45.413t2.1 1.137l.35-.35q.275-.275.687-.288t.713.288q.275.275.275.7t-.275.7l-.35.35q.725.95 1.138 2.113T16 12.5q0 3.125-2.187 5.313T8.5 20M7 4q-.425 0-.712-.288T6 3t.288-.712T7 2h3q.425 0 .713.288T11 3t-.288.713T10 4zm1.5 14q2.3 0 3.9-1.6t1.6-3.9t-1.6-3.9T8.5 7T4.6 8.6T3 12.5t1.6 3.9T8.5 18m0-4.5q.425 0 .713-.288T9.5 12.5v-3q0-.425-.288-.712T8.5 8.5t-.712.288T7.5 9.5v3q0 .425.288.713t.712.287m10-5.7l-.6.6q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l2.3-2.3q.3-.3.7-.3t.7.3L22.5 7q.275.3.275.713t-.3.687t-.712.288t-.688-.288l-.575-.575V19q0 .425-.287.713T19.5 20t-.712-.288T18.5 19z'/%3E%3C/svg%3E");
    background-color: currentColor;
    -webkit-mask-image: var(--svg);
    mask-image: var(--svg);
    -webkit-mask-repeat: no-repeat;
    mask-repeat: no-repeat;
    -webkit-mask-size: 100% 100%;
    mask-size: 100% 100%;
  }
  
</style>
