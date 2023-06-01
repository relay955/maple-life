import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";
import iconLink1 from "$lib/images/icon/buff/임피리컬 널리지.png"
import iconLink2 from "$lib/images/icon/buff/어드벤쳐러 큐리어스.png"
import iconLink3 from "$lib/images/icon/buff/시프 커닝.png"
import iconLink4 from "$lib/images/icon/buff/파이렛 블레스.png"
import iconLink5 from "$lib/images/icon/buff/시그너스 블레스.png"
import iconLink6 from "$lib/images/icon/buff/하이브리드 로직.png"
import iconLink7 from "$lib/images/icon/buff/데몬스 퓨리.png"
import iconLink8 from "$lib/images/icon/buff/와일드 레이지.png"
import iconLink9 from "$lib/images/icon/buff/퍼미에이트.png"
import iconLink10 from "$lib/images/icon/buff/데들리 인스팅트.png"
import iconLink11 from "$lib/images/icon/buff/아이언 윌.png"
import iconLink12 from "$lib/images/icon/buff/프라이어 프리퍼레이션.png"
import iconLink13 from "$lib/images/icon/buff/인텐시브 인썰트.png"
import iconLink14 from "$lib/images/icon/buff/노블레스.png"
import iconLink15 from "$lib/images/icon/buff/전투의 흐름.png"
import iconLink16 from "$lib/images/icon/buff/이네이트 기프트.png"
import iconLink17 from "$lib/images/icon/buff/무아.png"
import iconLink18 from "$lib/images/icon/buff/자연의 벗.png"
import iconLink19 from "$lib/images/icon/buff/자신감.png"
import iconLink20 from "$lib/images/icon/buff/륀느의 축복.png"
import iconLink21 from "$lib/images/icon/buff/판단.png"


export interface LinkSkill{
    imgUrl:string;
    statPerLevel:StatInfo[];
    description?:string;
}

export type LinkSkillName = "모험가 마법사 - 임피리컬 널리지" | "모험가 궁수 - 어드벤쳐러 큐리어스" |
    "모험가 도적 - 시프 커닝" | "모험가 해적 - 파이렛 블레스" | "시그너스 기사단 - 시그너스 블레스" |
    "제논 - 하이브리드 로직" | "데몬 슬레이어 - 데몬스 퓨리" | "데몬 어벤져 - 와일드 레이지" |
    "루미너스 - 퍼미에이트" | "팬텀 - 데들리 인스팅트" |
    "카이저 - 아이언 윌" | "카인 - 프라이어 프리퍼레이션" | "카데나 - 인텐시브 인썰트" |
    "아델 - 노블레스" | "일리움 - 전투의 흐름" |
    "칼리 - 이네이트 기프트" | "아크 - 무아" | "라라 - 자연의 벗" | "호영 - 자신감" |
    "제로 - 륀느의 축복" | "키네시스 - 판단"

