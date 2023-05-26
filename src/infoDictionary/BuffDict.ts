import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";

export interface Buff{
    imgUrl?:string;
    stat:StatInfo;
}

export type BuffName = "길드의 축복" | "길드스킬 - 방어율 무시" | "길드스킬 - 보스 데미지" |
    "길드스킬 - 크리티컬 데미지" | "길드스킬 - 데미지" | "전설 영웅의 비약" | "영웅의 메아리" |
    "우르스" | "MVP 슈퍼파워" | "스텟 물약" | "유니온의 힘" | "고급 보스킬러의 물약" |
    "마약칭호/월드스텟" | "킹 오브 루타비스 칭호" | "파왕 파멸자 칭호" | "핑아일체 칭호"

export const buffDict:{[key in BuffName]:Buff} = {
    "길드의 축복":{
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "길드스킬 - 방어율 무시":{
        stat:{
            "방어율 무시":30
        }
    },
    "길드스킬 - 보스 데미지":{
        stat:{
            "보스 데미지":30
        }
    },
    "길드스킬 - 크리티컬 데미지":{
        stat:{
            "크리티컬 데미지":30
        }
    },
    "길드스킬 - 데미지":{
        stat:{
            "데미지":30,
        }
    },
    "전설 영웅의 비약":{
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "영웅의 메아리":{
        stat:{
            "공격력%":4,
            "마력%":4
        }
    },
    "우르스":{
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "MVP 슈퍼파워":{
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "스텟 물약":{
        stat:{
            "올스탯":30
        }
    },
    "유니온의 힘":{
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "고급 보스킬러의 물약":{
        stat:{
            "보스 데미지":20
        }
    },
    "마약칭호/월드스텟":{
        stat:{
            "보스 데미지":30,
            "방어율 무시":30,
            "공격력":20,
            "마력":20,
        }
    },
    "킹 오브 루타비스 칭호":{
        stat:{
            "올스탯":8,
            "공격력":3,
            "마력":3,
            "보스 데미지":5,
            "방어율 무시":5
        }
    },
    "파왕 파멸자 칭호": {
        stat: {
            "올스탯":5,
            "공격력":5,
            "마력":5,
            "방어율 무시":5,
            "HP":200
        }
    },
    "핑아일체 칭호":{
        stat:{
            "보스 데미지":10,
            "공격력":5,
            "마력":5,
            "올스탯":10
        }
    }
}
