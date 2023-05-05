export interface TodoPreset{
    type:"perCharacter"|"perAccount";
    repeatType:"daily"|"weeklyMonday"|"weeklyThursday"|"monthly";
}

export const getTodoPresets = ():{[index:string]:TodoPreset} => {
    return {
        "일일 보스": {
            type: "perCharacter",
            repeatType: "daily",
        },
        "주간 보스": {
            type: "perCharacter",
            repeatType: "weeklyThursday",
        },
        "심볼 일퀘": {
            type: "perCharacter",
            repeatType: "daily",
        },
        "검은 마법사": {
            type: "perCharacter",
            repeatType: "monthly",
        },
        "우르스": {
            type: "perAccount",
            repeatType: "daily",
        },
        "데일리 기프트 수령": {
            type: "perAccount",
            repeatType: "daily",
        },
        "몬스터 파크": {
            type: "perAccount",
            repeatType: "daily",
        },
        "마빌채집": {
            type: "perCharacter",
            repeatType: "daily"
        },
        "아이템팟 확인": {
            type: "perCharacter",
            repeatType: "daily"
        },
        "황금마차 출석": {
            type: "perAccount",
            repeatType: "daily"
        },
        "심볼 주간퀘": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "무릉도장": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "길드컨텐츠 - 지하수로": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "길드컨텐츠 - 플래그레이스": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "헤이븐/야영지": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "보스 마일리지 수령": {
            type: "perAccount",
            repeatType: "daily"
        },
        "더 시드": {
            type: "perCharacter",
            repeatType: "daily"
        },
        "유니온코인 수령": {
            type: "perAccount",
            repeatType: "daily"
        },
        "몬스터컬렉션 보상 수령": {
            type: "perAccount",
            repeatType: "daily"
        },
        "메이플M 마일리지": {
            type: "perAccount",
            repeatType: "daily"
        },
        "이벤트 - 코인수집": {
            type: "perCharacter",
            repeatType: "daily"
        },
        "이벤트 - 던전 블래스트": {
            type: "perAccount",
            repeatType: "daily"
        },
        "이벤트 - 메모리아 레오나 찬스": {
            type: "perAccount",
            repeatType: "daily"
        },
        "이벤트 - 메이프릴 캔디 미니게임 참여": {
            type: "perCharacter",
            repeatType: "daily"
        },
        "에르다 스펙트럼": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "배고픈 무토": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "미드나잇 체이서": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "스피릿 세이비어": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "엔하임 디펜스": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        },
        "프로텍트 에스페라": {
            type: "perCharacter",
            repeatType: "weeklyMonday"
        }
    }
}

