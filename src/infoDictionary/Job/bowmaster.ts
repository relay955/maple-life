import type {Job} from "../JobDict";
import type {
  CharacterSpecSummary,
  Stats
} from "../../util/mapleParser/mapleStat";

export const bowmaster:Job = {
  mainStat:"DEX",
  subStat:"STR",
  atkType:"공격력",
  passiveStats:{
    "무기 상수":1.3,
    "공격속도":3,
    "숙련도":0.85,
    "DEX":130,
    "STR":30,
    "공격력":150,
    "공격력%":25,
    "최종 데미지":37.8,
    "방어율 무시":55,
    "크리티컬 확률":69,
    "크리티컬 데미지":31,
    "이동속도":130,
    "점프력":100,
  },
  skills:{
    "파이널 어택":{
      isDefaultSkill:true,
      damage:(spec)=>[{damageRate:2.1*(1+(spec.skills["파이널 어택 강화"]?.level ?? 0)*0.02),dealtTime:0}]
    },
    "마법 화살":{
      isDefaultSkill:true,
      damage:(spec)=>[{damageRate:2.6*(1+(spec.skills["마법 화살 강화"]?.level ?? 0)*0.02),dealtTime:0}]
    },
    "플레시 미라주":{
      isDefaultSkill:true,
      cooldown:20000,
      startupCooldown:30000,
      damage:(spec)=>[{damageRate:4.2*4*5*(1+(spec.skills["애로우 플래터/플레시 미라주 강화"]?.level ?? 0)*0.02), dealtTime:0}],
    },
    "피닉스":{
      isDefaultSkill:true,
      startupCooldown:40000,
      cooldown:360000,
      damage:(spec)=>[{damageRate:3.9*(1+(spec.skills["피닉스 강화"]?.level ?? 0)*0.03), dealtTime:1000, dealtCount:360}],
    },
    "모탈 블로우":{
      isDefaultSkill:true,
      startupCooldown:3000,
      cooldown:15000,
      buffStat:()=>({"데미지":35}),
      buffDuration:()=>5000,
    },
    "애로우 플래터":{
      isDefaultSkill:true,
      actionDelay:600,//임의
      cooldown:60000,
      damage:(spec)=>[{damageRate:2.3*(1+(spec.skills["애로우 플래터/플레시 미라주 강화"]?.level ?? 0)*0.02), dealtTime:230, dealtCount:260, damageBonusStat:{"데미지":30}}],
    },
    "폭풍의 시":{
      isDefaultSkill:true,
      actionDelay:120,
      damage:(spec)=>[{damageRate:2.625*2*(1+(spec.skills["폭풍의 시 강화"]?.level ?? 0)*0.02), dealtTime:0, damageBonusStat:{"보스 데미지":10,"데미지":30}}],
      autoActiveSkill:{
        "파이널 어택":0.7,
        "마법 화살":0.6
      }
    },
    "프리퍼레이션":{
      isDefaultSkill:true,
      actionDelay:800,//임의
      cooldown:120000,
      buffStat:()=>({"공격력":50,"보스 데미지":20}),
      buffDuration:()=>40000,
    },

    "퀴버 풀버스트":{
      actionDelay:800,//임의
      cooldown:120000,
      damage:(spec)=>[{damageRate:(2.5+spec.skills["퀴버 풀버스트"]!.level*0.1)*9*6, dealtTime:2000,dealtCount:18}],
      buffStat:(spec) => ({"공격력%": 5 + Math.floor(spec.skills["퀴버 풀버스트"]!.level * 0.5)}),
      buffDuration:()=>40000
    },
    "잔영의 시":{
      actionDelay:800,//임의,
      cooldown:120000,
      damage:(spec)=>[
        {damageRate:(4+spec.skills["잔영의 시"]!.level*0.16)*3,dealtTime:250,dealtCount:120},
        {damageRate:(4+spec.skills["잔영의 시"]!.level*0.16)*3,dealtTime:2000,dealtCount:10},
      ]
    },
    "실루엣 미라주":{
      cooldown:7500,
      damage:(spec)=>[
        {damageRate:(4+spec.skills["실루엣 미라주"]!.level*0.16)*3,dealtTime:120,dealtCount:5},
      ],
    },
    "애로우 레인":{
      actionDelay:800,//임의
      cooldown:120000,
      damage:(spec)=>[
        {damageRate:(7+spec.skills["애로우 레인"]!.level*0.28)*7*4,dealtTime:8000,dealtCount:5+Math.floor(spec.skills["애로우 레인"]!.level/8)}
      ],
      autoActiveSkill:{
        "마법 화살":1
      },
      buffStat:()=>({"데미지":15}),
      buffDuration:(spec)=>40000+spec.skills["애로우 레인"].level*1000
    },

  },
  skillPriority:[
    "가이디드 애로우","실루엣 미라주","피닉스","모탈 블로우","플레시 미라주",
    "이볼브","프리퍼레이션","에픽 어드벤쳐",
    "크리티컬 리인포스","메이플월드 여신의 축복", "소울 컨트랙트",
    "애로우 레인","퀴버 풀버스트","잔영의 시","애로우 플래터","폭풍의 시"
  ],
  vMatrixSkillType:{
    "폭풍의 시 강화":"enhance",
    "퀴버 카트리지 강화":"enhance",
    "애로우 플래터/플레시 미라주 강화":"enhance",
    "파이널 어택 : 활 강화":"enhance",
    "피닉스 강화":"enhance",
    "애로우 레인":"skill",
    "퀴버 풀버스트":"skill",
    "잔영의 시":"skill",
    "이볼브":"skill",
    "실루엣 미라주":"skill",
    "가이디드 애로우":"skill",
  },
  unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}],
  damagePeriod:120000,
}
