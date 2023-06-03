import {HTMLElement as ParsedHtmlElement} from "node-html-parser";
import {defaultStatParsingStrategy} from "./equipmentParser/statParser";
import {potentialParsingStrategy} from "./equipmentParser/potentialParser";
import type {EquipmentType, EquipmentStat, EquipmentLinkKey} from "./mapleStat";
import {soulParsingStrategy} from "./equipmentParser/soulParser";
import {parseSingleArcaneSymbol} from "./equipmentParser/symbolParser";


const orderOfEquipmentType:EquipmentType[] = [
    "반지1","모자","엠블렘","반지2","펜던트1","얼굴장식","뱃지","반지3","펜던트2","눈장식",
    "귀고리","훈장","반지4","무기","상의","어깨장식","보조무기","포켓아이템","벨트","하의",
    "장갑","망토","신발","안드로이드","기계심장"
]

const orderOfSymbolType:EquipmentType[] = [
    "아케인심볼1", "아케인심볼2", "아케인심볼3", "아케인심볼4", "아케인심볼5", "아케인심볼6"
]

export const parseItemsLinkKey = (equipmentPage:ParsedHtmlElement):EquipmentLinkKey[] => {
    let equipmentTags = equipmentPage.querySelectorAll(".tab01_con_wrap li > span > a")!
    let equipmentLinkKeys:EquipmentLinkKey[] = []

    equipmentTags.forEach((equipmentTag,i) => {
        let link = equipmentTag.getAttribute("href")!
        if(link === "") return;
        equipmentLinkKeys.push({
            key:link.split("?p=")[1],
            type:orderOfEquipmentType[i]
        })
    })

    return equipmentLinkKeys;
}
export const parseSymbolsLinkKey = (equipmentPage:ParsedHtmlElement):EquipmentLinkKey[] => {
    let equipmentTags = equipmentPage.querySelectorAll(".tab03_con_wrap li > span > a")!
    let equipmentLinkKeys:EquipmentLinkKey[] = []

    equipmentTags.forEach((equipmentTag,i) => {
        let link = equipmentTag.getAttribute("href")!
        if(link === "") return;
        equipmentLinkKeys.push({
            key:link.split("?p=")[1],
            type:orderOfSymbolType[i]
        })
    });
    return equipmentLinkKeys;
}

export const parseSingleEquipment = (singleEquipmentPage:ParsedHtmlElement):EquipmentStat => {
    let nameTag = singleEquipmentPage.querySelector(".item_memo_title > h1")!
    let name = nameTag.innerHTML
        .replace(/<font .*>.*<\/font>/,"")
        .replace("<br>","")
        .replace("\r\n","")
        .replace(/<em>.*<\/em>/,"")
        .replace(/ +/," ")
        .replace("&nbsp;","")
        .trim()

    if(name.includes("아케인심볼"))
        return parseSingleArcaneSymbol(singleEquipmentPage)

    let equipmentInfo:EquipmentStat = {
        name:name,
        imageUrl: singleEquipmentPage.querySelector(".item_img > img")?.getAttribute("src"),
        type:singleEquipmentPage.querySelector(".ablilty02:nth-child(3) > span > em")!.textContent as EquipmentType,
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

const parseStatsInEquipment = (equipmentInfo:EquipmentStat, singleEquipmentPage:ParsedHtmlElement) => {
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

let statParsingStrategies:{keyword:string,strategy:(equipmentInfo:EquipmentStat, name:string, option:string)=>void}[] = [
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
        keyword:"올스탯",
        strategy:(equipmentInfo, name, option) => defaultStatParsingStrategy(equipmentInfo,"올스탯%",option)
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



