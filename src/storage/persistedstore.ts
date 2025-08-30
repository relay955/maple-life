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
  volume:number,
}

export const timerSettings = persisted<TimerSettings>('timerSettings',{
  rects:[],
  alertTime:0,
  frameRate:15,
  randomDelay:false,
  unConfirmedAlert:false,
  volume:1,
});

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
