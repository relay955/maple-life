import {Job} from "../JobDict";
import {CharacterSpecSummary} from "../../util/mapleParser/mapleStat";

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
      damage:[{damageRate:2.1,dealtTime:0}]
    },
    "마법 화살":{
      damage:[{damageRate:2.6,dealtTime:0}]
    },
    "플레시 미라주":{
      cooldown:20000,
      startupCooldown:30000,
      damage:[{damageRate:86.4, dealtTime:0}],
    },
    "피닉스":{
      cooldown:36000,
      damage:[{damageRate:3.9, dealtTime:1000, dealtCount:360}],
    },
    "모탈 블로우":{
      buffStat:{"데미지":35},
      buffDuration:5000,
      startupCooldown:3000,
      cooldown:15000,
    },
    "애로우 플래터":{
      actionDelay:600,//임의
      cooldown:60000,
      damage:[{damageRate:2.3, dealtTime:230, dealtCount:260}],
      damageBonusStat:{"데미지":30}
    },
    "폭풍의 시":{
      actionDelay:120,
      damage:[{damageRate:5.25, dealtTime:0}],
      damageBonusStat:{"보스 데미지":10,"데미지":30},
      autoActiveSkill:{
        "파이널 어택":0.7,
        "마법 화살":0.6
      }
    },
    "프리퍼레이션":{
      actionDelay:800,//임의
      cooldown:120000,
      buffStat:{"공격력":50,"보스 데미지":20},
      buffDuration:40000,
    },
    "에픽 어드벤쳐":{
      actionDelay:800,
      cooldown:120000,
      buffDuration:60000,
      buffStat:{"데미지":10}
    },
    "퀴버 풀버스트":{
      actionDelay:800,//임의
      cooldown:120000,
      damage:[{damageRate:135, dealtTime:2000,dealtCount:18}],
      buffStat:{"데미지":20}
    },
    "잔영의 시":{
      actionDelay:800,//임의,
      cooldown:12000,
      damage:[
        {damageRate:12,dealtTime:250,dealtCount:30},
        {damageRate:12,dealtTime:2000,dealtCount:10},
      ]
    },
    "실루엣 미라주":{
      cooldown:7500,
      damage:[
        {damageRate:12,dealtTime:120,dealtCount:5},
      ],
    },
    "애로우 레인":{
      actionDelay:800,//임의
      cooldown:120000,
      damage:[
        {damageRate:49,dealtTime:0,dealtCount:1},
      ],
      autoActiveSkill:{
        "마법 화살":0.6
      },
      buffStat:{"데미지":15},
    },
    "이볼브":{
      actionDelay:800,
      cooldown:120000,
      damage:[
        {damageRate:4.5*7,dealtTime:3000,dealtCount:15},
      ],
    },
    "가이디드 애로우":{
      cooldown:120000,
      damage:[{damageRate:4,dealtTime:330,dealtCount:33}],
      autoActiveSkill:{
        "마법 화살":0.6
      }
    },
    "크리티컬 리인포스":{
      actionDelay:800,
      cooldown:120000,
      buffStat:(statDetails:CharacterSpecSummary, skillLevel:number)=>{
        statDetails.
      },
      buffDuration:30
    },
    "메이플월드 여신의 축복":{
      actionDelay:800,
      cooldown:180000,
      maxStack:2,
      buffStat:{},
      buffDuration:60000
    }
  },
  skillPriority:[
    "가이디드 애로우","실루엣 미라주","피닉스","모탈블로우",
    "프리퍼레이션","에픽 어드벤쳐","크리티컬 리인포스","메이플월드 여신의 축복",
    "애로우 레인","퀴버 풀버스트","잔영의 시","폭풍의 시"
  ],
  matrixSkill:{
    "폭풍의 시 강화":{
      targetSkillName:"폭풍의 시",
      damageBonusStatPerLevel:{"최종 데미지":0.02},
      buffBonusStatPerLevel:{"공격력%":0.5},
      upgradeBonus:{
        40:{"방어율 무시":20}
      },
      durationBonusPerLevel:0,
      dealtCountBonusPerLevel:0,
    }
  },
  unionStat:[{"고정DEX":10}, {"고정DEX":20}, {"고정DEX":40}, {"고정DEX":80}, {"고정DEX":100}],
}
