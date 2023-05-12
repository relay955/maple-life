import {idb} from "../idb";
import type {AccountWorld, World} from "../dto/world";

export const swapWorldOrder = async (world: AccountWorld, targetWorld: AccountWorld) => {
    let world1:AccountWorld = JSON.parse(JSON.stringify(world))
    let world2:AccountWorld = JSON.parse(JSON.stringify(targetWorld))
    const temp = world1.order
    world1.order = world2.order
    world2.order = temp;

    //저장시에는 월드에 포함된 캐릭터는 저장하면 안됨
    world1.characters = undefined;
    world2.characters = undefined;
    await idb.accountWorld.bulkPut([world1, world2])
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
