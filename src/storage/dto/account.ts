import type {AccountWorld} from "./world";

export interface Account {
    id?:number;
    name:string;
    order:number;
    worlds?:AccountWorld[];
}
