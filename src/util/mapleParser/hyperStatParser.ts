import {HTMLElement as ParsedHtmlElement} from "node-html-parser";
import type {Stat, StatInfo} from "./mapleStat";

const hyperStatToStat:{regex:RegExp, stat:Stat}[] = [
    {"regex":/힘/, "stat":"STR"},
    {"regex":/민첩성/, "stat":"DEX"},
    {"regex":/지력/, "stat":"INT"},
    {"regex":/운/, "stat":"LUK"},
    {"regex":/최대 HP/, "stat":"HP%"},
    {"regex":/크리티컬 확률/, "stat":"크리티컬 확률"},
    {"regex":/크리티컬 데미지/, "stat":"크리티컬 데미지"},
    {"regex":/공격력/, "stat":"공격력"},
    {"regex":/보스/, "stat":"보스 데미지"},
    {"regex":/일반/, "stat":"일반 데미지"},
    {"regex":/데미지/, "stat":"데미지"},
    {"regex":/방어율/, "stat":"방어율 무시"},
    {"regex":/아케인/, "stat":"아케인 포스"},
    {"regex":/경험치/, "stat":"획득경험치"},
]
export const parseHyperStats = (basicInfoPage:ParsedHtmlElement):StatInfo => {
    const hyperStatsSpan = basicInfoPage.querySelector(
        ".tab01_con_wrap > table:nth-child(4) > tbody > tr:nth-child(11) > td > span"
    )!

    const text = hyperStatsSpan.structuredText.split("\n")
    let statInfo:StatInfo = {}

    text.forEach((abilityText) => {
        for (const item of hyperStatToStat) {
            if(item.regex.test(abilityText)){
                statInfo[item.stat] = Number(abilityText.match(/\d+/)![0])
                break;
            }
        }
    })
    return statInfo;
}
