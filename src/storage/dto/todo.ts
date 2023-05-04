export interface Todo {
    name: string;
    repeatType:"daily"|"weeklyMonday"|"weeklyTuesday"|"monthly";
    type:"perCharacter"|"perAccount";
}
