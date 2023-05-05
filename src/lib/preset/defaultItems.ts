import type {Character} from "../../storage/dto/character";
import type {Todo} from "../../storage/dto/todo";
import {v4 as uuidv4} from 'uuid'

export const getDefaultCharacters = ():Character[] =>
    [
        {
            id:"1",
            name: "기본캐릭터",
            imgUrl: "",
            level: 200,
            classType: "히어로"
        },
        {
            id:"2",
            name: "부캐릭터",
            imgUrl: "",
            level: 200,
            classType: "비숍"
        },

    ]

export const getDefaultTodos = ():Todo[] =>
    [
        {
            id:uuidv4(),
            name:"유니온코인 수령",
            type:"perAccount",
            repeatType:"daily",
            isChecked:"unchecked"
        },
        {
            id:uuidv4(),
            name: "일일 보스",
            type: "perCharacter",
            repeatType: "daily",
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
            name:"이벤트 - 코인수집",
            type:"perCharacter",
            repeatType:"daily",
            isChecked:{}
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
            name: "우르스",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked"
        },
        {
            id:uuidv4(),
            name: "몬스터 파크",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked"
        },
        {
            id:uuidv4(),
            name: "황금마차 출석",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked"
        },
        {
            id:uuidv4(),
            name: "주간 보스",
            type: "perCharacter",
            repeatType: "weeklyThursday",
            isChecked: {
                "2":"blocked"
            }
        },
        {
            id:uuidv4(),
            name: "심볼 주간퀘",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {}
        },
        {
            id:uuidv4(),
            name: "길드컨텐츠 - 지하수로",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {
                "2":"blocked"
            }
        },
        {
            id:uuidv4(),
            name: "길드컨텐츠 - 플래그레이스",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {
                "2":"blocked"
            }
        },
        {
            id:uuidv4(),
            name: "헤이븐/야영지",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {}
        }
    ]
