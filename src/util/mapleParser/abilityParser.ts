import {HTMLElement as ParsedHtmlElement} from "node-html-parser";
import type {Stat, Stats} from "./mapleStat";

const abilityToStat:{regex:RegExp, stat:Stat}[] = [
    {"regex":/보스/, "stat":"보스 데미지"},
    {"regex":/일반/, "stat":"일반 데미지"},
    {"regex":/패시브/, "stat":"패시브 스킬 레벨 증가"},
    {"regex":/레벨마다 공격력/, "stat":"레벨당 공격력"},
    {"regex":/레벨마다 마력/, "stat":"레벨당 마력"},
    {"regex":/공격력/, "stat":"공격력"},
    {"regex":/마력/, "stat":"마력"},
    {"regex":/재사용/, "stat":"재사용 대기시간 초기화"},
    {"regex":/STR/, "stat":"STR"},
    {"regex":/DEX/, "stat":"DEX"},
    {"regex":/INT/, "stat":"INT"},
    {"regex":/LUK/, "stat":"LUK"},
    {"regex":/버프/, "stat":"버프지속시간"},
    {"regex":/모든 능력치/, "stat":"올스탯"},
    {"regex":/최대 HP (\d+)%/, "stat":"HP%"},
    {"regex":/최대 HP/, "stat":"HP"},
    {"regex":/최대 MP (\d+)%/, "stat":"MP%"},
    {"regex":/최대 MP/, "stat":"MP"},
    {"regex":/점프력/, "stat":"점프력"},
    {"regex":/이동속도/, "stat":"이동속도"},
    {"regex":/아이템 드롭률/, "stat":"아이템 드롭률"},
    {"regex":/메소 획득량/, "stat":"메소 획득량"},
    {"regex":/크리티컬 확률/, "stat":"크리티컬 확률"},
    {"regex":/공격속도/, "stat":"공격속도"},
]

/**
 * 기본정보 페이지에 있는 어빌리티 정보를 얻습니다.
 * 사실상 쓸모가 없는 일부 어빌리티는 아예 표시되지 않으며, 레벨당 공/마 증가량은 파라미터로 받은 레벨에 기초해 실제 증가량을 계산합니다.
 */
export const parseAbility = (basicInfoPage:ParsedHtmlElement):Stats => {
    const abilitySpan = basicInfoPage.querySelector(
".tab01_con_wrap > table:nth-child(4) > tbody > tr:nth-child(10) > td > span"
    )!

    const abilitiesText = abilitySpan.structuredText.split(/[\n,]/)
    let statInfo:Stats = {}

    abilitiesText.forEach((abilityText) => {
        for (const item of abilityToStat) {
            if(item.regex.test(abilityText)){
                statInfo[item.stat] = Number(abilityText.match(/\d+/)![0])
                break;
            }
        }
    })

    return statInfo;
}
