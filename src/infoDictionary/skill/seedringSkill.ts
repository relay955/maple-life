import type { Skill } from "../SkillDict";

export const seedringSkillDict:{[key in string]:Skill} = {
    "리스트레인트 링": {
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["리스트레인트 링"].level*2000,
        buffStat:(spec)=>({
            "공격력%":spec.skills["리스트레인트 링"].level*25,
            "마력%":spec.skills["리스트레인트 링"].level*25,
        })
    },
    "리스크테이커 링": {
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>6000+spec.skills["리스크테이커 링"].level*6000,
        buffStat:(spec)=>({
            "공격력%":10+spec.skills["리스크테이커 링"].level*10,
            "마력%":10+spec.skills["리스크테이커 링"].level*10,
        })
    },
    "웨폰퍼프-S 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["웨폰퍼프-S 링"].level*2000,
        buffStat:(spec)=>({
            "STR":(spec.equipments["무기"]?.stats["공격력"] ?? 0) * spec.skills["웨폰퍼프-S 링"].level ,
            "HP":(spec.job.mainStat === "HP" ? 1 : 0) * (spec.equipments["무기"]?.stats["공격력"] ?? 0) * spec.skills["웨폰퍼프-S 링"].level * 17.5
        }),
    },
    "웨폰퍼프-D 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["웨폰퍼프-D 링"].level*2000,
        buffStat:(spec)=>({
            "DEX":(spec.equipments["무기"]?.stats["공격력"] ?? 0) * spec.skills["웨폰퍼프-D 링"].level
        }),
    },
    "웨폰퍼프-I 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["웨폰퍼프-I 링"].level*2000,
        buffStat:(spec)=>({
            "DEX":(spec.equipments["무기"]?.stats["마력"] ?? 0) * spec.skills["웨폰퍼프-I 링"].level
        }),
    },
    "웨폰퍼프-L 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["웨폰퍼프-L 링"].level*2000,
        buffStat:(spec)=>({
            "DEX":(spec.equipments["무기"]?.stats["공격력"] ?? 0) * spec.skills["웨폰퍼프-L 링"].level
        }),
    },
    "크리데미지 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>7000+spec.skills["크리데미지 링"].level*2000,
        buffStat:(spec)=>({
            "크리티컬 데미지":spec.skills["크리데미지 링"].level * 7
        }),
    },
    "듀라빌리티 링":{
        actionDelay:500,
        cooldown:180000,
        buffDuration:(spec)=>6000+spec.skills["듀라빌리티 링"].level*6000,
        buffStat:(spec)=>({
            "HP%":spec.skills["듀라빌리티 링"].level*100
        }),
    },
}