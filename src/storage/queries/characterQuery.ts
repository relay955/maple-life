import {liveQuery} from "dexie";
import {idb} from "../idb";
import type {Account} from "../dto/account";
import type {Character} from "../dto/character";
import {toast} from "@zerodevx/svelte-toast";


export const generateCharacterTree = async () => {
    let accounts = await idb.account
        .orderBy("order").toArray();
    let accountWorlds = await idb.accountWorld
        .orderBy("order").toArray();
    let characters = await idb.character
        .orderBy("order").toArray();

    return accounts.map<Account>(account => {
        let filteredAccountWorlds = accountWorlds
            .filter(accountWorld => accountWorld.accountId === account.id)
        return {
            ...account,
            worlds: filteredAccountWorlds.map(world => {
                let filteredCharacter = characters
                    .filter(character => character.worldId === world.id
                        && character.accountId === account.id)
                return {
                    ...world,
                    characters: filteredCharacter
                }
            })
        }
    })
}

export const swapCharacterOrder = async (character:Character, targetCharacter:Character) => {
    const temp = character.order
    character.order = targetCharacter.order
    targetCharacter.order = temp;

    await idb.character.bulkPut([character, targetCharacter])
}

export const putCharacter = async (character:Character) => {
    if (character.id !== undefined) {
        const beforeCharacter = await idb.character.get(character.id)
        if(beforeCharacter === undefined) throw Error("character id is not undefined but character is undefined")

        //월드가 이동된경우 캐릭터 순서를 해당월드 기준으로 재배치
        if(beforeCharacter.worldId !== character.worldId){
            character.order = await getLastOrder(character.worldId) + 1;
        }

        await idb.character.put(character)

        //캐릭터 변경인 경우, 월드를 수동변경할 때에는 해당 월드에 캐릭터가 없어질수 있는데 이때 월드를 삭제해주어야함.
        if((await idb.character.where("worldId").equals(beforeCharacter.worldId).count()) <= 0){
            await idb.accountWorld.delete(beforeCharacter.worldId)
        }
    }else{
        //순서 해당월드의 가장 마지막으로 추가
        character.order = await getLastOrder(character.worldId) + 1;
        //캐릭터페이지에서의 순서는 월드상관없음.
        (await idb.character.toArray()).forEach((item)=>{
            if(item.orderInCharacterPage > character.orderInCharacterPage)
                character.orderInCharacterPage = item.orderInCharacterPage
        })
        character.orderInCharacterPage ++;

        await idb.character.add(character)
    }
}

const getLastOrder = async (worldId:number) => {
    let characters = await idb.character
        .filter(c => c.worldId === worldId)
        .toArray();
    let lastOrder = 0;
    characters.forEach((item)=>{
        if(item.order > lastOrder) lastOrder = item.order
    })
    return lastOrder;
}

export const deleteCharacter = async (character:Character) => {
    if ((await idb.character.count()) <= 1) {
        throw new Error("최소 1개 이상의 캐릭터가 존재해야합니다.")
    }
    await idb.character.delete(character.id!)
    if((await idb.character.where("worldId").equals(character.worldId).count()) <= 0){
        await idb.accountWorld.delete(character.worldId)
    }
}

export const lqCharacterTree = liveQuery(generateCharacterTree)

export const lqCharacter = liveQuery(() =>
    idb.character.orderBy("orderInCharacterPage").toArray())
