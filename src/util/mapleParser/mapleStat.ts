
type Stat = "HP" | "MP" | "HP%" | "MP%" | "APHP" | " APMP" |
    "공격력" | "공격력%" | "레벨당 공격력" |"마력" | "마력%" | "레벨당 마력" |
    "APSTR" | "APDEX" | "APINT" | "APLUK" |
    "STR" | "DEX" | "INT" | "LUK" | "올스텟" |
    "STR%" | "DEX%" |"INT%" |"LUK%" | "올스텟%" |
    "고정STR" | "고정DEX" |"고정INT" |"고정LUK" |
    "보스 데미지" | "일반 데미지" | "데미지" | "상태이상 추가데미지" | "최종 데미지" |
    "크리티컬 데미지" | "크리티컬 확률" | "아이템 드롭률" | "메소 획득량" |
    "방어율 무시" | "속성내성 무시" | "공격속도" | "재사용 대기시간 초기화" | "재사용 대기시간 감소" |
    "아케인 포스" | "획득경험치" | "버프지속시간" | "점프력" | "이동속도" |
    "패시브 스킬 레벨 증가"

type Equipment = "반지"

type PotentialGrade = "레어"| "에픽" | "유니크" | "레전드리"

interface StatInfo{
    statType:Stat;
    amount:number;
}

