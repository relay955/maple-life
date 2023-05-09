import {liveQuery} from "dexie";
import {idb} from "../idb";
import type {Account} from "../dto/account";

export const characterQuery = {
    generateCharacterTree :async () => {
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
}
