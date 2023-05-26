import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";

export interface Buff{
    imgUrl?:string;
    stat:StatInfo;
}

export const buffDict:{[index:string]:Buff} = {
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
    }
}
