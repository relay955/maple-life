<script lang="ts">
  import Button from "../../components/basicComponent/Button.svelte";
  import PageContainer from "../../components/basicComponent/PageContainer.svelte";
  import Title from "../../components/basicComponent/Title.svelte";
  import DraggableOverlay from "./DraggableOverlay.svelte";
  import type {TimerRect} from "../../logic/repeat-timer/timerRect";
  import {addSavedRect, findSavedRect, timerSettings} from "../../storage/persistedstore";
  import {getOrCreateWorker, recognizeNumber} from "../../logic/repeat-timer/ocr";

  let videoEl: HTMLVideoElement | null = null;
  let currentStream: MediaStream | null = null;
  let selectedArea: TimerRect | null = null;

  let cropCanvas: HTMLCanvasElement | null = null;
  let cropCtx: CanvasRenderingContext2D | null = null;
  let ocrTimer: number | null = null;
  let ocrResult: string = "";

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
          frameRate: 15
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
      runOcrLoop(500);
    } catch (err) {
      alert("화면 캡처 권한이 거부되었거나 지원되지 않습니다.");
    }
  }

  const stopOcrLoop = () => {
    if (ocrTimer) {
      window.clearInterval(ocrTimer);
      ocrTimer = null;
    }
  };

  // 매 프레임(또는 일정 주기) 잘라 그리기 + OCR
  const runOcrLoop = async (intervalMs = 500) => {
    await getOrCreateWorker();
    if (!cropCanvas) cropCanvas = document.createElement('canvas');
    if (!cropCtx) cropCtx = cropCanvas.getContext('2d');

    // 기존 타이머 정리 후 시작
    stopOcrLoop();
    ocrTimer = window.setInterval(async () => {
      if (!cropCtx || !cropCanvas || !videoEl || !selectedArea) return;
      ocrResult = await recognizeNumber(videoEl,cropCanvas,cropCtx,selectedArea) ?? "식별불가";
    }, intervalMs);
  };

  const onSelectArea = (rect: TimerRect) => {
    if (!videoEl) return;
    let resolutionWidth = videoEl.videoWidth;
    let resolutionHeight = videoEl.videoHeight;
    $timerSettings.rects = addSavedRect($timerSettings.rects, resolutionWidth, resolutionHeight, rect);
  }


</script>

<PageContainer>
  <Title text="파운틴 타이머"/>
  <!--  설정 프리셋-->
  <div class="settings">
    알림 시간(-60~60초)
    <input type="number" style="width: 50px;" bind:value={$timerSettings.alertTime} />
    초
    <div style="width: 10px;"/>
    프레임속도
    <select bind:value={$timerSettings.frameRate} style="width: 70px;">
      <option value={10}>10</option>
      <option value={15}>15</option>
      <option value={20}>20</option>
      <option value={30}>30</option>
      <option value={60}>60</option>
    </select>
   hz
    <div style="width: 10px;"/>
    랜덤 지연
    <input type="checkbox" bind:checked={$timerSettings.randomDelay} />
    <div style="width: 10px;"/>
    미확인 재알림
    <input type="checkbox" bind:checked={$timerSettings.unConfirmedAlert} />
    <div style="width: 10px;"/>
    볼륨
    <input type="number" style="width: 50px;" bind:value={$timerSettings.volume} />
    
    
  </div>
  <div class="horizontal-center">
  <div class="display-area">
    <video class="display" bind:this={videoEl} autoplay muted></video>
    <DraggableOverlay bind:selectedArea={selectedArea} onSelection={onSelectArea}/>
  </div>
  </div>
  <Button onClick={onClickStartScreenCapture}>녹화 시작</Button>
  <div class="notice">
    <div class="title">도움말</div>
    <ul>
      <li>숫자 OCR 인식을 사용하여 에르다 파운틴 쿨타임이 감소한 경우 알림음으로 알려주는 도구입니다.</li>
      <li>사용 방법</li>
      <ol>
        <li>녹화 시작 버튼을 클릭하고 메이플스토리 화면 캡처를 시작합니다.</li>
        <li>퀵슬롯의 파운틴 영역을 드래그하세요.</li>
      </ol>
    <li>OCR 영역 설정은 해상도별로 저장됩니다. 전체화면으로 플레이하다가 작은 화면 해상도로 변경한 경우 새로 녹화 시작을 하시면 저장된 해상도를 다시 불러옵니다.
    </li>
    </ul>
  </div>
  <div>
    <canvas bind:this={cropCanvas}/>
    OCR 결과 :
    {ocrResult ?? "없음"}
  </div>
</PageContainer>

<style lang="scss">
  .settings{
    display: flex;
    gap: 5px;
    margin-bottom: 20px;
    align-items: center;
    background-color: #f1f1f1;
    border-radius: 5px;
    padding: 8px;
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
