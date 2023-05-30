import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";

export interface Classes{
    mainStat?:Stat;
    subStat?:Stat;
    atkType:"공격력"|"마력";
    calcDmg?:(statInfo:StatInfo,classes:Classes)=>number;
    calcBonusStatGrade?:(statInfo:StatInfo,classes:Classes)=>number;
    passiveStats?:StatInfo;
    activeStats?:StatInfo;
    unionStat?:StatInfo[]
    matrixSkill?:{[index:string]:{
        damageRate:number;
        maxLevel:number;
    }}
}

export const classesDict:{[index:string]:Classes} = {
    "히어로":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100},]
    },
    "팔라딘":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100},]
    },
    "다크나이트":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"HP%":2}, {"HP%":3}, {"HP%":4}, {"HP%":5}, {"HP%":6},]
    },
    "아크메이지(불,독)":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"MP%":2}, {"MP%":3}, {"MP%":4}, {"MP%":5}, {"MP%":6}]
    },
    "아크메이지(썬,콜)":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "비숍":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "보우마스터":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        passiveStats:{
            "무기 상수":1.3,
            "공격속도":3,
            "숙련도":0.85,
            "DEX":130,
            "STR":30,
            "공격력":150,
            "공격력%":25,
            "최종 데미지":37.8,
            "방어율 무시":55,
            "크리티컬 확률":69,
            "크리티컬 데미지":31,
            "이동속도":130,
            "점프력":100,
        },
        activeStats: {
            "공격력": 50,
            "공격력%": 20,
            "데미지": 75,
            "보스 데미지": 20,
        },
        matrixSkill:{
            "폭풍의 시 강화":{damageRate:0.2634, maxLevel:60},
            "퀴버 카트리지 강화":{damageRate:0.0904, maxLevel:60},
            "애로우 플래터/플레시 미라주 강화":{damageRate:0.15, maxLevel:60},
            "파이널 어택 : 활 강화":{damageRate:0.06, maxLevel:60},
            "피닉스 강화":{damageRate:0.015, maxLevel:60},
            "애로우 레인":{damageRate:0.15, maxLevel:30,},
            "퀴버 풀버스트":{damageRate:0.12, maxLevel:30},
            "잔영의 시":{damageRate:0.08, maxLevel:30},
            "이볼브":{damageRate:0.06, maxLevel:30},
            "실루엣 미라주":{damageRate:0.04, maxLevel:30},
            "가이디드 애로우":{damageRate:0.038, maxLevel:30},
        },
        unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}]
    },
    "신궁":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"크리티컬 확률":1}, {"크리티컬 확률":2}, {"크리티컬 확률":3}, {"크리티컬 확률":4}, {"크리티컬 확률":5}]
    },
    "패스파인더":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}]
    },
    "나이트로드":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"크리티컬 확률":1}, {"크리티컬 확률":2}, {"크리티컬 확률":3}, {"크리티컬 확률":4}, {"크리티컬 확률":5}]
    },
    "섀도어":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "듀얼블레이더":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "바이퍼":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100},]
    },
    "캡틴":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"소환수 지속시간":4}, {"소환수 지속시간":6}, {"소환수 지속시간":8}, {"소환수 지속시간":10}, {"소환수 지속시간":12}],
    },
    "캐논슈터":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100},]
    },
    "소울마스터":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정HP":250}, {"고정HP":500}, {"고정HP":1000}, {"고정HP":2000}, {"고정HP":2500}],
    },
    "플레임위자드":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "윈드브레이커":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}]
    },
    "나이트워커":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "스트라이커":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100}]
    },
    "미하일":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정HP":250}, {"고정HP":500}, {"고정HP":1000}, {"고정HP":2000}, {"고정HP":2500}],
    },
    "블래스터":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"방어율 무시":1}, {"방어율 무시":2}, {"방어율 무시":3}, {"방어율 무시":5}, {"방어율 무시":6}]
    },
    "배틀메이지":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"공격력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "와일드헌터":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"데미지":0.8}, {"데미지":1.6}, {"데미지":2.4}, {"데미지":3.2}, {"데미지":4}]
    },
    "메카닉":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"버프지속시간":5}, {"버프지속시간":10}, {"버프지속시간":15}, {"버프지속시간":20}, {"버프지속시간":25}]
    },
    "제논":{
        atkType:"공격력",
        calcDmg:(statInfo,classes)=>{
            return ((statInfo["STR"] ?? 0) + (statInfo["DEX"] ?? 0) + (statInfo["LUK"] ?? 0))*4
        },
        unionStat:[
            {"고정STR":5, "고정DEX":5, "고정LUK":5},
            {"고정STR":10, "고정DEX":10, "고정LUK":10},
            {"고정STR":20, "고정DEX":20, "고정LUK":20},
            {"고정STR":40, "고정DEX":40, "고정LUK":40},
            {"고정STR":50, "고정DEX":50, "고정LUK":50},
        ]
    },
    "데몬슬레이어":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
    },
    "데몬어벤져":{
        mainStat:"HP",
        subStat:"STR",
        atkType:"공격력",
        calcDmg:(statInfo,classes)=>{
            return (statInfo["APHP"] ?? 0) * 17.5 + ((statInfo["HP"] ?? 0) * 14) + (statInfo["STR"] ?? 0)
        },
        unionStat:[{"보스 데미지":1}, {"보스 데미지":2}, {"보스 데미지":3}, {"보스 데미지":5}, {"보스 데미지":6}]
    },
    "아란":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
    },
    "에반":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
    },
    "루미너스":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "메르세데스":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"재사용 대기시간 감소%":2}, {"재사용 대기시간 감소%":3},
            {"재사용 대기시간 감소%":4}, {"재사용 대기시간 감소%":5},
            {"재사용 대기시간 감소%":6}]
    },
    "팬텀":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"메소 획득량":1}, {"메소 획득량":2}, {"메소 획득량":3}, {"메소 획득량":4}, {"메소 획득량":5}]
    },
    "은월":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"크리티컬 데미지":1}, {"크리티컬 데미지":2}, {"크리티컬 데미지":3},
            {"크리티컬 데미지":5}, {"크리티컬 데미지":6}]
    },
    "카이저":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100}]
    },
    "카인":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}]
    },
    "카데나":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "엔젤릭버스터":{
        mainStat:"DEX",
        subStat:"STR",
        atkType:"공격력",
        unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}]
    },
    "아델":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100}]
    },
    "일리움":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "아크":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정STR":10}, {"고정STR":20}, {"고정STR":40}, {"고정STR":80}, {"고정STR":100}]
    },
    "칼리":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "라라":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    },
    "호영":{
        mainStat:"LUK",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"고정LUK":10}, {"고정LUK":20}, {"고정LUK":40}, {"고정LUK":80}, {"고정LUK":100}]
    },
    "제로":{
        mainStat:"STR",
        subStat:"DEX",
        atkType:"공격력",
        unionStat:[{"획득경험치":4}, {"획득경험치":6}, {"획득경험치":8}, {"획득경험치":10}, {"획득경험치":12}]
    },
    "키네시스":{
        mainStat:"INT",
        subStat:"LUK",
        atkType:"마력",
        unionStat:[{"고정INT":10}, {"고정INT":20}, {"고정INT":40}, {"고정INT":80}, {"고정INT":100}]
    }
}

export const defaultCalcDmgFomula = (statInfo:StatInfo,classes:Classes) => {
    let mainStatTotal = statInfo[classes.mainStat!]! + statInfo["AP"+classes.mainStat!]! + statInfo["올스탯"]!
    let subStatTotal = statInfo[classes.subStat!]! + statInfo["AP"+classes.subStat!]! + statInfo["올스탯"]!
    let mainStatPercentTotal = (statInfo[classes.mainStat+"%"] + statInfo["올스탯%"])/100
    let subStatPercentTotal = (statInfo[classes.subStat+"%"] + statInfo["올스탯%"])/100
    let mainStat = mainStatTotal * (1+mainStatPercentTotal)
    let subStat = subStatTotal * (1+subStatPercentTotal)
    return ((mainStat * 4) + subStat) * statInfo[classes.atkType]! * 0.01!
}

export const defaultCalcBonusStatGradeFomula = (statInfo:StatInfo,classes:Classes) => {
    return (statInfo[classes.mainStat!] ?? 0) +
        (statInfo[classes.atkType!] ?? 0) * 4 +
        (statInfo["올스탯%"] ?? 0) * 10
}
