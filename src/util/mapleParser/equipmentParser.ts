import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

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
export const parseItemsLinkKey = (equipmentPage:ParsedHtmlElement) => {
    let equipmentTags = equipmentPage.querySelectorAll(".tab01_con_wrap li > span > a")!

    return equipmentTags.map((equipmentTag) =>
        equipmentTag.getAttribute("href")!.split("?p=")[1]);
}

export const parseSingleEquipment = (singleEquipmentPage:ParsedHtmlElement):EquipmentInfo => {
    // console.log(singleEquipmentPage)


    let nameTag = singleEquipmentPage.querySelector(".item_memo_title > h1")!
    let name = nameTag.innerHTML
        .replace(/<font .*>.*<\/font>/,"")
        .replace("<br>","")
        .replace("\r\n","")
        .replace(/<em>.*<\/em>/,"")
        .replace(/ +/," ")
        .replace("&nbsp;","")
        .trim()


    let equipmentInfo:EquipmentInfo = {
        name:name,
        imageUrl: singleEquipmentPage.querySelector(".item_img > img")?.getAttribute("src"),
        type:singleEquipmentPage.querySelector(".ablilty02:nth-child(3) > span > em")!.textContent as Equipment,
        stats:{},
        bonusStats:{}
    }

    parseStatsInEquipment(equipmentInfo,singleEquipmentPage);

    //starforce
    let starforceTag = nameTag.querySelector("em")
    if(starforceTag !== null){
        equipmentInfo.starForce = Number(starforceTag.text.match(/\d+/)![0])
    }
    return equipmentInfo;
}



const parseStatsInEquipment = (equipmentInfo:EquipmentInfo,singleEquipmentPage:ParsedHtmlElement) => {
    let statsTag = singleEquipmentPage.querySelectorAll(".stet_info > ul > li")
    let parsedStatsTag = statsTag.map((statTag) => {
        return {
            name: statTag.querySelector(".stet_th")!.text,
            option: statTag.querySelector(".point_td")!.structuredText
        }
    })
    parsedStatsTag.forEach((parsedStatTag) => {
        for (const statParsingStrategy of statParsingStrategies) {
            if(parsedStatTag.name.includes(statParsingStrategy.keyword)){
                statParsingStrategy.strategy(equipmentInfo,parsedStatTag.name,parsedStatTag.option)
                break;
            }
        }
    })
}



let statParsingStrategies:{keyword:string,strategy:(equipmentInfo:EquipmentInfo,name:string,option:string)=>void}[] = [
    {
        keyword:"공격속도",
        strategy:(equipmentInfo, name, option) => {
            equipmentInfo.stats["공격속도"] = Number(option.match(/\d+/)![0])
        }
    },
    {
        keyword:"STR",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"STR",option)
    },
    {
        keyword:"DEX",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"DEX",option)
    },
    {
        keyword:"INT",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"INT",option)
    },
    {
        keyword:"LUK",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"LUK",option)
    },
    {
        keyword:"MaxHP",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,option.includes("%") ? "HP%" : "HP",option)
    },
    {
        keyword:"MaxMP",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,option.includes("%") ? "MP%" : "MP",option)
    },
    {
        keyword:"공격력",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"공격력",option)
    },
    {
        keyword:"마력",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"마력",option)
    },
    {
        keyword:"보스",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"보스 데미지",option)
    },
    {
        keyword:"방어력 무시",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"방어율 무시",option)
    },
    {
        keyword:"데미지",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"데미지",option)
    },
    {
        keyword:"올스텟",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"올스텟%",option)
    },
    {
        keyword:"잠재옵션",
        strategy:(equipmentInfo, name, option) => potentialParsingStrategy(equipmentInfo,name,option,"potential")
    },
    {
        keyword:"에디셔널 잠재옵션",
        strategy:(equipmentInfo, name, option) => potentialParsingStrategy(equipmentInfo,name,option,"additionalPotential")
    },
    {
        keyword:"소울옵션",
        strategy:(equipmentInfo, name, option) => soulParsingStrategy(equipmentInfo,name,option)
    },
    {
        keyword:"기타",
        strategy:(equipmentInfo, name, option) => {
            if(!/링 \d레벨/.test(option)) return;
            equipmentInfo.skillLevel = Number(option.match(/\d+/)![0])
        }
    }
]

const defaultStatParsingStrategy = (equipmentInfo:EquipmentInfo,statType:Stat,option:string):void => {
    let amountList = option.replace(/([+()])/g,"").split(/\s+/)
    equipmentInfo.stats[statType] = Number(amountList[0].replace("%",""))
    if(amountList.length >= 3){
        let bonusStatAmount = Number(amountList[2].replace("%",""));
        if(bonusStatAmount > 0) equipmentInfo.bonusStats[statType] = bonusStatAmount

    }
}

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
    {"regex":/올스텟.*%/, "stat":"올스텟%"},
    {"regex":/STR/, "stat":"STR"},
    {"regex":/DEX/, "stat":"DEX"},
    {"regex":/INT/, "stat":"INT"},
    {"regex":/LUK/, "stat":"LUK"},
    {"regex":/올스텟/, "stat":"올스텟"},
    {"regex":/이동속도/, "stat":"이동속도"},
    {"regex":/점프력/, "stat":"점프력"},
    {"regex":/재사용/, "stat":"재사용 대기시간 감소"},
    {"regex":/아이템 드롭률/, "stat":"아이템 드롭률"},
    {"regex":/메소 획득량/, "stat":"메소 획득량"},
]
const potentialParsingStrategy = (equipmentInfo:EquipmentInfo,name:string,option:string,type:"potential"|"additionalPotential"):void => {
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

const soulParsingStrategy = (equipmentInfo:EquipmentInfo,name:string,option:string):void => {
    let lines = option.split("\n")
    equipmentInfo.soul = {
        name:lines[0].replace(" 적용",""),
        stats:{}
    }

    for (const potentialToStat of potentialOrSoulToStats) {
        if(potentialToStat.regex.test(lines[1])){
            equipmentInfo.soul!.stats[potentialToStat.stat] = Number(lines[1].match(/\d+/)![0])
            break;
        }
    }
}
