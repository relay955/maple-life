import {idb} from "../idb";
import type {AccountWorld, World} from "../dto/world";

export const swapWorldOrder = async (world: AccountWorld, targetWorld: AccountWorld) => {
    const temp = world.order
    world.order = targetWorld.order
    targetWorld.order = temp;

    await idb.accountWorld.bulkPut([world, targetWorld])
}


export const insertWorldOrGetWorldId = async (accountId:number, worldName:World) => {
    let worldInAccount = await idb.accountWorld.where("accountId")
        .equals(accountId)
        .toArray()

    let targetWorld = worldInAccount
        .filter(accountWorld => accountWorld.world === worldName)
        .pop()

    if (targetWorld === undefined) {
        let newWorld:AccountWorld = {
            accountId: accountId,
            world: worldName,
            order: 0,
        }

        worldInAccount.forEach((world)=>{
            if(world.order > newWorld.order) newWorld.order = world.order
        })
        newWorld.order ++;

        return idb.accountWorld.add(newWorld);
    }else{
        return targetWorld.id!
    }
}
