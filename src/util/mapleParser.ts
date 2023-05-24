import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

interface MapleCharacterInfo{
    imgUrl:string;
    detailInfoUrl:string;
    nickname:string;
    classType:string;
    level:number;
    world:string;
}

type Stat = "HP" | "MP" | "HP%" | "MP%" | "APHP" | " APMP" |
    "공격력" | "공격력%" | "레벨당 공격력" |"마력" | "마력%" | "레벨당 마력" |
    "APSTR" | "APDEX" | "APINT" | "APLUK" |
    "STR" | "DEX" | "INT" | "LUK" | "올스텟" |
    "STR%" | "DEX%" |"INT%" |"LUK%" | "올스텟%" |
    "고정STR" | "고정DEX" |"고정INT" |"고정LUK" |
    "보스 데미지" | "일반 데미지" | "데미지" | "상태이상 추가데미지" | "최종 데미지" |
    "크리티컬 데미지" | "크리티컬 확률" | "아이템 드롭률" | "메소 획득량" |
    "방어율 무시" | "속성내성 무시" | "공격속도" | "재사용 대기시간 초기화" |
    "아케인 포스" | "획득경험치" | "버프지속시간" | "점프력" | "이동속도" |
    "패시브 스킬 레벨 증가"

interface StatInfo{
    statType:Stat;
    amount:number;
}

const worldByIconFileName:{[index:string]:string} = {
    "icon_4.png":"오로라",
    "icon_5.png":"레드",
    "icon_6.png":"이노시스",
    "icon_7.png":"유니온",
    "icon_8.png":"스카니아",
    "icon_9.png":"루나",
    "icon_10.png":"제니스",
    "icon_11.png":"크로아",
    "icon_12.png":"베라",
    "icon_13.png":"엘리시움",
    "icon_14.png":"아케인",
    "icon_15.png":"노바",
    "icon_3.png":"리부트",
    "icon_2.png":"리부트2",
}



/**
 * 랭킹 페이지에서 캐릭터의 기본적인 정보를 얻습니다.
 * @param rankingPage node-html-parser로 파싱된 페이지 HTML을 제공해야합니다.
 * <br/> 요청한 url은 반드시 https://maplestory.nexon.com/Ranking/World/Total?c=캐릭터명&w=월드ID 형태여야 합니다.
 * @return 해석된 결과를 반환합니다. 제공되는 정보는 MapleCharacterInfo 인터페이스를 참조하세요.
 */
export const parseMapleCharacterInfo = (rankingPage:ParsedHtmlElement):MapleCharacterInfo => {
    const tr = rankingPage.querySelector(".search_com_chk")!

    return {
        imgUrl: tr.querySelector(".left > .char_img > img")!.getAttribute("src")!,
        detailInfoUrl: "https://maplestory.nexon.com"+tr.querySelector(".left > dl > dt > a")!.getAttribute("href")!,
        nickname: tr.querySelector(".left > dl > dt > a")!.textContent,
        classType: tr.querySelector(".left > dl > dd")!.textContent
            .split("/")[1]
            .trim(),
        level: Number(tr.querySelector("td:nth-child(3)")!.textContent
            .split(".")[1]
            .trim()),
        world: worldByIconFileName[tr.querySelector(".left > dl > dt > a > img")?.getAttribute("src")?.split("/").pop()!]
    }
}

export const checkCharacterStatAvailable = (basicInfoPage: ParsedHtmlElement):"REQUIRE_REFRESH"|"PRIVATE"|"AVAILABLE" => {
    if(basicInfoPage.querySelector("body")!.childNodes.length <= 1){
        return "REQUIRE_REFRESH"
    }else if(basicInfoPage.querySelector(".private2") !== null){
        return "PRIVATE"
    }else{
        return "AVAILABLE"
    }
}

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
    {"regex":/모든 능력치/, "stat":"올스텟"},
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
export const parseAbility = (basicInfoPage:ParsedHtmlElement):StatInfo[] => {
    const abilitySpan = basicInfoPage.querySelector(
".tab01_con_wrap > table:nth-child(4) > tbody > tr:nth-child(10) > td > span"
    )!

    const abilitiesText = abilitySpan.structuredText.split(/[\n,]/)
    let statInfos:StatInfo[] = []

    abilitiesText.forEach((abilityText) => {
        for (const item of abilityToStat) {
            if(item.regex.test(abilityText)){
                statInfos.push({
                    statType:item.stat,
                    amount:Number(abilityText.match(/\d+/)![0])
                })
                break;
            }
        }
    })

    return statInfos;
}

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
export const parseHyperStats = (basicInfoPage:ParsedHtmlElement):StatInfo[] => {
    const hyperStatsSpan = basicInfoPage.querySelector(
        ".tab01_con_wrap > table:nth-child(4) > tbody > tr:nth-child(11) > td > span"
    )!

    const text = hyperStatsSpan.structuredText.split("\n")
    let statInfos:StatInfo[] = []

    text.forEach((abilityText) => {
        for (const item of hyperStatToStat) {
            if(item.regex.test(abilityText)){
                statInfos.push({
                    statType:item.stat,
                    amount:Number(abilityText.match(/\d+/)![0])
                })
                break;
            }
        }
    })

    return statInfos;
}
