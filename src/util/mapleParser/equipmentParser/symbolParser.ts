import type {EquipmentInfo, Stat} from "../mapleStat";
import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

export const parseSingleArcaneSymbol = (singleEquipmentPage:ParsedHtmlElement):EquipmentInfo => {
    let nameTag = singleEquipmentPage.querySelector(".item_memo_title > h1")!
    let equipmentInfo:EquipmentInfo = {
        name:nameTag.structuredText,
        imageUrl: singleEquipmentPage.querySelector(".item_img > img")?.getAttribute("src"),
        type:"아케인 심볼",
        stats:{},
        bonusStats:{}
    }

    let statTag = singleEquipmentPage.querySelector(".stet_info > ul > li:nth-child(3)")!
    let statText = statTag.querySelector("span")!.text
    const optionText = statTag.querySelector(".point_td")!.structuredText
    let amount = Number(optionText.replace(/([+()])/g,"").split(/\s+/)[0])
    if(statText.includes("STR")){
        equipmentInfo.stats["고정STR"] = amount
        equipmentInfo.stats["아케인 포스"] = (amount-200)/10
    }else if(statText.includes("DEX")){
        equipmentInfo.stats["고정DEX"] = Number(amount)
        equipmentInfo.stats["아케인 포스"] = (amount-200)/10
    }else if(statText.includes("INT")){
        equipmentInfo.stats["고정INT"] = Number(amount)
        equipmentInfo.stats["아케인 포스"] = (amount-200)/10
    }else if(statText.includes("LUK")){
        equipmentInfo.stats["고정LUK"] = Number(amount)
        equipmentInfo.stats["아케인 포스"] = (amount-200)/10
    }
    //TODO 데몬어벤져,제논 추후 반영 필요
    return equipmentInfo;
}
