import {idb} from "../idb";
import type {Account} from "../dto/account";
import {toast} from "@zerodevx/svelte-toast";

export const swapAccountOrder = async (account: Account, targetAccount: Account) => {
    let account1: Account = JSON.parse(JSON.stringify(account))
    let account2: Account = JSON.parse(JSON.stringify(targetAccount))
    const temp = account1.order
    account1.order = account2.order
    account2.order = temp;

    //저장시에는 계정에 포함된 월드는 저장하면 안됨
    account1.worlds = undefined;
    account2.worlds = undefined;
    await idb.account.bulkPut([account1, account2])
}

export const putAccount = async (account: Account) => {
    account = JSON.parse(JSON.stringify(account))
    const isFirstCreate = account.id === undefined ||
        (await idb.todo.get(account.id)) === undefined

    if(isFirstCreate){
        const allAccounts = await idb.account.toArray()
        allAccounts.forEach((item) => {
            if (item.order > account.order) account.order = item.order
        })
        account.order ++;
    }else{
        account.worlds = undefined;
    }
    idb.account.put(account)
}

export const deleteAccount = async (account: Account) => {
    if (await idb.account.count() <= 1) {
        throw new Error("계정은 최소 1개 이상이어야 합니다.")
    }
    const deleteTargetCharactersId = await idb.character
        .where("accountId")
        .equals(account.id!)
        .primaryKeys()
    if (deleteTargetCharactersId.length === await idb.character.count()) {
        throw new Error("해당 계정이 삭제되면 모든 캐릭터가 제거되므로 삭제할 수 없습니다.");
    }

    const deleteTargetWorldsId = await idb.accountWorld
        .where("accountId")
        .equals(account.id!)
        .primaryKeys()

    await idb.character.bulkDelete(deleteTargetCharactersId)
    await idb.accountWorld.bulkDelete(deleteTargetWorldsId)
    await idb.account.delete(account.id!)
}
