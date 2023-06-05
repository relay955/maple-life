import type { Stats } from "../../util/mapleParser/mapleStat";
import type { Skill } from "../SkillDict";

export const commonSkillDict:{[key in string]:Skill} = {
  "메이플 용사":{
    passiveStat:(spec)=>{
      let stat:Stats = {
      "STR":Math.floor((spec.statList["APSTR"] ?? {"캐릭터 AP":0})["캐릭터 AP"]*0.15),
      "DEX":Math.floor((spec.statList["APDEX"] ?? {"캐릭터 AP":0})["캐릭터 AP"]*0.15),
      "INT":Math.floor((spec.statList["APINT"] ?? {"캐릭터 AP":0})["캐릭터 AP"]*0.15),
      "LUK":Math.floor((spec.statList["APLUK"] ?? {"캐릭터 AP":0})["캐릭터 AP"]*0.15),
      }
      if(spec.job.mainStat === "HP") stat["HP%"] = 15;
      return stat;
    }
  },
  "에픽 어드벤쳐":{
    actionDelay:800,
    cooldown:120000,
    buffStat:()=>({"데미지":10}),
    buffDuration:()=>60000,
  },

}