import {persisted} from "svelte-persisted-store";
import type {TimerRect} from "../logic/repeat-timer/timerRect";

interface SavedRect{
  resolutionWidth: number,
  resolutionHeight: number,
  rect:TimerRect
}
interface TimerSettings{
  rects:SavedRect[],
  alertTime:number, 
  frameRate:number,
  randomDelay:boolean,
  unConfirmedAlert:boolean,
  volume:number
}

export const timerSettings = persisted<TimerSettings>('timerSettings',{
  rects:[],
  alertTime:0,
  frameRate:15,
  randomDelay:true,
  unConfirmedAlert:true,
  volume:1
});

interface TimerSoundSettings{
  soundFileBlob: string | undefined,
  soundFileName: string | undefined
}``

export const timerSoundSettings = persisted<TimerSoundSettings>('timerSoundSettings',{
  soundFileBlob: undefined,
  soundFileName: undefined
})

/**
 * 주어진 `width`와 `height`에 해당하는 해상도를 갖는 저장된 사각형을 찾고,
 * 해당 사각형의 데이터를 업데이트하거나 새로운 사각형 데이터를 추가합니다.
 * 원본 savedRects가 변경됩니다.
 *
 * @param {SavedRect[]} savedRects 저장된 사각형 데이터를 담고 있는 배열
 * @param {number} width 해상도의 너비
 * @param {number} height 해상도의 높이
 * @param {TimerRect} rect 저장할 사각형 데이터 객체
 */
export const addSavedRect = (savedRects:SavedRect[],width:number,height:number,rect:TimerRect) =>{
  let foundSavedRect = false;
  for (let savedRect of savedRects) {
    if (width === savedRect.resolutionWidth && height === savedRect.resolutionHeight) {
      savedRect.rect = rect;
      foundSavedRect = true;
      break;
    }
  }

  if (!foundSavedRect) {
    savedRects.push({
      resolutionWidth: width,
      resolutionHeight: height,
      rect: rect
    })
  }
  return savedRects;
}

export const findSavedRect = (savedRects:SavedRect[],width:number,height:number) => {
  return savedRects.find(savedRect => width === savedRect.resolutionWidth && height === savedRect.resolutionHeight)
}

/**
 * 파일을 base64 문자열로 변환
 */
export const fileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = error => reject(error);
  });
};

/**
 * base64 문자열을 Blob URL로 변환
 */
export const base64ToObjectURL = (base64: string): string => {
  const byteCharacters = atob(base64.split(',')[1]);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'audio/*' });
  return URL.createObjectURL(blob);
};