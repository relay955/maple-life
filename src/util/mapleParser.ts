import axios from "axios";
import parse from "node-html-parser";

interface MapleCharacterInfo{
    imgUrl:string;
    detailInfoUrl:string;
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


export const requestMapleCharacterInfo = async (characterName: string,proxy:string) => {
    const serviceWorker = await navigator.serviceWorker.getRegistration()
    serviceWorker?.active?.postMessage("asdffadsf")

    // let url = `${proxy}/https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=0`
    // const res = await axios.get(url)
    // try {
    //     return parseMapleCharacterInfo(res.data)
    // }catch(e){
    //     let url = `${proxy}/https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=254`
    //     const res = await axios.get(url)
    //     return parseMapleCharacterInfo(res.data)
    // }
}

const parseMapleCharacterInfo = (rankingHtmlData:string):MapleCharacterInfo => {
    const root = parse(rankingHtmlData)
    const tr = root.querySelector(".search_com_chk")!

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
