export interface CheckedData{
    checkedDate: Date;
    characterId:number|"all";
    todoId:number;
    isBlocking:boolean;//특정 캐릭터는 특정 일일퀘스트를 안하고싶을수도 있는데, 그 상황일때는 true.
}
