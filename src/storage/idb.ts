import {migrateFromLocalstorage} from "./initialize/migrateFromLocalstorage";

// db.ts
import Dexie, { type Table } from 'dexie';
import type {Account} from "./dto/account";
import type {AccountWorld} from "./dto/world";
import type {Todo} from "./dto/todo";
import type {SystemInfo} from "./dto/systemInfo";
import type {Settings} from "./dto/settings";
import type {Character} from "./dto/character";

export class Idb extends Dexie {
    account!: Table<Account,number>;
    accountWorld!:Table<AccountWorld,number>
    character!: Table<Character,number>;
    todo!:Table<Todo,number>;
    settings!: Table<Settings,string>;
    systemInfo!: Table<SystemInfo,string>;

    constructor() {
        super('maplelife');
        this.version(1).stores({
            account: '++id, order',
            accountWorld: '++id, accountId, order',
            todo: '++id, order',
            character: '++id,accountId, worldId, order',
            settings: 'name',
            systemInfo: 'name',
        });

        this.version(2).stores({
            character: '++id,accountId, worldId, order, orderInCharacterPage',
        }).upgrade(trans => {
            trans.table("character").toCollection().modify(character => {
                character.orderInCharacterPage = character.id;
                character.useTodo = true;
                character.spec = {};
            });
        })
    }
}

export const idb = new Idb();
