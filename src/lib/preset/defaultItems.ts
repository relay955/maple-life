import type {Character} from "../../storage/dto/character";
import type {Todo} from "../../storage/dto/todo";

export const getDefaultCharacters = ():Character[] =>
    [
        {
            name: "보마1",
            imgUrl: "",
            level: 235,
            classType: "보우마스터"
        },
        {
            name: "썬콜",
            imgUrl: "",
            level: 241,
            classType: "아크메이지 (썬,콜)"
        }
    ]

export const getDefaultTodos = ():Todo[] =>
    [
        {
            name: "일일 보스",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {
                "썬콜": "checked"
            }
        },
        {
            name: "주간 보스",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {}
        },
        {
            name: "심볼 일퀘",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {}
        },
        {
            name: "검은 마법사",
            type: "perCharacter",
            repeatType: "monthly",
            isChecked: {}
        },
        {
            name: "우르스 3판",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "checked"
        },
        {
            name: "데일리 기프트 수령",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked"
        },
        {
            name: "몬스터 파크",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "blocked"
        }
    ]
