import type {Stat, Stats} from "../util/mapleParser/mapleStat";
import iconBasic1 from "$lib/images/icon/buff/정령의 축복.png"
import iconBasic2 from "$lib/images/icon/buff/연합의 의지.png"
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
    stat:Stats;
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
        imgUrl:iconBasic1,
        description:"공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "연합의 의지":{
        imgUrl:iconBasic2,
        description:"올스탯 5, 공격력 5, 마력 5 증가",
        stat:{
            "올스탯":5,
            "공격력":5,
            "마력":5,
        }
    },
    "길드의 축복":{
        imgUrl:iconGuild1,
        description:"길드의 더 큰 축복 기준입니다 \n공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "길드스킬 - 길드의 매운 맛":{
        imgUrl:iconGuild2,
        description:"길드 패시브 스킬 \n공격력 35, 마력 35 증가",
        stat:{
            "공격력":35,
            "마력":35
        }
    },
    "길드스킬 - 방어력은 숫자일 뿐":{
        imgUrl:iconGuild3,
        description:"길드 노블 스킬 \n방어율 무시 30% 증가",
        stat:{
            "방어율 무시":30
        }
    },
    "길드스킬 - 보스 킬링 머신":{
        imgUrl:iconGuild4,
        description:"길드 노블 스킬 \n보스 공격시 데미지 30% 증가",
        stat:{
            "보스 데미지":30
        }
    },
    "길드스킬 - 크게 한방":{
        imgUrl:iconGuild5,
        description:"길드 노블 스킬 \n크리티컬 데미지 30% 증가",
        stat:{
            "크리티컬 데미지":30
        }
    },
    "길드스킬 - 길드의 이름으로":{
        imgUrl:iconGuild6,
        description:"길드 노블 스킬 \n데미지 30% 증가",
        stat:{
            "데미지":30,
        }
    },
    "전설 영웅의 비약":{
        imgUrl:iconPotion1,
        description:"연금술 명장 포션 \n 공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "스텟 비약":{
        imgUrl:iconPotion2,
        description:"연금술 포션 \n 올스탯 30 증가",
        stat:{
            "올스탯":30
        }
    },
    "익스트림 레드/블루":{
        imgUrl:iconPotion3,
        description:"몬스터파크에서 판매하는 포션 \n 30분간 공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "고급 보스킬러의 비약":{
        imgUrl:iconPotion4,
        description:"연금술 명장 포션 \n 보스 공격시 데미지 20% 증가",
        stat:{
            "보스 데미지":20
        }
    },
    "고급 관통의 비약":{
        imgUrl:iconPotion4,
        description:"연금술 명장 포션 \n 방어율 무시 20% 증가",
        stat:{
            "방어율 무시":20
        }
    },
    "우르스":{
        imgUrl:iconItem1,
        description:"우르스 뿌리기 버프 \n 공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "MVP 슈퍼파워":{
        imgUrl:iconItem2,
        description:"MVP 브론즈부터 지급되는 버프아이템 \n 공격력 30, 마력 30 증가",
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "유니온의 힘":{
        description:"유니온 상점에서 구매할 수 있는 버프아이템 \n 공격력 30, 마력 30 증가",
        imgUrl:iconItem3,
        stat:{
            "공격력":30,
            "마력":30
        }
    },
    "떡꼬치":{
        imgUrl:iconItem4,
        description:"이벤트, 보스코인상점 등에서 획득 \n 공격력 15, 마력 15, 올스탯 15 증가\nHP 1500, MP 1500 증가\n 보스 공격시 데미지 15% 증가, 방어율 무시 15% 증가",
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
        description:"이벤트로 얻을 수 있는 기간제 칭호(마약칭호)\n 다른 칭호와 중복으로 선택하지 마세요." +
          "\n공격력 15, 마력 15, 올스탯 50 증가\n보스 공격시 데미지 30% 증가, 방어율 무시 30% 증가",
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
        description:"카오스 루타비스의 모든 보스를 각각 20회 처치하면 얻을 수 있는 칭호" +
          "\n다른 칭호와 중복으로 선택하지 마세요." +
          "\n올스탯 8 ,공격력 3, 마력 3 증가 " +
          "\n보스 공격시 데미지 5% 증가, 방어율 무시 5% 증가",
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
        description:"우르스에서 S랭크로 1위를 달성하면 얻을 수 있는 7일 기간제 칭호" +
          "\n다른 칭호와 중복으로 선택하지 마세요." +
          "\n올스탯 5 ,공격력 5, 마력 5, HP 200 증가 " +
          "\n방어율 무시 5% 증가",
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
        description:"이벤트로 획득 가능한 무제한 칭호" +
          "\n다른 칭호와 중복으로 선택하지 마세요." +
          "\n공격력 5, 마력 5, 올스탯 10 증가"+
          "\n보스 공격시 데미지 10% 증가",
        stat:{
            "보스 데미지":10,
            "공격력":5,
            "마력":5,
            "올스탯":10
        }
    },
    "영웅의 메아리":{
        imgUrl:iconSkill1,
        description:"쿨타임 2시간, 지속 40분 버프스킬\n공격력 4%, 마력 4% 증가",
        stat:{
            "공격력%":4,
            "마력%":4
        }
    },
    "엔젤릭 터치":{
        description:"비숍 보스 대상 디버프 스킬\n 방어율 무시 44% 증가",
        imgUrl:iconSkill2,
        stat:{
            "방어율 무시":44
        }
    },
    "엔젤레이":{
        description:"비숍 보스 대상 디버프 5중첩\n 최종 데미지 10% 증가",
        imgUrl:iconSkill3,
        stat:{
            "최종 데미지":10
        }
    },
    "리셋스킬":{
        description:"파티원 리셋효과(소마,베메,플위)\n 자신이 리셋직업이라면 선택하지 마세요.\n 속성내성 무시 10% 증가",
        imgUrl:iconSkill4,
        stat:{
            "속성내성 무시":10
        }
    },
    "하울링":{
        description:"와일드헌터 파티 버프 스킬\n공격력 10%, 마력 10% 증가",
        imgUrl:iconSkill5,
        stat:{
            "공격력%":10,
            "마력%":10
        }
    },
}
