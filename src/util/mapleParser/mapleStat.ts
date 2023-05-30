import type {BuffName} from "../../infoDictionary/BuffDict";
import type {LinkSkillName} from "../../infoDictionary/LinkSkillDict";

export type Stat = "HP" | "MP" | "HP%" | "MP%" | "APHP" | " APMP" | "고정HP" |"고정MP" |
    "공격력" | "공격력%" | "레벨당 공격력" |"마력" | "마력%" | "레벨당 마력" |
    "APSTR" | "APDEX" | "APINT" | "APLUK" |
    "STR" | "DEX" | "INT" | "LUK" | "올스탯" |
    "STR%" | "DEX%" |"INT%" |"LUK%" | "올스탯%" |
    "고정STR" | "고정DEX" |"고정INT" |"고정LUK" |
    "보스 데미지" | "일반 데미지" | "데미지" | "상태이상 추가데미지" | "최종 데미지" |
    "크리티컬 데미지" | "크리티컬 확률" | "아이템 드롭률" | "메소 획득량" |
    "방어율 무시" | "속성내성 무시" | "공격속도" | "재사용 대기시간 초기화" | "재사용 대기시간 감소" | "재사용 대기시간 감소%" |
    "아케인 포스" | "획득경험치" | "버프지속시간" | "점프력" | "이동속도" |
    "패시브 스킬 레벨 증가" | "무기 상수" | "숙련도" | "소환수 지속시간"

export type EquipmentType = "반지1"|"반지2"|"반지3"|"반지4"|"펜던트1"|"펜던트2"|
    "얼굴장식"|"눈장식"|"귀고리"|"벨트"|"포켓아이템"|"뱃지"|"안드로이드"|"기계심장"|
    "망토"|"어깨장식"|"모자"|"상의"|"하의"|"신발"|"장갑"|
    "무기"|"보조무기"|"엠블렘"|"훈장"|
    "아케인심볼1"|"아케인심볼2"|"아케인심볼3"|"아케인심볼4"|"아케인심볼5"|"아케인심볼6"|
    "어센틱심볼1"|"어센틱심볼2"|"어센틱심볼3"

export type PotentialGrade = "레어"| "에픽" | "유니크" | "레전드리"

export type StatInfo = {[key in Stat]?:number}

export interface StatDetails{
    statList:{[key in Stat]?:{[index:string]:number}};
    sets:{[index:string]:number};
    starforce:number;
}

export interface EquipmentLinkKey{
    type:EquipmentType;
    key:string;
}

export interface EquipmentInfo{
    name:string;
    imageUrl?:string;
    type:EquipmentType;
    stats:StatInfo;
    bonusStats:StatInfo;
    potential?:{
        grade:PotentialGrade;
        stats:StatInfo;
    }
    additionalPotential?:{
        grade:PotentialGrade;
        stats:StatInfo;
    }
    soul?:{
        name:string;
        stats:StatInfo;
    }
    starForce?:number;
    skillLevel?:number;
}

export type EquipmentList = {[key in EquipmentType]?:EquipmentInfo;}

export interface SkillInfo{
    name:string;
    imageUrl?:string;
    skillLevel:string;
}
export interface CharacterSpec{
    ability:StatInfo;
    hyperStat:StatInfo;
    equipments:EquipmentList;
    skills:SkillInfo[];
    tendency:StatInfo;
    linkSkill:{[key in LinkSkillName]?:number};
    buff:{[key in BuffName]?:boolean};
}
