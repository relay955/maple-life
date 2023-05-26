import {HTMLElement as ParsedHtmlElement} from "node-html-parser";
import type {Stat, StatInfo} from "./mapleStat";

const tendencyToStat:{regex:RegExp, stat:Stat}[] = [
    {"regex":/방어율 무시/, "stat":"방어율 무시"},
    {"regex":/속성내성무시/, "stat":"속성내성 무시"},
    {"regex":/버프/, "stat":"버프지속시간"},
    {"regex":/HP/, "stat":"HP"},
    {"regex":/MP/, "stat":"MP"},
]

/**
 * 기본정보 페이지에 있는 성향의 스텟 정보를 얻습니다.
 * 사실상 쓸모가 없는 일부 성향 스텟은 아예 표시되지 않습니다.
 */
export const parseTendency = (basicInfoPage:ParsedHtmlElement):StatInfo => {
    const abilityStatTagList = basicInfoPage.querySelectorAll(".dispo_list .total_effect_wrap li")!
    console.log(abilityStatTagList)
    let statInfo:StatInfo = {}

    abilityStatTagList.forEach((abilityStatTag) => {
        let text = abilityStatTag.structuredText;
        for (const item of tendencyToStat) {
            if(item.regex.test(text)){
                statInfo[item.stat] = Number(text.match(/[\d.]+/)![0])
                break;
            }
        }
    })

    return statInfo;
}
