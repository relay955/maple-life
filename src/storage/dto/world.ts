export type World = "스카니아"|"베라"|"루나"|"제니스"|"크로아"|"유니온"|"엘리시움"|"이노시스"|"레드"|"오로라"|"아케인"|"노바"|"리부트"|"리부트2"|"이벤트"

export const WorldList = [
    "스카니아",
    "베라",
    "루나",
    "제니스",
    "크로아",
    "유니온",
    "엘리시움",
    "이노시스",
    "레드",
    "오로라",
    "아케인",
    "노바",
    "리부트",
    "리부트2",
    "이벤트"
]

export interface AccountWorld{
    id?:string;
    accountId:number;
    world:World;
    order:number;
}
