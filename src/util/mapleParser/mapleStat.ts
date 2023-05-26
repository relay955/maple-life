
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

export interface StatInfo{
    HP?:number;
    MP?:number;
    "HP%"?:number;
    "MP%"?:number;
    "고정HP"?:number;
    "고정MP"?:number;
    APHP?:number;
    APMP?:number;
    "공격력"?:number;
    "공격력%"?:number;
    "레벨당 공격력"?:number;
    "마력"?:number;
    "마력%"?:number;
    "레벨당 마력"?:number;
    APSTR?:number;
    APDEX?:number;
    APINT?:number;
    APLUK?:number;
    STR?:number;
    DEX?:number;
    INT?:number;
    LUK?:number;
    "올스탯"?:number;
    "STR%"?:number;
    "DEX%"?:number;
    "INT%"?:number;
    "LUK%"?:number;
    "올스탯%"?:number;
    "고정STR"?:number;
    "고정DEX"?:number;
    "고정INT"?:number;
    "고정LUK"?:number;
    "보스 데미지"?:number;
    "일반 데미지"?:number;
    "데미지"?:number;
    "상태이상 추가데미지"?:number;
    "최종 데미지"?:number;
    "크리티컬 데미지"?:number;
    "크리티컬 확률"?:number;
    "아이템 드롭률"?:number;
    "메소 획득량"?:number;
    "방어율 무시"?:number;
    "속성내성 무시"?:number;
    "공격속도"?:number;
    "재사용 대기시간 초기화"?:number;
    "재사용 대기시간 감소"?:number;
    "재사용 대기시간 감소%"?:number;
    "아케인 포스"?:number;
    "획득경험치"?:number;
    "버프지속시간"?:number;
    "점프력"?:number;
    "이동속도"?:number;
    "패시브 스킬 레벨 증가"?:number;
    "무기 상수"?:number;
    "숙련도"?:number;
    "소환수 지속시간"?:number;
}


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
}
