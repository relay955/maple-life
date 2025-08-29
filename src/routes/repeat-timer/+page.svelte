<script lang="ts">
import Button from "../../components/basicComponent/Button.svelte";
import PageContainer from "../../components/basicComponent/PageContainer.svelte";
import Title from "../../components/basicComponent/Title.svelte";
import DraggableOverlay from "./DraggableOverlay.svelte";
import type {TimerRect} from "../../logic/repeat-timer/timerRect";
import {createWorker, RecognizeResult} from "tesseract.js";


let videoEl: HTMLVideoElement | null = null;
let currentStream: MediaStream | null = null;
let selectedArea: TimerRect | null = null;

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
        displaySurface: "monitor",
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

    // 사용자가 브라우저 UI에서 "공유 중지"를 누를 수 있으므로 이벤트 처리
    const [videoTrack] = currentStream.getVideoTracks();
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

let worker: Awaited<ReturnType<typeof createWorker>> | null = null;
let cropCanvas: HTMLCanvasElement | null = null;
let cropCtx: CanvasRenderingContext2D | null = null;
let ocrTimer: number | null = null;
let isOcrBusy = false;
let ocrResult: string = "";

// Tesseract 워커 초기화
const getOrCreateWorker = async () => {
  if (!worker) worker = await createWorker("eng");
  worker.setParameters({
    tessedit_char_whitelist: "0123456789"
  })
  return worker;
};

// 선택 영역을 실제 비디오 픽셀 좌표로 변환
function getVideoCropRectFromSelection(sel: TimerRect, v: HTMLVideoElement) {
  const vw = v.videoWidth;
  const vh = v.videoHeight;
  const cw = v.clientWidth;
  const ch = v.clientHeight;

  if (!vw || !vh || !cw || !ch) return null;

  // 비디오가 표시 크기로 스케일된 비율
  const scaleX = vw / cw;
  const scaleY = vh / ch;

  const sx = Math.max(0, Math.floor(sel.left * scaleX));
  const sy = Math.max(0, Math.floor(sel.top * scaleY));
  const sw = Math.min(vw - sx, Math.floor(sel.width * scaleX));
  const sh = Math.min(vh - sy, Math.floor(sel.height * scaleY));

  if (sw <= 0 || sh <= 0) return null;
  return { sx, sy, sw, sh };
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
  // 캔버스 준비(재사용)
  if (!cropCanvas) {
    cropCanvas = document.createElement('canvas');
    cropCtx = cropCanvas.getContext('2d');
  }
  if (!cropCtx || !videoEl) return;

  const tick = async () => {
    if (!videoEl || !selectedArea) return;

    const crop = getVideoCropRectFromSelection(selectedArea, videoEl);
    if (!crop) return;

    // 캔버스 크기를 선택 영역 크기에 맞춤
    if (cropCanvas!.width !== crop.sw || cropCanvas!.height !== crop.sh) {
      cropCanvas!.width = crop.sw;
      cropCanvas!.height = crop.sh;
    }

    // 현재 프레임에서 선택 영역만 캔버스에 복사
    cropCtx!.drawImage(
      videoEl,
      crop.sx, crop.sy, crop.sw, crop.sh,
      0, 0, crop.sw, crop.sh
    );

    // 노란색만 검정, 나머지는 흰색으로 전처리
    // 간단한 RGB 규칙 기반: R, G가 높고 B가 상대적으로 낮은 픽셀을 "노란색"으로 간주
    const img = cropCtx!.getImageData(0, 0, crop.sw, crop.sh);
    const d = img.data;
    for (let i = 0; i < d.length; i += 4) {
      const r = d[i];
      const g = d[i + 1];
      const b = d[i + 2];
      // 노란색 판정 조건(필요시 조정)
      // - R, G가 충분히 큼
      // - B는 상대적으로 작음
      // - R+G가 B의 2배보다 큼(채도 확보용)
      const isYellow =
        r > 180 &&
        g > 180 &&
        b < 140 &&
        (r + g) > 2 * b &&
        Math.abs(r - g) < 80; // R, G가 너무 벌어지지 않도록

      if (isYellow) {
        // 노란색 → 검정
        d[i] = 0;
        d[i + 1] = 0;
        d[i + 2] = 0;
        d[i + 3] = 255;
      } else {
        // 나머지 → 흰색
        d[i] = 255;
        d[i + 1] = 255;
        d[i + 2] = 255;
        d[i + 3] = 255;
      }
    }
    cropCtx!.putImageData(img, 0, 0);


    if (!(!isOcrBusy && worker)) return;
    // OCR은 비동기이므로 이전 작업과 겹치지 않게 보호
    isOcrBusy = true;
    try {
      // 필요 시 전처리(그레이스케일/리사이즈) 수행 가능
      const result: RecognizeResult = await worker.recognize(cropCanvas!);
      ocrResult = result.data.text.trim();
    } catch (e) {
      console.error('OCR error', e);
    } finally {
      isOcrBusy = false;
    }
  };

  // 기존 타이머 정리 후 시작
  stopOcrLoop();
  ocrTimer = window.setInterval(tick, intervalMs);
};


</script>

<PageContainer>
  <Title text="파운틴 타이머"/>
  <!--  설정 프리셋-->
  <div class="settings">
    알림 시간
    <input type="number" style="width: 50px;" />
    초
    OCR 결과 :
    {ocrResult ?? "없음"}
  </div>
  <div class="horizontal-center">
  <div class="display-area">
    <video class="display" bind:this={videoEl} autoplay muted></video>
    <DraggableOverlay bind:selectedArea={selectedArea}/>
  </div>
  </div>
  <Button onClick={onClickStartScreenCapture}>녹화 시작</Button>
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
  
</style>
