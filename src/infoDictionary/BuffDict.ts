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
import iconItem1 from "$lib/images/icon/buff/우르스.png"
import iconItem2 from "$lib/images/icon/buff/MVP 슈퍼파워.png"
import iconItem3 from "$lib/images/icon/buff/유니온의 힘.png"
import iconItem4 from "$lib/images/icon/buff/떡꼬치.png"
import iconEquip1 from "$lib/images/icon/buff/이벤트 칭호.png"
import iconEquip2 from "$lib/images/icon/buff/킹오브루타비스 칭호.png"
import iconEquip3 from "$lib/images/icon/buff/파왕파멸자 칭호.png"
import iconEquip4 from "$lib/images/icon/buff/핑아일체 칭호.png"
import iconSkill1 from "$lib/images/icon/buff/영웅의 메아리.png"
import iconSkill2 from "$lib/images/icon/buff/엔젤릭 터치.png"
import iconSkill3 from "$lib/images/icon/buff/엔젤레이.png"
import iconSkill4 from "$lib/images/icon/buff/엘리멘탈 리셋.png"
import iconSkill5 from "$lib/images/icon/buff/하울링.png"

export interface Buff{
    imgUrl:string;
    stat:StatInfo;
    description?:string;
}

export type BuffName = "정령의 축복" | "연합의 의지" | "길드의 축복" |"길드스킬 - 길드의 매운 맛"|
    "길드스킬 - 방어력은 숫자일 뿐" | "길드스킬 - 보스 킬링 머신" |
    "길드스킬 - 크게 한방" | "길드스킬 - 길드의 이름으로" | "전설 영웅의 비약" | "영웅의 메아리" |
    "우르스" | "MVP 슈퍼파워" | "스텟 비약" | "유니온의 힘" | "고급 보스킬러의 비약" | "고급 관통의 비약" |
    "이벤트 칭호" | "킹 오브 루타비스 칭호" | "파왕 파멸자 칭호" | "핑아일체 칭호" |
    "엔젤릭 터치" | "엔젤레이" | "리셋스킬" | "익스트림 레드/블루" | "하울링" | "떡꼬치"

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
        imgUrl:iconPotion1,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "스텟 비약":{
        imgUrl:iconPotion2,
        stat:{
            "올스탯":30
        }
    },
    "익스트림 레드/블루":{
        imgUrl:iconPotion3,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "고급 보스킬러의 비약":{
        imgUrl:iconPotion4,
        stat:{
            "보스 데미지":20
        }
    },
    "고급 관통의 비약":{
        imgUrl:iconPotion4,
        stat:{
            "방어율 무시":20
        }
    },
    "우르스":{
        imgUrl:iconItem1,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "MVP 슈퍼파워":{
        imgUrl:iconItem2,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "유니온의 힘":{
        imgUrl:iconItem3,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "떡꼬치":{
        imgUrl:iconItem4,
        stat:{
            "올스탯":15,
            "공격력":15,
            "마력":15,
            "HP":1500,
            "MP":1500,
            "보스 데미지":15,
            "방어율 무시":15
        }
    },
    "이벤트 칭호":{
        imgUrl:iconEquip1,
        stat:{
            "보스 데미지":30,
            "방어율 무시":30,
            "공격력":20,
            "마력":20,
            "올스탯":50
        }
    },
    "킹 오브 루타비스 칭호":{
        imgUrl:iconEquip2,
        stat:{
            "올스탯":8,
            "공격력":3,
            "마력":3,
            "보스 데미지":5,
            "방어율 무시":5
        }
    },
    "파왕 파멸자 칭호": {
        imgUrl:iconEquip3,
        stat: {
            "올스탯":5,
            "공격력":5,
            "마력":5,
            "방어율 무시":5,
            "HP":200
        }
    },
    "핑아일체 칭호":{
        imgUrl:iconEquip4,
        stat:{
            "보스 데미지":10,
            "공격력":5,
            "마력":5,
            "올스탯":10
        }
    },
    "영웅의 메아리":{
        imgUrl:iconSkill1,
        stat:{
            "공격력%":4,
            "마력%":4
        }
    },
    "엔젤릭 터치":{
        description:"비숍 보스 대상 디버프 스킬",
        imgUrl:iconSkill2,
        stat:{
            "방어율 무시":44
        }
    },
    "엔젤레이":{
        description:"비숍 보스 대상 디버프 5중첩",
        imgUrl:iconSkill3,
        stat:{
            "최종 데미지":10
        }
    },
    "리셋스킬":{
        description:"파티원 리셋효과(소마,베메,플위), 자신이 리셋직업이라면 선택하지 마세요.",
        imgUrl:iconSkill4,
        stat:{
            "속성내성 무시":10
        }
    },
    "하울링":{
        description:"와일드헌터 파티 버프 스킬",
        imgUrl:iconSkill5,
        stat:{
            "공격력%":10,
            "마력%":10
        }
    },
}
