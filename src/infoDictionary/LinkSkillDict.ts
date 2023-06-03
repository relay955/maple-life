import type {Stat, Stats} from "../util/mapleParser/mapleStat";
import iconLink1 from "$lib/images/icon/linkskill/임피리컬 널리지.png"
import iconLink2 from "$lib/images/icon/linkskill/어드벤쳐러 큐리어스.png"
import iconLink3 from "$lib/images/icon/linkskill/시프 커닝.png"
import iconLink4 from "$lib/images/icon/linkskill/파이렛 블레스.png"
import iconLink5 from "$lib/images/icon/linkskill/시그너스 블레스.png"
import iconLink6 from "$lib/images/icon/linkskill/하이브리드 로직.png"
import iconLink7 from "$lib/images/icon/linkskill/데몬스 퓨리.png"
import iconLink8 from "$lib/images/icon/linkskill/와일드 레이지.png"
import iconLink9 from "$lib/images/icon/linkskill/퍼미에이트.png"
import iconLink10 from "$lib/images/icon/linkskill/데들리 인스팅트.png"
import iconLink11 from "$lib/images/icon/linkskill/아이언 윌.png"
import iconLink12 from "$lib/images/icon/linkskill/프라이어 프리퍼레이션.png"
import iconLink13 from "$lib/images/icon/linkskill/인텐시브 인썰트.png"
import iconLink14 from "$lib/images/icon/linkskill/노블레스.webp"
import iconLink15 from "$lib/images/icon/linkskill/전투의 흐름.gif"
import iconLink16 from "$lib/images/icon/linkskill/이네이트 기프트.png"
import iconLink17 from "$lib/images/icon/linkskill/무아.png"
import iconLink18 from "$lib/images/icon/linkskill/자연의 벗.png"
import iconLink19 from "$lib/images/icon/linkskill/자신감.png"
import iconLink20 from "$lib/images/icon/linkskill/륀느의 축복.png"
import iconLink21 from "$lib/images/icon/linkskill/판단.png"


export interface LinkSkill{
    imgUrl:string;
    statPerLevel:Stats[];
    description?:string;
}

export type LinkSkillName = "임피리컬 널리지" | "어드벤쳐러 큐리어스" |
    "시프 커닝" | "파이렛 블레스" | "시그너스 블레스" |
    "하이브리드 로직" | "데몬스 퓨리" | "와일드 레이지" |
    "퍼미에이트" | "데들리 인스팅트" |
    "아이언 윌" | "프라이어 프리퍼레이션" | "인텐시브 인썰트" |
    "노블레스" | "전투의 흐름" |
    "이네이트 기프트" | "무아" | "자연의 벗" | "자신감" |
    "륀느의 축복" | "판단"

