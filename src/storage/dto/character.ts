import type {World} from "./world";

export interface Character {
    id:string;
    imgUrl: string;
    name: string;
    level: number;
    classType:string;
    world?:World;
    account?:string;
}
