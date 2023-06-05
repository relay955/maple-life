import type { Skill } from "../SkillDict";

export const vMaxtrixCommonSkillDict:{[key in string]:Skill} = {
    "이볼브":{
      actionDelay:800,
      cooldown:120000,
      damage:(spec)=>[{damageRate:(4.5+spec.skills["이볼브"]!.level*0.15)*7,dealtTime:4000,dealtCount:10},],
    },
    "가이디드 애로우":{
      cooldown:120000,
      damage:(spec)=>[{damageRate:4+spec.skills["가이디드 애로우"]!.level*0.16,dealtTime:330,dealtCount:360}],
      autoActiveSkill:{
        "마법 화살":0.6
      }
    },
    "크리티컬 리인포스":{
      actionDelay:800,
      cooldown:120000,
      buffStat:(spec)=> ({
        "크리티컬 데미지": (spec.statTotal["크리티컬 확률"] ?? 0) * (0.20 + spec.skills["크리티컬 리인포스"]!.level * 0.01),
      }),
      buffDuration:()=>30000
    },
    "메이플월드 여신의 축복":{
      actionDelay:800,
      cooldown:120000,
      buffStat:(spec)=> ({
        "DEX": (spec.statTotal["APDEX"] ?? 0) * 0.15 * (1 + spec.skills["메이플월드 여신의 축복"]!.level * 0.1),
        "데미지": 5 + Math.floor(spec.skills["메이플월드 여신의 축복"]!.level * 0.5),
      }),
      buffDuration:()=>60000
    }
}