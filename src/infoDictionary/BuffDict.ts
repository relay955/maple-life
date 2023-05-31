import type {Stat, StatInfo} from "../util/mapleParser/mapleStat";
import iconGuild1 from "$lib/images/icon/buff/길드의 축복.png"
import iconGuild2 from "$lib/images/icon/buff/길드의 매운 맛.png"
import iconGuild3 from "$lib/images/icon/buff/방어력은 숫자일 뿐.png"
import iconGuild4 from "$lib/images/icon/buff/보스 킬링 머신.png"
import iconGuild5 from "$lib/images/icon/buff/크게 한방.png"
import iconGuild6 from "$lib/images/icon/buff/길드의 이름으로.png"
import iconPotion1 from "$lib/images/icon/buff/전설 영웅의 비약.png"
import iconPotion2 from "$lib/images/icon/buff/스텟 비약.png"
import iconPotion3 from "$lib/images/icon/buff/익스트림레드블루.png"
import iconPotion4 from "$lib/images/icon/buff/고급 보스킬러의 비약.png"

export interface Buff{
    imgUrl:string;
    stat:StatInfo;
}

export type BuffName = "정령의 축복" | "연합의 의지" | "길드의 축복" |"길드스킬 - 길드의 매운 맛"|
    "길드스킬 - 방어력은 숫자일 뿐" | "길드스킬 - 보스 킬링 머신" |
    "길드스킬 - 크게 한방" | "길드스킬 - 길드의 이름으로" | "전설 영웅의 비약" | "영웅의 메아리" |
    "우르스" | "MVP 슈퍼파워" | "스텟 비약" | "유니온의 힘" | "고급 보스킬러의 물약" |
    "마약칭호/월드스텟" | "킹 오브 루타비스 칭호" | "파왕 파멸자 칭호" | "핑아일체 칭호" |
    "비숍 - 방어율 무시" | "리셋스킬" | "익스트림 레드/블루"

export const buffDict:{[key in BuffName]:Buff} = {
    "정령의 축복":{
        imgUrl:iconGuild1,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "연합의 의지":{
        imgUrl:iconGuild1,
        stat:{
            "올스탯":5,
            "공격력":5,
            "마력":5,
        }
    },
    "길드의 축복":{
        imgUrl:iconGuild1,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "길드스킬 - 길드의 매운 맛":{
        imgUrl:iconGuild2,
        stat:{
            "공격력":35,
            "마력":35
        }
    },
    "길드스킬 - 방어력은 숫자일 뿐":{
        imgUrl:iconGuild3,
        stat:{
            "방어율 무시":30
        }
    },
    "길드스킬 - 보스 킬링 머신":{
        imgUrl:iconGuild4,
        stat:{
            "보스 데미지":30
        }
    },
    "길드스킬 - 크게 한방":{
        imgUrl:iconGuild5,
        stat:{
            "크리티컬 데미지":30
        }
    },
    "길드스킬 - 길드의 이름으로":{
        imgUrl:iconGuild6,
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
    "익스트림 레드/블루":{
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
    "스텟 비약":{
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
    },
    "비숍 - 방어율 무시":{
        stat:{
            "방어율 무시":44
        }
    },
    "리셋스킬":{
        stat:{
            "속성내성 무시":10
        }
    }
}