export const linkSkillDict:{[key in LinkSkillName]:LinkSkill} = {
    "임피리컬 널리지":{
        description:"모험가 마법사 링크스킬\n"+
          "계산 편의를 위해 상시적용으로 간주합니다.\n"+
          "마스터 레벨: 6\n" +
          "2레벨 당 데미지 3%, 방어율 무시 3% 증가\n 최대 데미지 9%, 방어율 무시 9% 증가",
        imgUrl:iconLink1,
        statPerLevel:[
        {"데미지":3,"방어율 무시":3},
        {"데미지":3,"방어율 무시":3},
        {"데미지":6,"방어율 무시":6},
        {"데미지":6,"방어율 무시":6},
        {"데미지":9,"방어율 무시":9},
        {"데미지":9,"방어율 무시":9},
    ]},
    "어드벤쳐러 큐리어스":{
        imgUrl:iconLink2,
        description:"모험가 궁수 링크스킬\n마스터 레벨: 6\n" +
          "크리티컬 확률 3,4,6,7,9,10% 증가\n 최대 크리티컬 확률 10% 증가",
        statPerLevel:[
        {"크리티컬 확률":3},
        {"크리티컬 확률":4},
        {"크리티컬 확률":6},
        {"크리티컬 확률":7},
        {"크리티컬 확률":9},
        {"크리티컬 확률":10},
    ]},
    "시프 커닝":{
        imgUrl:iconLink3,
        description:"모험가 도적 링크스킬\n마스터 레벨: 6\n" +
          "계산 편의를 위해 가동률을 고려하여 데미지가 레벨당 1.5% 증가하는것으로 가정합니다.\n"+
           "최대 데미지 9% 증가\n",
        statPerLevel:[
        {"데미지":1.5},
        {"데미지":3},
        {"데미지":4.5},
        {"데미지":6},
        {"데미지":7.5},
        {"데미지":9},
        ]
    },
    "파이렛 블레스":{
      imgUrl:iconLink4,
        description:"모험가 해적 링크스킬\n마스터 레벨: 6\n" +
          "HP,MP 175+레벨*175만큼 증가, 올스탯 20+레벨*10만큼 증가\n" +
          " 최대 HP 1225, MP 1225, 올스탯 70 증가",
        statPerLevel:[
        {"HP":350,"MP":350,"올스탯":20},
        {"HP":525,"MP":525,"올스탯":30},
        {"HP":700,"MP":700,"올스탯":40},
        {"HP":875,"MP":875,"올스탯":50},
        {"HP":1050,"MP":1050,"올스탯":60},
        {"HP":1225,"MP":1225,"올스탯":70},
      ]
    },
    "시그너스 블레스":{
        imgUrl:iconLink5,
        description:"시그너스 기사단 링크스킬\n마스터 레벨: 10\n" +
          "공격력, 마력 5+레벨*2만큼 증가\n 최대 공격력 25, 마력 25 증가",
        statPerLevel:[
        {"공격력":7,"마력":7},
        {"공격력":9,"마력":9},
        {"공격력":11,"마력":11},
        {"공격력":13,"마력":13},
        {"공격력":15,"마력":15},
        {"공격력":17,"마력":17},
        {"공격력":19,"마력":19},
        {"공격력":21,"마력":21},
        {"공격력":23,"마력":23},
        {"공격력":25,"마력":25},
      ]
    },
    "하이브리드 로직":{
        imgUrl:iconLink6,
        description:"제논 링크스킬\n마스터 레벨: 2\n" +
          "올스탯 5%, 10% 증가\n 최대 올스탯 10% 증가",
        statPerLevel:[{"올스탯%":5}, {"올스탯%":10}]
    },
    "데몬스 퓨리":{
        imgUrl:iconLink7,
        description:"데몬슬레이어 링크스킬\n마스터 레벨: 2\n" +
          "보스 공격시 데미지 10%, 15% 증가\n 최대 보스 공격시 데미지 15% 증가",
        statPerLevel:[{"보스 데미지":10}, {"보스 데미지":15}]
    },
    "와일드 레이지":{
        description:"데몬어벤져 링크스킬\n마스터 레벨: 2\n" +
          "데미지 5%, 10% 증가\n 최대 데미지 10% 증가",
        imgUrl:iconLink8,
        statPerLevel:[{"데미지":5}, {"데미지":10}]
    },
    "퍼미에이트":{
        imgUrl:iconLink9,
        description:"루미너스 링크스킬\n마스터 레벨: 2\n" +
          "방어율 무시 10%, 15% 증가\n 최대 방어율 무시 15% 증가",
        statPerLevel:[{"방어율 무시":10}, {"방어율 무시":15}]
    },
    "데들리 인스팅트":{
        imgUrl:iconLink10,
        description:"팬텀 링크스킬\n마스터 레벨: 2\n" +
          "크리티컬 확률 10%, 15% 증가\n 최대 크리티컬 확률 15% 증가",
        statPerLevel:[{"크리티컬 확률":10}, {"크리티컬 확률":15}]
    },
    "아이언 윌":{
        imgUrl:iconLink11,
        description:"카이저 링크스킬\n마스터 레벨: 2\n" +
          "HP 10%, 15% 증가\n 최대 HP 15% 증가",
        statPerLevel:[{"HP%":10}, {"HP%":15}]
    },
    "프라이어 프리퍼레이션":{
        imgUrl:iconLink12,
        description:"카인 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 가동률을 고려하여 데미지가 레벨당 4.5%, 8.5% 증가하는것으로 가정합니다.\n"+
          "최대 데미지 8.5% 증가",
        statPerLevel:[{"데미지":4.5},{"데미지":8.5}]
    },
    "인텐시브 인썰트":{
        imgUrl:iconLink13,
        description:"카데나 링크스킬\n마스터 레벨: 2\n" +
          "자신보다 레벨 낮은 몬스터에게 데미지 3%, 6% 증가\n" +
          "계산 편의를 위해 데미지로 간주합니다.\n" +
          "상태이상에 걸린 몬스터 공격 시 데미지 3%, 6% 증가\n" +
          "최대 데미지 12% 증가",
        statPerLevel:[
            {"데미지":3, "상태이상 추가데미지":3},
            {"데미지":6, "상태이상 추가데미지":6},
        ]
    },
    "노블레스":{
        imgUrl:iconLink14,
        description:"아델 링크스킬\n마스터 레벨: 2\n" +
          "파티원이 없음을 가정합니다.\n" +
          "최대 데미지 2%, 보스 공격시 데미지 4% 증가",
        statPerLevel:[{"데미지":1,"보스 데미지":2}, {"데미지":2,"보스 데미지":4}]
    },
    "전투의 흐름":{
        imgUrl:iconLink15,
        description:"일리움 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 상시 발동으로 간주합니다.\n" +
          "최대 데미지 12% 증가",
        statPerLevel:[{"데미지":6}, {"데미지":12}]
    },
    "이네이트 기프트":{
        imgUrl:iconLink16,
        description:"칼리 링크스킬\n마스터 레벨: 2\n" +
          "최대 데미지 5% 증가",
        statPerLevel:[{"데미지":3}, {"데미지":5}]
    },
    "무아":{
        imgUrl:iconLink17,
        description:"아크 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 상시 발동으로 간주합니다.\n" +
          "최대 데미지 11% 증가",
        statPerLevel:[{"데미지":6}, {"데미지":11}]
    },
    "자연의 벗":{
        imgUrl:iconLink18,
        description:"아크 링크스킬\n마스터 레벨: 2\n" +
          "일반데미지 버프의 가동률을 감안하여 계산 편의를 위해 상시 일반데미지에 포함하였습니다.\n"+
           "최대 데미지 5%, 일반 데미지 11% 증가\n",
        statPerLevel:[
        {"데미지":3, "일반 데미지":7},
        {"데미지":5, "일반 데미지":11}
      ]
    },
    "자신감":{
        imgUrl:iconLink19,
          description:"호영 링크스킬\n마스터 레벨: 2\n" +
          "HP가 최대치인 적 공격시 데미지가 증가하는 효과이지만, " +
          "보스전에서 효과가 미미하기 때문에 일반데미지로 계산하였습니다.\n"+
          "최대 방어율 무시 10%, 일반 데미지 14% 증가",
        statPerLevel:[
        {"방어율 무시":5,"일반 데미지":9},
        {"방어율 무시":10,"일반 데미지":14}
        ]
    },
    "륀느의 축복":{
        imgUrl:iconLink20,
        description:"제로 링크스킬\n마스터 레벨: 5\n" +
          "방어율 무시 레벨당 2% 증가\n" +
          "최대 방어율 무시 10% 증가\n",
        statPerLevel:[
        {"방어율 무시":2},
        {"방어율 무시":4},
        {"방어율 무시":6},
        {"방어율 무시":8},
        {"방어율 무시":10},
        ]
    },
    "판단":{
        imgUrl:iconLink21,
        description:"키네시스 링크스킬\n마스터 레벨: 2\n" +
          "크리티컬 데미지 레벨당 2% 증가\n" +
          "최대 크리티컬 데미지 4% 증가\n",
        statPerLevel:[
        {"크리티컬 데미지":2},
        {"크리티컬 데미지":4},
        ]
    }
}
