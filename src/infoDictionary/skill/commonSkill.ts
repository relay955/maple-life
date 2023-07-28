import type { Stats } from "../../util/mapleParser/mapleStat";
import type { Skill } from "../SkillDict";
import iconLink22 from "$lib/images/icon/buff/리부트.png"

export const commonSkillDict:{[key in string]:Skill} = {
    "리부트":{
      description:"리부트 서버 패시브",
      imgUrl:iconLink22,
      passiveStat:(spec)=>{
        let finalDamage = 30;
        if(spec.level >= 300) finalDamage = 70;
        else if(spec.level >= 250) finalDamage = 65;
        else if(spec.level >= 200) finalDamage = 60;
        else if(spec.level >= 150) finalDamage = 50;
        else if(spec.level >= 100) finalDamage = 40;

        return {
        HP:200,
        MP:100,
        "공격력":5,
        "마력":5,
        "최종 데미지":finalDamage,
      }}
    },
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
