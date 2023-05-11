import {idb} from "../idb";
import type {AccountWorld} from "../dto/world";

export const swapWorldOrder = async (world: AccountWorld, targetWorld: AccountWorld) => {
    const temp = world.order
    world.order = targetWorld.order
    targetWorld.order = temp;

    await idb.accountWorld.bulkPut([world, targetWorld])
}
