import {requestWithProxy} from "../backendAdapter/backendAdapter";
import {sleep} from "./sleep";
import {
    checkCharacterStatAvailable,
    parseMapleCharacterInfo, parseAbility, parseHyperStats
} from "./mapleParser";
import type {World} from "../storage/dto/world";
import type {Character} from "../storage/dto/character";
import {idb} from "../storage/idb";
import parse from "node-html-parser";

export const requestMapleCharacterBasicInfo = async (characterName: string) => {
    try {
        const res = await requestWithProxy(`https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=0`)
        return parseMapleCharacterInfo(parse(res))
    }catch(e){
        await sleep(200, 400)
        const res = await requestWithProxy(`https://maplestory.nexon.com/Ranking/World/Total?c=${characterName}&w=254`)
        return parseMapleCharacterInfo(parse(res))
    }
}


export const requestMapleCharacterDetailInfo = async (character:Character) => {
    if(character.detailInfoUrl === undefined){
       let res = await requestMapleCharacterBasicInfo(character.name)
       character.detailInfoUrl = res.detailInfoUrl;
    }
    let detailInfoHtml = parse(await requestWithProxy(character.detailInfoUrl))
    let result = checkCharacterStatAvailable(detailInfoHtml)

    //갱신 필요할경우 캐릭터 정보를 이용해 랭킹에서 상세정보페이지 링크 갱신
    if(result === "REQUIRE_REFRESH"){
        await sleep(200, 400)
        let res = await requestMapleCharacterBasicInfo(character.name)
        character.detailInfoUrl = res.detailInfoUrl;
        await idb.character.put(character);
        result = checkCharacterStatAvailable(detailInfoHtml)
    }

    //한번 갱신했는데도 다시 갱신 필요 상태라면 문제가 있는것임
    if(result === "REQUIRE_REFRESH"){
        throw new Error("캐릭터 정보 갱신에 실패했습니다.")
    }else if(result === "PRIVATE"){
        throw new Error("캐릭터가 비공개 상태입니다.")
    }

    console.log(parseAbility(detailInfoHtml))
    console.log(parseHyperStats(detailInfoHtml))

}
