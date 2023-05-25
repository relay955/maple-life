import type {EquipmentInfo, Stat} from "../mapleStat";

const soulToStats:{regex:RegExp, stat:Stat}[] = [
    {"regex":/보스/, "stat":"보스 데미지"},
    {"regex":/데미지/, "stat":"데미지"},
    {"regex":/크리티컬 확률/, "stat":"크리티컬 확률"},
    {"regex":/방어율 무시/, "stat":"방어율 무시"},
    {"regex":/공격력.*%/, "stat":"공격력%"},
    {"regex":/마력.*%/, "stat":"마력%"},
    {"regex":/공격력/, "stat":"공격력"},
    {"regex":/마력/, "stat":"마력"},
    {"regex":/HP.*%/, "stat":"HP%"},
    {"regex":/MP.*%/, "stat":"MP%"},
    {"regex":/HP/, "stat":"HP"},
    {"regex":/MP/, "stat":"MP"},
    {"regex":/올스텟.*%/, "stat":"올스텟%"},
    {"regex":/STR/, "stat":"STR"},
    {"regex":/DEX/, "stat":"DEX"},
    {"regex":/INT/, "stat":"INT"},
    {"regex":/LUK/, "stat":"LUK"},
    {"regex":/올스텟/, "stat":"올스텟"},
]


export const soulParsingStrategy = (equipmentInfo:EquipmentInfo,name:string,option:string):void => {
    let lines = option.split("\n")
    equipmentInfo.soul = {
        name:lines[0].replace(" 적용",""),
        stats:{}
    }

    for (const soulToStat of soulToStats) {
        if(soulToStat.regex.test(lines[1])){
            equipmentInfo.soul!.stats[soulToStat.stat] = Number(lines[1].match(/\d+/)![0])
            break;
        }
    }
}
