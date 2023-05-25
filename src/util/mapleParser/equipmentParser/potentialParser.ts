import type {Stat, PotentialGrade, EquipmentInfo} from "../mapleStat";

const potentialOrSoulToStats:{regex:RegExp, stat:Stat}[] = [
    {"regex":/보스/, "stat":"보스 데미지"},
    {"regex":/데미지/, "stat":"데미지"},
    {"regex":/크리티컬 확률/, "stat":"크리티컬 확률"},
    {"regex":/크리티컬 데미지/, "stat":"크리티컬 데미지"},
    {"regex":/방어율 무시/, "stat":"방어율 무시"},
    {"regex":/공격력.*%/, "stat":"공격력%"},
    {"regex":/마력.*%/, "stat":"마력%"},
    {"regex":/공격력/, "stat":"공격력"},
    {"regex":/마력/, "stat":"마력"},
    {"regex":/HP.*%/, "stat":"HP%"},
    {"regex":/MP.*%/, "stat":"MP%"},
    {"regex":/HP/, "stat":"HP"},
    {"regex":/MP/, "stat":"MP"},
    {"regex":/STR.*%/, "stat":"STR%"},
    {"regex":/DEX.*%/, "stat":"DEX%"},
    {"regex":/INT.*%/, "stat":"INT%"},
    {"regex":/LUK.*%/, "stat":"LUK%"},
    {"regex":/올스탯.*%/, "stat":"올스탯%"},
    {"regex":/STR/, "stat":"STR"},
    {"regex":/DEX/, "stat":"DEX"},
    {"regex":/INT/, "stat":"INT"},
    {"regex":/LUK/, "stat":"LUK"},
    {"regex":/올스탯/, "stat":"올스탯"},
    {"regex":/이동속도/, "stat":"이동속도"},
    {"regex":/점프력/, "stat":"점프력"},
    {"regex":/재사용/, "stat":"재사용 대기시간 감소"},
    {"regex":/아이템 드롭률/, "stat":"아이템 드롭률"},
    {"regex":/메소 획득량/, "stat":"메소 획득량"},
]

export const potentialParsingStrategy = (equipmentInfo:EquipmentInfo,name:string,option:string,type:"potential"|"additionalPotential"):void => {
    if(option.includes("없습니다.")) return;
    equipmentInfo[type] = {
        grade:getPotentialGradeFromName(name),
        stats:{}
    }
    option.split("\n").forEach((line) => {
        for (const potentialToStat of potentialOrSoulToStats) {
            if(potentialToStat.regex.test(line)){
                if(equipmentInfo[type]!.stats[potentialToStat.stat] === undefined)
                    equipmentInfo[type]!.stats[potentialToStat.stat] = 0
                equipmentInfo[type]!.stats[potentialToStat.stat] += Number(line.match(/\d+/)![0])
                break;
            }
        }
    })
}

const getPotentialGradeFromName = (name:string):PotentialGrade => {
    if(name.includes("레전드리")){
        return "레전드리"
    }else if(name.includes("에픽")){
        return "에픽"
    }else if(name.includes("유니크")){
        return "유니크"
    }else if(name.includes("레어")){
        return "레어"
    }else{
        throw new Error("잘못된 잠재옵션 등급입니다.")
    }
}
