import axios from "axios";

interface MapleCharacterInfo{
    imgUrl:string;
    detailInfoUrl:string;
    nickname:string;
    classType:string;
}
export const requestMapleCharacterInfo = async (characterName: string,proxy:string) => {
    let url = `${proxy}/https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=0`
    return await axios.get(url)
}

const parseMapleCharacterInfo = (rankingHtmlData:string) => {

}
