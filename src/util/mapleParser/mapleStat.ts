
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

export type Equipment = "반지"|"아케인 심볼"

export type PotentialGrade = "레어"| "에픽" | "유니크" | "레전드리"

export type StatInfo = {[key in Stat]?:number}

export type StatDetails = {[key in Stat]?:{[index:string]:number}}


export interface EquipmentInfo{
    name:string;
    imageUrl?:string;
    type:Equipment;
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

export interface SkillInfo{
    name:string;
    imageUrl?:string;
    skillLevel:string;
}

export interface CharacterSpec{
    ability:StatInfo;
    hyperStat:StatInfo;
    equipments:EquipmentInfo[];
    skills:SkillInfo[];
    tendency:StatInfo;
}
