import type {
    EquipmentInfo,
    SkillInfo,
    StatInfo
} from "../../util/mapleParser/mapleStat";

export interface Character {
    id?:number;
    accountId:number;
    worldId:number;
    name: string;
    level: number;
    imgUrl: string;
    classType:string;
    order:number;//할일 페이지에서의 월드별 캐릭터 순서
    orderInCharacterPage:number;//캐릭터 페이지에서의 캐릭터 순서
    useTodo:boolean;
    detailInfoKey?:string;
    ability?:StatInfo;
    hyperStat?:StatInfo;
    equipments?:EquipmentInfo[];
    skills?:SkillInfo[];
}
