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
import iconLink22 from "$lib/images/icon/linkskill/소울 컨트랙트.png"
import type {Skill} from "../SkillDict";

export const linkSkillDict:{[key in string]:Skill} = {
    "임피리컬 널리지":{
        description:"모험가 마법사 링크스킬\n"+
          "계산 편의를 위해 상시적용으로 간주합니다.\n"+
          "마스터 레벨: 6\n" +
          "2레벨 당 데미지 3%, 방어율 무시 3% 증가\n 최대 데미지 9%, 방어율 무시 9% 증가",
        imgUrl:iconLink1,
        maxLevel:6,
        passiveStat:(spec)=>({
          "데미지":3*(Math.floor((spec.skills["임피리컬 널리지"].level+1)/2)),
          "방어율무시":3*(Math.floor((spec.skills["임피리컬 널리지"].level+1)/2))
        })
    },
    "어드벤쳐러 큐리어스":{
        imgUrl:iconLink2,
        description:"모험가 궁수 링크스킬\n마스터 레벨: 6\n" +
          "크리티컬 확률 3,4,6,7,9,10% 증가\n 최대 크리티컬 확률 10% 증가",
        maxLevel:6,
        passiveStat:(spec)=>({
          "크리티컬 확률":1+Math.ceil(spec.skills["어드벤쳐러 큐리어스"].level*1.5)
        })
    },
    "시프 커닝":{
        imgUrl:iconLink3,
        description:"모험가 도적 링크스킬\n마스터 레벨: 6\n" +
          "계산 편의를 위해 가동률을 고려하여 데미지가 레벨당 1.5% 증가하는것으로 가정합니다.\n"+
           "최대 데미지 9% 증가\n",
        maxLevel:6,
        passiveStat:(spec)=>({"데미지":spec.skills["시프 커닝"].level*1.5})
    },
    "파이렛 블레스":{
      imgUrl:iconLink4,
      description:"모험가 해적 링크스킬\n마스터 레벨: 6\n" +
        "HP,MP 175+레벨*175만큼 증가, 올스탯 10+레벨*10만큼 증가\n" +
        " 최대 HP 1225, MP 1225, 올스탯 70 증가",
      maxLevel:6,
      passiveStat:(spec)=>({
          "HP":175+spec.skills["파이렛 블레스"].level*175,
          "MP":175+spec.skills["파이렛 블레스"].level*175,
          "올스탯":10+spec.skills["파이렛 블레스"].level*10
      })
    },
    "시그너스 블레스":{
        imgUrl:iconLink5,
        description:"시그너스 기사단 링크스킬\n마스터 레벨: 10\n" +
          "공격력, 마력 5+레벨*2만큼 증가\n 최대 공격력 25, 마력 25 증가",
        maxLevel:10,
        passiveStat:(spec)=>({
            "공격력":5+spec.skills["시그너스 블레스"].level*2,
            "마력":5+spec.skills["시그너스 블레스"].level*2
        })
    },
    "하이브리드 로직":{
        imgUrl:iconLink6,
        description:"제논 링크스킬\n마스터 레벨: 2\n" +
          "올스탯 5%, 10% 증가\n 최대 올스탯 10% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"올스탯%":5*(spec.skills["하이브리드 로직"].level)})
    },
    "데몬스 퓨리":{
        imgUrl:iconLink7,
        description:"데몬슬레이어 링크스킬\n마스터 레벨: 2\n" +
          "보스 공격시 데미지 10%, 15% 증가\n 최대 보스 공격시 데미지 15% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"보스 데미지":5+(spec.skills["데몬스 퓨리"].level*5)}),
    },
    "와일드 레이지":{
        description:"데몬어벤져 링크스킬\n마스터 레벨: 2\n" +
          "데미지 5%, 10% 증가\n 최대 데미지 10% 증가",
        imgUrl:iconLink8,
        maxLevel:2,
        passiveStat:(spec)=>({"데미지":spec.skills["와일드 레이지"].level*5}),
    },
    "퍼미에이트":{
        imgUrl:iconLink9,
        description:"루미너스 링크스킬\n마스터 레벨: 2\n" +
          "방어율 무시 10%, 15% 증가\n 최대 방어율 무시 15% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"방어율 무시":5+(spec.skills["퍼미에이트"].level*5)}),
    },
    "데들리 인스팅트":{
        imgUrl:iconLink10,
        description:"팬텀 링크스킬\n마스터 레벨: 2\n" +
          "크리티컬 확률 10%, 15% 증가\n 최대 크리티컬 확률 15% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"크리티컬 확률":5+(spec.skills["데들리 인스팅트"].level*5)}),
    },
    "아이언 윌":{
        imgUrl:iconLink11,
        description:"카이저 링크스킬\n마스터 레벨: 2\n" +
          "HP 10%, 15% 증가\n 최대 HP 15% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"HP%":5+(spec.skills["아이언 윌"].level*5)}),
    },
    "프라이어 프리퍼레이션":{
        imgUrl:iconLink12,
        description:"카인 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 가동률을 고려하여 데미지가 레벨당 4.5%, 8.5% 증가하는것으로 가정합니다.\n"+
          "최대 데미지 8.5% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"데미지":0.5+(spec.skills["프라이어 프리퍼레이션"].level*4)}),
    },
    "인텐시브 인썰트":{
        imgUrl:iconLink13,
        description:"카데나 링크스킬\n마스터 레벨: 2\n" +
          "자신보다 레벨 낮은 몬스터에게 데미지 3%, 6% 증가\n" +
          "계산 편의를 위해 데미지로 간주합니다.\n" +
          "상태이상에 걸린 몬스터 공격 시 데미지 3%, 6% 증가\n" +
          "최대 데미지 12% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({
            "데미지":spec.skills["인텐시브 인썰트"].level*3,
            "상태이상 추가데미지":spec.skills["인텐시브 인썰트"].level*3,
        }),
    },
    "노블레스":{
        imgUrl:iconLink14,
        description:"아델 링크스킬\n마스터 레벨: 2\n" +
          "파티원이 없음을 가정합니다.\n" +
          "최대 데미지 2%, 보스 공격시 데미지 4% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({
            "데미지":spec.skills["노블레스"].level,
            "보스 데미지":spec.skills["노블레스"].level*2
        }),
    },
    "전투의 흐름":{
        imgUrl:iconLink15,
        description:"일리움 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 상시 발동으로 간주합니다.\n" +
          "최대 데미지 12% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"데미지":spec.skills["전투의 흐름"].level*6}),
    },
    "이네이트 기프트":{
        imgUrl:iconLink16,
        description:"칼리 링크스킬\n마스터 레벨: 2\n" +
          "최대 데미지 5% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"데미지":1+spec.skills["이네이트 기프트"].level*2}),
    },
    "무아":{
        imgUrl:iconLink17,
        description:"아크 링크스킬\n마스터 레벨: 2\n" +
          "계산 편의를 위해 상시 발동으로 간주합니다.\n" +
          "최대 데미지 11% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({"데미지":1+spec.skills["무아"].level*5}),
    },
    "자연의 벗":{
        imgUrl:iconLink18,
        description:"아크 링크스킬\n마스터 레벨: 2\n" +
          "일반데미지 버프의 가동률을 감안하여 계산 편의를 위해 상시 일반데미지에 포함하였습니다.\n"+
           "최대 데미지 5%, 일반 데미지 11% 증가\n",
        maxLevel:2,
        passiveStat:(spec)=>({
            "데미지":1+spec.skills["자연의 벗"].level*2,
            "일반 데미지":3+spec.skills["자연의 벗"].level*4
        }),
    },
    "자신감":{
        imgUrl:iconLink19,
        description:"호영 링크스킬\n마스터 레벨: 2\n" +
          "HP가 최대치인 적 공격시 데미지가 증가하는 효과이지만, " +
          "보스전에서 효과가 미미하기 때문에 일반데미지로 계산하였습니다.\n"+
          "최대 방어율 무시 10%, 일반 데미지 14% 증가",
        maxLevel:2,
        passiveStat:(spec)=>({
            "방어율 무시":spec.skills["자신감"].level*5,
            "일반 데미지":4+spec.skills["자신감"].level*5
        }),
    },
    "륀느의 축복":{
        imgUrl:iconLink20,
        description:"제로 링크스킬\n마스터 레벨: 5\n" +
          "방어율 무시 레벨당 2% 증가\n" +
          "최대 방어율 무시 10% 증가\n",
          maxLevel:5,
        passiveStat:(spec)=>({"방어율 무시":spec.skills["륀느의 축복"].level*2}),
    },
    "판단":{
        imgUrl:iconLink21,
        description:"키네시스 링크스킬\n마스터 레벨: 2\n" +
          "크리티컬 데미지 레벨당 2% 증가\n" +
          "최대 크리티컬 데미지 4% 증가\n",
        maxLevel:2,
        passiveStat:(spec)=>({"크리티컬 데미지":spec.skills["판단"].level*2}),
    },
    "소울 컨트랙트":{
        imgUrl:iconLink22,
        description:"엔젤릭 버스터 링크스킬\n마스터 레벨: 2\n" +
          "발동시 10초간 데미지 레벨당 30% 증가, 쿨타임 90초\n" +
          "최대 10초간 데미지 45% 증가, 버프지속시간 증가 효과 적용\n",
        maxLevel:2,
        actionDelay:800,
        cooldown:90000,
        buffStat:(spec)=>({"데미지":15+spec.skills["소울 컨트랙트"].level*15}),
        buffDuration:(spec)=>(10000*(1+((spec.statTotal["버프지속시간"] ?? 0)/100)))
    },

}