export const linkSkillDict:{[key in LinkSkillName]:LinkSkill} = {
    "모험가 마법사 - 임피리컬 널리지":{
        imgUrl:iconLink1,
        statPerLevel:[
        {"데미지":3,"방어율 무시":3},
        {"데미지":3,"방어율 무시":3},
        {"데미지":6,"방어율 무시":6},
        {"데미지":6,"방어율 무시":6},
        {"데미지":9,"방어율 무시":9},
        {"데미지":9,"방어율 무시":9},
    ]},
    "모험가 궁수 - 어드벤쳐러 큐리어스":{
        imgUrl:iconLink2,
        statPerLevel:[
        {"크리티컬 확률":3},
        {"크리티컬 확률":4},
        {"크리티컬 확률":6},
        {"크리티컬 확률":7},
        {"크리티컬 확률":9},
        {"크리티컬 확률":10},
    ]},
    "모험가 도적 - 시프 커닝":{
        imgUrl:iconLink3,
        statPerLevel:[
        {"데미지":1.5},
        {"데미지":3},
        {"데미지":4.5},
        {"데미지":6},
        {"데미지":7.5},
        {"데미지":9},
        ]
    },
    "모험가 해적 - 파이렛 블레스":{
      imgUrl:iconLink4,
        statPerLevel:[
        {"HP":350,"MP":350,"올스탯":20},
        {"HP":525,"MP":525,"올스탯":30},
        {"HP":700,"MP":700,"올스탯":40},
        {"HP":875,"MP":875,"올스탯":50},
        {"HP":1050,"MP":1050,"올스탯":60},
        {"HP":1225,"MP":1225,"올스탯":70},
      ]
    },
    "시그너스 기사단 - 시그너스 블레스":{
        imgUrl:iconLink5,
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
    "제논 - 하이브리드 로직":{
        imgUrl:iconLink6,
        statPerLevel:[{"올스탯%":5}, {"올스탯%":10}]
    },
    "데몬 슬레이어 - 데몬스 퓨리":{
        imgUrl:iconLink7,
        statPerLevel:[{"보스 데미지":10}, {"보스 데미지":15}]
    },
    "데몬 어벤져 - 와일드 레이지":{
        imgUrl:iconLink8,
        statPerLevel:[{"데미지":5}, {"데미지":10}]
    },
    "루미너스 - 퍼미에이트":{
        imgUrl:iconLink9,
        statPerLevel:[{"방어율 무시":10}, {"방어율 무시":15}]
    },
    "팬텀 - 데들리 인스팅트":{
        imgUrl:iconLink10,
        statPerLevel:[{"크리티컬 확률":10}, {"크리티컬 확률":15}]
    },
    "카이저 - 아이언 윌":{
        imgUrl:iconLink11,
        statPerLevel:[{"HP%":10}, {"HP%":15}]
    },
    "카인 - 프라이어 프리퍼레이션":{
        imgUrl:iconLink12,
        statPerLevel:[{"데미지":4.5},{"데미지":8.5}]
    },
    "카데나 - 인텐시브 인썰트":{
        imgUrl:iconLink13,
        statPerLevel:[
            {"데미지":3, "상태이상 추가데미지":3},
            {"데미지":6, "상태이상 추가데미지":6},
        ]
    },
    "아델 - 노블레스":{
        imgUrl:iconLink14,
        statPerLevel:[{"데미지":3}, {"데미지":6}]
    },
    "일리움 - 전투의 흐름":{
        imgUrl:iconLink15,
        statPerLevel:[{"데미지":6}, {"데미지":12}]
    },
    "칼리 - 이네이트 기프트":{
        imgUrl:iconLink16,
        statPerLevel:[{"데미지":3}, {"데미지":5}]
    },
    "아크 - 무아":{
        imgUrl:iconLink17,
        statPerLevel:[{"데미지":6}, {"데미지":11}]
    },
    "라라 - 자연의 벗":{
        imgUrl:iconLink18,
        description:"일반데미지 버프의 가동률을 감안하여 계산 편의를 위해 일반데미지에 포함하였습니다.",
        statPerLevel:[
        {"데미지":3, "일반 데미지":7},
        {"데미지":5, "일반 데미지":11}
      ]
    },
    "호영 - 자신감":{
        imgUrl:iconLink19,
        description:"호영의 링크스킬은 HP가 최대치인 적 공격시 데미지가 증가하는 효과이지만, 보스전에서 효과가 미미하기 때문에 일반데미지로 계산하였습니다.",
        statPerLevel:[
        {"방어율 무시":5,"일반 데미지":9},
        {"방어율 무시":10,"일반 데미지":14}
        ]
    },
    "제로 - 륀느의 축복":{
        imgUrl:iconLink20,
        statPerLevel:[
        {"방어율 무시":2},
        {"방어율 무시":4},
        {"방어율 무시":6},
        {"방어율 무시":8},
        {"방어율 무시":10},
        ]
    },
    "키네시스 - 판단":{
        imgUrl:iconLink21,
        statPerLevel:[
        {"크리티컬 데미지":2},
        {"크리티컬 데미지":4},
        ]
    }
}
