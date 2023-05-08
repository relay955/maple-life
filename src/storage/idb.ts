import {migrateFromLocalstorage} from "./migration/migrateFromLocalstorage";

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
            account: '++id',
            accountWorld: '++id',
            todo: '++id',
            character: '++id',
            settings: 'name',
            systemInfo: 'name',
        });

    }
}

export const idb = new Idb();
