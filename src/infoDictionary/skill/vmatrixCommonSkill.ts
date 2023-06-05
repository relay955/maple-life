import type { Skill } from "../SkillDict";

export const vMaxtrixCommonSkillDict:{[key in string]:Skill} = {
  //궁수 직업군
    "이볼브":{
      actionDelay:800,
      cooldown:120000,
      damage:(spec)=>[{damageRate:(4.5+spec.skills["이볼브"]!.level*0.15)*7,dealtTime:4000,dealtCount:10}],
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
    },

    //전직업 공용
    "블링크":{
      passiveStat:(spec)=>({
        "공격력":spec.skills["블링크"].level,
        "마력":spec.skills["블링크"].level
      }),
    },
    "로프 커넥트":{
      passiveStat:(spec)=>({
        "올스탯":spec.skills["로프 커넥트"].level,
      }),
    },
    "쓸만한 어드밴스드 블레스":{
      passiveStat:()=>({
        "공격력":20,
        "마력":20,
        "HP":425,
        "MP":425
      }),
    },
    "쓸만한 샤프 아이즈":{
      passiveStat:(spec)=>({
        "올스탯":Math.floor(0.8*(spec.skills["쓸만한 샤프 아이즈"].level*0.2)),
        "크리티컬 확률":10,
        "크리티컬 데미지":8
      }),
    },
    "쓸만한 하이퍼 바디":{
      passiveStat:(spec)=>({
        "올스탯":Math.floor(0.8*(spec.skills["쓸만한 하이퍼 바디"].level*0.2)),
        "HP%":40,
        "MP%":40
      }),
    },
    "쓸만한 윈드 부스터":{
      passiveStat:(spec)=>({
        "공격속도":1,
        "올스탯":Math.floor(0.8*(spec.skills["쓸만한 윈드 부스터"].level*0.2)),
      }),
    },
    "스파이더 인 미러":{
      actionDelay:800,
      cooldown:250000,
      damage:(spec)=>[
        {damageRate:(4.5+spec.skills["스파이더 인 미러"]!.level*0.18)*15,dealtTime:0},
        {damageRate:(1.75+spec.skills["스파이더 인 미러"]!.level*0.07)*9,dealtTime:3000,dealtCount:5}
      ],
    },
    "크레스트 오브 더 솔라":{
      actionDelay:800,
      cooldown:250000,
      damage:(spec)=>[
        {damageRate:(7.5+spec.skills["크레스트 오브 더 솔라"]!.level*0.3)*12,dealtTime:0},
        {damageRate:(2.75+spec.skills["크레스트 오브 더 솔라"]!.level*0.11)*6,dealtTime:2100,dealtCount:24}
      ],
    },
}