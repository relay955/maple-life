export type TodoCheckType = "checked" | "unchecked" | "blocked";
export interface Todo {
    id:string;
    name: string;
    repeatType:"daily"|"weeklyMonday"|"weeklyThursday"|"monthly";
    type:"perCharacter"|"perAccount"|"perWorld";
    color:string;
    isChecked:{[index:string]:TodoCheckType} | TodoCheckType//per character일경우 캐릭터별로, perAccount일경우 단일, per world일경우 월드별
}
