// Tesseract 워커 초기화
import { createWorker, PSM } from "tesseract.js";
import type {RecognizeResult} from "tesseract.js";
import type {TimerRect} from "./timerRect";

let worker: Awaited<ReturnType<typeof createWorker>> | null = null;

export const getOrCreateWorker = async () => {
  if (!worker) worker = await createWorker("eng");
  worker.setParameters({
    tessedit_char_whitelist: "0123456789",
    classify_bln_numeric_mode: "1",
    tessedit_pageseg_mode:PSM.SINGLE_LINE,
  })
  return worker;
};

// 선택 영역을 실제 비디오 픽셀 좌표로 변환
const getVideoCropRectFromSelection = (sel: TimerRect, v: HTMLVideoElement) => {
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
  return {sx, sy, sw, sh};
};

export const recognizeNumber = async (videoEl:HTMLVideoElement,
                         cropCanvas:HTMLCanvasElement,cropCtx:CanvasRenderingContext2D,selectedArea:TimerRect) => {
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

  // 노란색만 검정, 나머지는 흰색으로 전처리 + 안티앨리어싱
  // 간단한 RGB 규칙 기반: R, G가 높고 B가 상대적으로 낮은 픽셀을 "노란색"으로 간주
  const img = cropCtx!.getImageData(0, 0, crop.sw, crop.sh);
  const d = img.data;

  // 1단계: 색상 분류
  for (let i = 0; i < d.length; i += 4) {
    const r = d[i];
    const g = d[i + 1];
    const b = d[i + 2];
    // 노란색 판정 조건(필요시 조정)
    // - R, G가 충분히 큼
    // - B는 상대적으로 작음
    // - R+G가 B의 2배보다 큼(채도 확보용)
    const isYellow = r > 150 && g > 150 && b < 140 &&
      (r + g) > 2 * b && Math.abs(r - g) < 80;

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

  if (!worker) return;
  const result: RecognizeResult = await worker.recognize(cropCanvas!);
  return result.data.text.trim();
}

