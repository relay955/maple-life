import {isInitialized} from "./storage";
import type {Idb} from "./idb";
import {v4 as uuidv4} from "uuid";
import moment from "moment";

export const initDefaultData = async (idb: Idb) => {
    if (isInitialized()) return;

    console.log("first visit detected. start initialize")

    //기본계정 등록
    const defaultAccountId = await idb.account.add({
        name: "기본계정",
        order: 0
    })

    //기본월드 등록
    const defaultWorldId = await idb.accountWorld.add({
        accountId: defaultAccountId,
        world: "리부트",
        order: 0
    })

    //기본캐릭터 등록
    await idb.character.bulkAdd([
        {
            name:"기본캐릭터",
            accountId:defaultAccountId,
            worldId:defaultWorldId,
            level:200,
            classType:"히어로",
            imgUrl:"",
            order:0
        },
        {
            name:"부캐릭터",
            accountId:defaultAccountId,
            worldId:defaultWorldId,
            level:200,
            classType:"비숍",
            imgUrl:"",
            order:1
        }
    ])

    await idb.todo.bulkAdd([
        {
            name:"유니온코인 수령",
            type:"perAccount",
            repeatType:"daily",
            isChecked:"unchecked",
            color:"default",
            order:0
        },
        {
            name: "일일 보스",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {},
            color:"default",
            order:1
        },
        {
            name: "심볼 일퀘",
            type: "perCharacter",
            repeatType: "daily",
            isChecked: {},
            color:"default",
            order:2
        },
        {
            name:"이벤트 - 코인수집",
            type:"perCharacter",
            repeatType:"daily",
            isChecked:{},
            color:"default",
            order:3
        },
        {
            name: "데일리 기프트 수령",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked",
            color:"default",
            order:4
        },
        {
            name: "우르스",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked",
            color:"default",
            order:5
        },
        {
            name: "몬스터 파크",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked",
            color:"default",
            order:6
        },
        {
            name: "황금마차 출석",
            type: "perAccount",
            repeatType: "daily",
            isChecked: "unchecked",
            color:"default",
            order:7
        },
        {
            name: "주간 보스",
            type: "perCharacter",
            repeatType: "weeklyThursday",
            isChecked: {
                "2":"blocked"
            },
            color:"default",
            order:8
        },
        {
            name: "심볼 주간퀘",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {},
            color:"default",
            order:9
        },
        {
            name: "길드컨텐츠 - 지하수로",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {
                "2":"blocked"
            },
            color:"default",
            order:10
        },
        {
            name: "길드컨텐츠 - 플래그레이스",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {
                "2":"blocked"
            },
            color:"default",
            order:11
        },
        {
            name: "헤이븐/야영지",
            type: "perCharacter",
            repeatType: "weeklyMonday",
            isChecked: {},
            color:"default",
            order:12
        }
    ])

    //기본설정 등록
    await idb.settings.bulkAdd([
        {
            name:"shortHeightMode",
            value:false
        },
        {
            name:"showCharacterPreview",
            value:true
        }
    ])

    await idb.systemInfo.add({
        name:"lastUpdate",
        value:moment().format("YYYY-MM-DD")
    })
}
