import {idb} from "../idb";
import type {Account} from "../dto/account";
import {toast} from "@zerodevx/svelte-toast";

export const swapAccountOrder = async (account: Account, targetAccount: Account) => {
    const temp = account.order
    account.order = targetAccount.order
    targetAccount.order = temp;

    await idb.account.bulkPut([account, targetAccount])
}

export const putAccount = async (account: Account) => {
    const isFirstCreate = account.id === undefined ||
        (await idb.todo.get(account.id)) === undefined

    if(isFirstCreate){
        const allAccounts = await idb.account.toArray()
        allAccounts.forEach((item) => {
            if (item.order > account.order) account.order = item.order
        })
        account.order ++;
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
    await idb.character.bulkDelete(deleteTargetCharactersId)
    await idb.account.delete(account.id!)
}
