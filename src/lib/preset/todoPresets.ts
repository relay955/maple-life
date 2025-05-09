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
        "몬스터파크 익스트림": {
          type: "perAccount",
          repeatType: "weeklyThursday",
        },
        "아즈모스 협곡": {
          type: "perAccount",
          repeatType: "weeklyThursday",
        },
        "에픽 던전": {
          type: "perAccount",
          repeatType: "weeklyThursday",
        },
        "드래곤 아일랜드": {
          type: "perAccount",
          repeatType: "monthly",
        },
    }
}

