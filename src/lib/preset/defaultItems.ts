import type {Character} from "../../storage/dto/character";
import type {Todo} from "../../storage/dto/todo";
import {v4 as uuidv4} from 'uuid'

export const getDefaultCharacters = ():Character[] =>
    [
        {
            id:uuidv4(),
            name: "보마1",
            imgUrl: "",
            level: 235,
            classType: "보우마스터"
        },
        {
            id:uuidv4(),
            name: "썬콜",
            imgUrl: "",
            level: 241,
            classType: "아크메이지 (썬,콜)"
        }
    ]

export const getDefaultTodos = ():Todo[] =>
    [
        {
            id:uuidv4(),
            name: "일일 보스",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {
                "썬콜": "checked"
            }
        },
        {
            id:uuidv4(),
            name: "주간 보스",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {}
        },
        {
            id:uuidv4(),
            name: "심볼 일퀘",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {}
        },
        {
            id:uuidv4(),
            name: "검은 마법사",
            type: "perCharacter",
            repeatType: "monthly",
            isChecked: {}
        },
        {
            id:uuidv4(),
            name: "우르스 3판",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "checked"
        },
        {
            id:uuidv4(),
            name: "데일리 기프트 수령",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked"
        },
        {
            id:uuidv4(),
            name: "몬스터 파크",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "blocked"
        }
    ]
