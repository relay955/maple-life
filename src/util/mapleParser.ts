import axios from "axios";
import parse from "node-html-parser";

interface MapleCharacterInfo{
    imgUrl:string;
    detailInfoUrl:string;
    nickname:string;
    classType:string;
    level:number;
}
export const requestMapleCharacterInfo = async (characterName: string,proxy:string) => {
    let url = `${proxy}/https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=0`
    throw new Error("MapleStory is not working")
    const res = await axios.get(url)
    try {
        return parseMapleCharacterInfo(res.data)
    }catch(e){
        let url = `${proxy}/https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=254`
        const res = await axios.get(url)
        return parseMapleCharacterInfo(res.data)
    }
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
            .trim())
    }
}
