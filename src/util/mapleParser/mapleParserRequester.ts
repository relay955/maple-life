import {requestWithProxy} from "../../backendAdapter/backendAdapter";
import {sleep} from "../sleep";
import parse from "node-html-parser";
import {
    parseMapleCharacterInfo
} from "./basicInfoParser";

const MAPLE_HOMEPAGE = "https://maplestory.nexon.com"
const RANKING_PAGE = `${MAPLE_HOMEPAGE}/N23Ranking/World/Total`


//
export const requestMapleCharacterBasicInfo = async (characterName: string) => {
    try {
        const res = await requestWithProxy(`${RANKING_PAGE}?c=${characterName}&w=0`)
        return parseMapleCharacterInfo(parse(res))
    }catch(e){
        await sleep(200, 400)
        const res = await requestWithProxy(`${RANKING_PAGE}?c=${characterName}&w=254`)
        return parseMapleCharacterInfo(parse(res))
    }
}
