import {HTMLElement as ParsedHtmlElement} from "node-html-parser";
import {defaultStatParsingStrategy} from "./equipmentParser/statParser";
import {potentialParsingStrategy} from "./equipmentParser/potentialParser";
import type {Equipment, EquipmentInfo} from "./mapleStat";
import {soulParsingStrategy} from "./equipmentParser/soulParser";
import {parseSingleArcaneSymbol} from "./equipmentParser/symbolParser";



export const parseItemsLinkKey = (equipmentPage:ParsedHtmlElement) => {
    let equipmentTags = equipmentPage.querySelectorAll(".tab01_con_wrap li > span > a")!

    return equipmentTags.map((equipmentTag) =>
        equipmentTag.getAttribute("href")!.split("?p=")[1]);
}
export const parseSymbolsLinkKey = (equipmentPage:ParsedHtmlElement) => {
    let equipmentTags = equipmentPage.querySelectorAll(".tab03_con_wrap li > span > a")!

    return equipmentTags.map((equipmentTag) =>
        equipmentTag.getAttribute("href")!.split("?p=")[1]);
}

export const parseSingleEquipment = (singleEquipmentPage:ParsedHtmlElement):EquipmentInfo => {
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



