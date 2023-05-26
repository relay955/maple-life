import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";

export const LinkSkillDict:{[index:string]:StatInfo[]} = {
    "모험가 마법사 - 임피리컬 널리지":[
        {"데미지":3,"방어율 무시":3},
        {"데미지":3,"방어율 무시":3},
        {"데미지":6,"방어율 무시":6},
        {"데미지":6,"방어율 무시":6},
        {"데미지":9,"방어율 무시":9},
        {"데미지":9,"방어율 무시":9},
    ],
    "모험가 궁수 - 어드벤쳐러 큐리어스":[
        {"크리티컬 확률":3},
        {"크리티컬 확률":4},
        {"크리티컬 확률":6},
        {"크리티컬 확률":7},
        {"크리티컬 확률":9},
        {"크리티컬 확률":10},
    ],
    "모험가 도적 - 시프 커닝":[
        {"데미지":1.5},
        {"데미지":3},
        {"데미지":4.5},
        {"데미지":6},
        {"데미지":7.5},
        {"데미지":9},
    ],
    "모험가 해적 - 파이렛 블레스":[
        {"HP":350,"MP":350,"올스탯":20},
        {"HP":525,"MP":525,"올스탯":30},
        {"HP":700,"MP":700,"올스탯":40},
        {"HP":875,"MP":875,"올스탯":50},
        {"HP":1050,"MP":1050,"올스탯":60},
        {"HP":1225,"MP":1225,"올스탯":70},
    ],
    "시그너스 기사단 - 시그너스 블레스":[
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
    ],
    "제논 - 하이브리드 로직":[
        {"올스탯%":5},
        {"올스탯%":10},
    ],
    "데몬 슬레이어 - 데몬스 퓨리":[
        {"보스 데미지":10},
        {"보스 데미지":15}
    ],
    "데몬 어벤져 - 와일드 레이지":[
        {"데미지":5},
        {"데미지":10}
    ],
    "루미너스 - 퍼미에이트":[
        {"방어율 무시":10},
        {"방어율 무시":15}
    ],
    "메르세데스 - 엘프의 축복":[
        {"획득경험치":10},
        {"획득경험치":15}
    ],
    "팬텀 - 데들리 인스팅트":[
        {"크리티컬 확률":10},
        {"크리티컬 확률":15},
    ],
    "카이저 - 아이언 윌":[
        {"HP%":10},
        {"HP%":15}
    ],
    "카인 - 프라이어 프리퍼레이션":[
        {"데미지":4.5},
        {"데미지":8.5},
    ],
    "카데나 - 인텐시브 인썰트":[
        {"데미지":3, "상태이상 추가데미지":3},
        {"데미지":6, "상태이상 추가데미지":6},
    ],
    "엔젤릭 버스터 - 소울 컨트랙트":[
        {"데미지":30},
        {"데미지":45}
    ],
    "아델 - 노블레스":[
        {"데미지":3},
        {"데미지":6}
    ],
    "일리움 - 전투의 흐름":[
        {"데미지":6},
        {"데미지":12},
    ],
    "칼리 - 이네이트 기프트":[
        {"데미지":3},
        {"데미지":5}
    ],
    "아크 - 무아":[
        {"데미지":5},
        {"데미지":10}
    ],
    "라라 - 자연의 벗":[
        {"데미지":3, "일반 데미지":7},
        {"데미지":5, "일반 데미지":11}
    ],
    "호영 - 자신감":[
        {"방어율 무시":5,"일반 데미지":9},
        {"방어율 무시":10,"일반 데미지":14}
    ],
    "제로 - 륀느의 축복":[
        {"방어율 무시":2},
        {"방어율 무시":4},
        {"방어율 무시":6},
        {"방어율 무시":8},
        {"방어율 무시":10},
    ],
    "키네시스 - 판단":[
        {"크리티컬 데미지":2},
        {"크리티컬 데미지":4},
    ]
}
