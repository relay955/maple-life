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
    const isFirstCreate = character.id === undefined ||
        (await idb.todo.get(character.id)) === undefined

    if(!isFirstCreate) character.order = (await idb.character
        .filter(c => c.worldId === character.worldId).count())+1

    await idb.character.put(character)
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
