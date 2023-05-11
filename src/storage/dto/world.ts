import type {Character} from "./character";

export type World = "스카니아"|"베라"|"루나"|"제니스"|"크로아"|"유니온"|"엘리시움"|"이노시스"|"레드"|"오로라"|"아케인"|"노바"|"리부트"|"리부트2"|"이벤트"

export interface WorldInfo{
    color:string;
}

export const WorldList:{[index:string]:WorldInfo} = {
    "스카니아":{color:'lightblue'},
    "베라":{color:'orange'},
    "루나":{color:'#edd500'},
    "제니스":{color:'lightgray'},
    "크로아":{color:'lightgreen'},
    "유니온":{color:'purple'},
    "엘리시움":{color:'green'},
    "이노시스":{color:'gray'},
    "레드":{color:'#a23939'},
    "오로라":{color:'#DDFED1'},
    "아케인":{color:'blue'},
    "노바":{color:'#3f7fa7'},
    "리부트":{color:'#fdf7a8'},
    "리부트2":{color:'#c0b334'},
    "이벤트":{color:'red'},
}

export interface AccountWorld{
    id?:number;
    accountId:number;
    world:World;
    order:number;
    characters?:Character[];
}
