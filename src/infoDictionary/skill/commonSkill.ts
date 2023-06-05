import type { Skill } from "../SkillDict";

export const commonSkillDict:{[key in string]:Skill} = {
    "에픽 어드벤쳐":{
      isDefaultSkill:true,
      actionDelay:800,
      cooldown:120000,
      buffStat:()=>({"데미지":10}),
      buffDuration:()=>60000,
    },

}