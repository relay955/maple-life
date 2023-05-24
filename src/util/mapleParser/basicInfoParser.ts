import {HTMLElement as ParsedHtmlElement} from "node-html-parser";

interface MapleCharacterInfo{
    imgUrl:string;
    detailInfoKey:string;
    nickname:string;
    classType:string;
    level:number;
    world:string;
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
        detailInfoKey: tr.querySelector(".left > dl > dt > a")!.getAttribute("href")!.split("?p=")[1],
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

