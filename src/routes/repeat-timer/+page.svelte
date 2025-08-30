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
    timerSoundSettings
  } from "../../storage/persistedstore";
  import {getOrCreateWorker, recognizeNumber} from "../../logic/repeat-timer/ocr";
  import alertSound from "$lib/sounds/notification-alert-269289.mp3";
  import RangeSlider from 'svelte-range-slider-pips';

  let videoEl: HTMLVideoElement | null = null;
  let currentStream: MediaStream | null = null;
  let selectedArea: TimerRect | null = null;

  let cropCanvas: HTMLCanvasElement | null = null;
  let cropCtx: CanvasRenderingContext2D | null = null;
  let ocrResult: string = "";
  let isOcrRunning = false;
  let ocrRecognizeLeftTick = 0;
  let alertLeftTick = 0;
  let alertActived = false;
  let firstTimerDetected = false;
  let alertAudio: HTMLAudioElement | null = null;
  let unConfirmedAlertLeftTick = 0;
  let soundFile = "";

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
    await detectOcr();
    await tickTimer();
  },100);
  
  const detectOcr = async () => {
    if (!isOcrRunning || alertLeftTick > 0) return;
    if (!cropCtx || !cropCanvas || !videoEl || !selectedArea) return;
    if (ocrRecognizeLeftTick > 0) {
      ocrRecognizeLeftTick--;
      return;
    }
    ocrRecognizeLeftTick = 5;
    ocrResult = await recognizeNumber(videoEl, cropCanvas, cropCtx, selectedArea) ?? "식별불가";
    let ocrResultNumber = parseInt(ocrResult);
    if (ocrResultNumber >= 48 && ocrResultNumber <= 55) {
      alertLeftTick = (ocrResultNumber + $timerSettings.alertTime) * 10;
      firstTimerDetected = true;
      alertActived = false;
      unConfirmedAlertLeftTick = 0;
      if ($timerSettings.randomDelay) alertLeftTick += Math.floor(Math.random() * 30);
    }
  }
  
  const tickTimer = async () => {
    if (!isOcrRunning) return;
    if (alertLeftTick > 0) {
      alertLeftTick--;
    }else if(!alertActived){
      playSoundAlert();
      alertActived = true;
      unConfirmedAlertLeftTick = 60;
    }
    //미확인 재알림
    if (alertActived && firstTimerDetected && $timerSettings.unConfirmedAlert && alertLeftTick <= 0) {
      if (unConfirmedAlertLeftTick > 0) {
        unConfirmedAlertLeftTick--;
      }else{
        unConfirmedAlertLeftTick = 60;
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
    } catch (err) {
      alert("화면 캡처 권한이 거부되었거나 지원되지 않습니다.");
    }
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
    alertActived = true;
    firstTimerDetected = false;
    unConfirmedAlertLeftTick = 0;
  }

  const onSelectArea = (rect: TimerRect) => {
    if (!videoEl) return;
    let resolutionWidth = videoEl.videoWidth;
    let resolutionHeight = videoEl.videoHeight;
    $timerSettings.rects = addSavedRect($timerSettings.rects, resolutionWidth, resolutionHeight, rect);
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
        녹화 화면에서 에르다 파운틴의 퀵슬롯 부분을 드래그하세요.
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
  <div class="horizontal-center">
  <div class="display-area">
    <video class="display" bind:this={videoEl} autoplay muted></video>
    <DraggableOverlay bind:selectedArea={selectedArea} onSelection={onSelectArea}/>
  </div>
  </div>
  <Button onClick={onClickStartScreenCapture}>녹화 시작</Button>
  
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
        <li>녹화 시작 버튼을 클릭하고 메이플스토리 화면 캡처를 시작합니다.</li>
        <li>퀵슬롯의 파운틴 영역을 드래그하세요.</li>
      </ol>
      <li>옵션</li>
      <ol>
        <li>랜덤 지연 : 알람 시간에 0~3초의 랜덤한 지연을 추가합니다</li>
        <li>프레임 속도 : 값을 높이면 출력 화면이 부드러워지지만 CPU를 더 많이 사용합니다. 화면 PIP를 사용하지 않고 알림만 사용하는 경우 10hz가 유리합니다. </li>
        <li>미확인 재알림 : 알람 시간이 지났는데도 파운틴을 설치하지 않은경우 6초마다 다시 알립니다.</li>
        <li>알림 시간 : 알림을 띄울 시간을 설정합니다. 0초로 설정한 경우 파운틴 쿨다운이 0초가 된 경우에 알림이 울립니다. 지연을 추가하려는 경우 음수를 입력하세요.</li>
      </ol>
      <li>참고</li>
      <ol>
        <li>OCR 영역 설정은 해상도별로 저장됩니다. 전체화면으로 플레이하다가 작은 화면 해상도로 변경한 경우 새로 녹화 시작을 하시면 저장된 해상도를 다시 불러옵니다.</li>
        <li>48~55초 사이의 값을 인식하면 알림 타이머가 시작됩니다. 에르다 파운틴 외의 쿨타임이 있는 대부분의 스킬을 사용할 수 있습니다.</li>
        <li>네트워크를 사용하지 않으며, 화면을 아무곳에도 전송하지 않고, 설정은 PC에 저장됩니다. 본 웹사이트는 오픈소스입니다.</li>
      </ol>
    </ul>
  </div>
  <div>
    <canvas bind:this={cropCanvas}/>
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
  
</style>
