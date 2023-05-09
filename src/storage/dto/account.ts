import type {AccountWorld} from "./world";

export interface Account {
    id?:number;
    name:string;
    order:number;
    worlds?:AccountWorld[];
}

export const calcAccountCharacterCount = (account:Account) => {
    let count = 0;
    account.worlds?.forEach(world => {
        count += world.characters?.length ?? 0;
    });
    return count;
}
