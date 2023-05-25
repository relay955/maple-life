import type {EquipmentInfo, Stat} from "../mapleStat";

export const defaultStatParsingStrategy = (equipmentInfo:EquipmentInfo,statType:Stat,option:string):void => {
    let amountList = option.replace(/([+()])/g,"").split(/\s+/)
    equipmentInfo.stats[statType] = Number(amountList[0].replace("%",""))
    if(amountList.length >= 3){
        let bonusStatAmount = Number(amountList[2].replace("%",""));
        if(bonusStatAmount > 0) equipmentInfo.bonusStats[statType] = bonusStatAmount

    }
}
