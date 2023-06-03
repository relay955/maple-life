import type {
    Stat,
    StatIndicators,
    Stats
} from "../util/mapleParser/mapleStat";
import {bowmaster} from "./Job/bowmaster";
import type {Skill} from "./Skill";

export interface Job {
    mainStat?:Stat;
    subStat?:Stat;
    atkType:"공격력"|"마력";
    calcDmg?:(statInfo:Stats, classes:Job)=>number;
    calcBonusStatGrade?:(statInfo:Stats, classes:Job)=>number;
    passiveStats?:Stats;
    activeStats?:Stats;
    unionStat?:Stats[]
    skills?:{[index:string]:Skill};
    vMatrixSkillType?:{[index:string]:"skill"|"enhance"};
    skillPriority?:string[];
    damagePeriod?:number;
}

export const jobDict:{[index:string]:Job} = {
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
    "보우마스터":bowmaster,
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
            // return ((statInfo["STR"] ?? 0) + (statInfo["DEX"] ?? 0) + (statInfo["LUK"] ?? 0))*4
            return 0
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
            // return (statInfo["APHP"] ?? 0) * 17.5 + ((statInfo["HP"] ?? 0) * 14) + (statInfo["STR"] ?? 0)
            return 0
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



export const defaultCalcDmgFomula = (statInfo:Stats, classes:Job):number => {
    let mainStatTotal = (statInfo[classes.mainStat!] ?? 0) + (statInfo["AP"+classes.mainStat!] ?? 0) + (statInfo["올스탯"] ?? 0)
    let subStatTotal = (statInfo[classes.subStat!] ?? 0) + (statInfo["AP"+classes.subStat!] ?? 0) + (statInfo["올스탯"] ?? 0)
    let mainStatPercentTotal = ((statInfo[classes.mainStat+"%"] ?? 0) + (statInfo["올스탯%"] ?? 0))/100
    let subStatPercentTotal = ((statInfo[classes.subStat+"%"] ?? 0) + (statInfo["올스탯%"] ?? 0))/100
    let mainStat = Math.floor(mainStatTotal * (1+mainStatPercentTotal) + (statInfo["고정"+classes.mainStat] ?? 0))
    let subStat = Math.floor(subStatTotal * (1+subStatPercentTotal) + (statInfo["고정"+classes.subStat] ?? 0))
    let atk = statInfo[classes.atkType]! * (1+(statInfo[classes.atkType+"%"] ?? 0)/100)
    return (mainStat * 4 + subStat) * atk * 0.01!

}

export const defaultCalcBonusStatGradeFomula = (statInfo:Stats, classes:Job) => {
    return (statInfo[classes.mainStat!] ?? 0) +
        (statInfo[classes.atkType!] ?? 0) * 4 +
        (statInfo["올스탯%"] ?? 0) * 10
}

