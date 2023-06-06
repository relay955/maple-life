import {requestWithProxy} from "../../backendAdapter/backendAdapter";
import {sleep} from "../sleep";
import type {World} from "../../storage/dto/world";
import type {Character} from "../../storage/dto/character";
import {idb} from "../../storage/idb";
import parse from "node-html-parser";
import {
    checkCharacterStatAvailable,
    parseMapleCharacterInfo
} from "./basicInfoParser";
import {parseHyperStats} from "./hyperStatParser";
import {parseAbility} from "./abilityParser";
import {
    parseItemsLinkKey,
    parseSingleEquipment,
    parseSymbolsLinkKey
} from "./equipmentParser";
import {parseSkills} from "./skillParser";
import {parseTendency} from "./tendencyParser";

const MAPLE_HOMEPAGE = "https://maplestory.nexon.com"
const RANKING_PAGE = `${MAPLE_HOMEPAGE}/Ranking/World/Total`
const DETAIL_PAGE = `${MAPLE_HOMEPAGE}/Common/Character/Detail`
const ITEM_PAGE = `${MAPLE_HOMEPAGE}/Common/Resource/Item`
const EQUIPMENT_PAGE_KEY = `Equipment`
const SKILL_PAGE_KEY = `Skill`


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


export const requestMapleCharacterDetailInfo = async (character:Character) => {
    if(character.detailInfoKey === undefined){
       let res = await requestMapleCharacterBasicInfo(character.name)
       character.detailInfoKey = res.detailInfoKey;
    }
    let detailInfoHtml = parse(
        await requestWithProxy(`${DETAIL_PAGE}/${character.name}?p=${character.detailInfoKey}`))
    let result =
        checkCharacterStatAvailable(detailInfoHtml)

    //갱신 필요할경우 캐릭터 정보를 이용해 랭킹에서 상세정보페이지 링크 갱신
    if(result === "REQUIRE_REFRESH"){
        await sleep(200, 400)
        let res = await requestMapleCharacterBasicInfo(character.name)
        character.detailInfoKey = res.detailInfoKey;
        await idb.character.put(character);
        detailInfoHtml = parse(
            await requestWithProxy(`${DETAIL_PAGE}/${character.name}?p=${character.detailInfoKey}`))
        result = checkCharacterStatAvailable(detailInfoHtml)
    }

    //한번 갱신했는데도 다시 갱신 필요 상태라면 문제가 있는것임
    if(result === "REQUIRE_REFRESH"){
        throw new Error("캐릭터 정보 갱신에 실패했습니다.")
    }else if(result === "PRIVATE"){
        throw new Error("캐릭터가 비공개 상태입니다.")
    }

    if(character.spec === undefined) character.spec = {}
    if(character.spec.default === undefined) character.spec.default = {
        hyperStat: {},
        ability:{},
        equipments:{},
        skills: {},
        tendency : {},
        buff:{},
        linkSkills:{},
    }
    let defaultSpec = character.spec.default
    //기본정보에서 어빌리티, 하이퍼스텟 파싱
    defaultSpec.ability =parseAbility(detailInfoHtml)
    defaultSpec.hyperStat = parseHyperStats(detailInfoHtml)
    defaultSpec.tendency = parseTendency(detailInfoHtml)

    await sleep(200, 400)
    let equipmentPageHtml = parse(
        await requestWithProxy(`${DETAIL_PAGE}/${character.name}/${EQUIPMENT_PAGE_KEY}?p=${character.detailInfoKey}`)
    )

    //장비 정보 파싱
    defaultSpec.equipments = {}
    let itemLinkKeys = parseItemsLinkKey(equipmentPageHtml)

    for (let itemLinkKey of itemLinkKeys) {
        await sleep(200, 400)
        const singleEquipmentJson = JSON.parse(await requestWithProxy(`${ITEM_PAGE}?p=${itemLinkKey.key}`,true))
        const singleEquipmentHtml = parse(singleEquipmentJson.view)
        defaultSpec.equipments[itemLinkKey.type] = (parseSingleEquipment(singleEquipmentHtml))
    }

    //아케인심볼 파싱
    let symbolLinkKeys = parseSymbolsLinkKey(equipmentPageHtml)
    for(let symbolLinkKey of symbolLinkKeys) {
        await sleep(200, 400)
        const singleEquipmentJson = JSON.parse(await requestWithProxy(`${ITEM_PAGE}?p=${symbolLinkKey.key}`, true))
        const singleEquipmentHtml = parse(singleEquipmentJson.view)
        defaultSpec.equipments[symbolLinkKey.type] = (parseSingleEquipment(singleEquipmentHtml))
    }

    //스킬 파싱
    await sleep(200, 400)
    let skillPageHtml = parse(
        await requestWithProxy(`${DETAIL_PAGE}/${character.name}/${SKILL_PAGE_KEY}?p=${character.detailInfoKey}`)
    )

    defaultSpec.skills = parseSkills(skillPageHtml);
    return character;
}
