export type TodoCheckType = "checked" | "unchecked" | "blocked";
export interface Todo {
    id?:number;
    name: string;
    repeatType:"daily"|"weeklyMonday"|"weeklyThursday"|"monthly";
    type:"perCharacter"|"perAccount"|"perWorld";
    color:string;
    //per character일경우 캐릭터ID별로, perAccount일경우 계정ID별로, per world일경우 계정:월드별(1:1 형태)
    isChecked:{[index:string]:TodoCheckType}
    order:number;
}
