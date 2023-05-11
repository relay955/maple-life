import {idb} from "../idb";
import type {Account} from "../dto/account";

export const swapAccountOrder = async (account: Account, targetAccount: Account) => {
    const temp = account.order
    account.order = targetAccount.order
    targetAccount.order = temp;

    await idb.account.bulkPut([account, targetAccount])
}
