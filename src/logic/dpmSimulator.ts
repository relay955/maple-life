import { skillDict, type Skill } from "../infoDictionary/SkillDict";
import type { CharacterSpecSummary, Stats } from "../util/mapleParser/mapleStat";
import { calcDamage } from "./specCalculator";

export type SkillCooldownList = {
    [index:string]:number
}

export interface SimulationEvent{
    name:string;
    timing:number,
    applyStat?:Stats,
    detachStat?:Stats,
    damageDealt?:{
        damageRate:number,
        bonusStat?:Stats
    }
}

export const simulate = (spec:CharacterSpecSummary) => {
    console.log(spec)
    const job = spec.job
    const skillPriority = job.skillPriority!;
    let skillCooldownList:SkillCooldownList = {};
    let eventList:SimulationEvent[] = [];
    let currentActionDelay = 0;

    //시작쿨타임있는것들 먼저 적용
    skillPriority.forEach((skillName:string)=>{
        const skill = skillDict![skillName]
        if(skill.startupCooldown){
            skillCooldownList[skillName] = skill.startupCooldown
        }
    })

    //합 actiondelay가 120000이 될때까지, 우선순위에 따라 모든 스킬을 사용하고 효과 적용
    while(currentActionDelay < job.damagePeriod!) {
        //사용할수있는 스킬 탐색..
        const targetSkillName = skillPriority.find((skillName: string) => {
            if (spec.skills[skillName] === undefined) return false
            if ((skillCooldownList[skillName] ?? 0) > currentActionDelay) return false
            return true;
        })!
        if(targetSkillName === undefined) throw Error("스킬이 없어요 ㅠ")

        const targetSkill = skillDict![targetSkillName]
        //쿨다운 적용
        if (targetSkill.cooldown) {
            skillCooldownList[targetSkillName] = currentActionDelay + targetSkill.cooldown
        }

        eventList.push(...skillActivation(targetSkillName,targetSkill,spec,currentActionDelay))
        currentActionDelay += targetSkill.actionDelay ?? 0
    }

    //모든 시전 완료 후, 스킬시전시간에 따라 정렬
    eventList = eventList.sort((a:SimulationEvent,b:SimulationEvent)=>a.timing-b.timing)
    console.log(eventList)

    //액션 시뮬레이션 시작
    currentActionDelay = 0;
    let totalDamage:{[index:string]:number} = {}
    let simSpec:CharacterSpecSummary = JSON.parse(JSON.stringify(spec))
    let cachedDamage:{[index:string]:number} = {
        default:calcDamage(simSpec)
    };
    let targetSkillNum = 0;
    while(currentActionDelay < job.damagePeriod!){
        const event = eventList[targetSkillNum]
        if(event === undefined || event.timing > job.damagePeriod!) break;
        if(event.damageDealt){
            let damage;
            if(event.damageDealt.bonusStat){
                if(cachedDamage[event.name] === undefined){
                    let tempSpec = JSON.parse(JSON.stringify(simSpec))
                    Object.keys(event.damageDealt.bonusStat).forEach((statName:string)=> {
                        tempSpec.statTotal[statName] = (simSpec.statTotal[statName] ?? 0) + (event.damageDealt!.bonusStat![statName] ?? 0)
                    })
                    damage = calcDamage(tempSpec)
                    cachedDamage[event.name] = damage
                }else{
                    damage = cachedDamage[event.name]
                }
            }else{
                damage = cachedDamage.default
            }
            if(totalDamage[event.name] === undefined) totalDamage[event.name] = 0
            totalDamage[event.name] += damage * event.damageDealt.damageRate
        }

        if(event.applyStat){
            Object.keys(event.applyStat).forEach((statName:string)=> {
                simSpec.statTotal[statName] = (simSpec.statTotal[statName] ?? 0) + (event.applyStat![statName] ?? 0)
            })
            cachedDamage = {default:calcDamage(simSpec)}
        }

        if(event.detachStat){
            Object.keys(event.detachStat).forEach((statName:string)=> {
                simSpec.statTotal[statName] = (simSpec.statTotal[statName] ?? 0) - (event.detachStat![statName] ?? 0)
            })
            cachedDamage = {default:calcDamage(simSpec)}
        }

        targetSkillNum++;
    }

    let realTotalDamage = 0;
    Object.keys(totalDamage).map((skillName:string)=>{
        totalDamage[skillName] = totalDamage[skillName]/100000000
        console.log(skillName,totalDamage[skillName])
        realTotalDamage += totalDamage[skillName]
    })
    console.log("전체",realTotalDamage)
    console.log("초당데미지",realTotalDamage/(job.damagePeriod!/1000))

    //방어율, 레벨뎀감, 보스기본뎀감, 아케인/어센틱 포스뎀감 적용
}

const skillActivation = (skillName:string,targetSkill: Skill,spec:CharacterSpecSummary,currentActionDelay:number)=>{
    let eventList:SimulationEvent[] = [];
    //스킬 시전
    if (targetSkill.damage) {
        let damageList = targetSkill.damage(spec)
        let beforeDealtTime = 0;
        damageList.forEach((damage) => {
            for(let i=1; i<=(damage.dealtCount ?? 1); i++){
                let event:SimulationEvent = {
                    name:skillName,
                    timing: currentActionDelay + beforeDealtTime + (damage.dealtTime * i),
                    damageDealt: {
                        damageRate: damage.damageRate,
                    }
                }
                if(damage.damageBonusStat)
                    event.damageDealt!.bonusStat = damage.damageBonusStat
                eventList.push(event)
            }
            beforeDealtTime = damage.dealtTime * (damage.dealtCount ?? 1)
        })
    }
    if (targetSkill.buffStat) {
        eventList.push({
            name:skillName,
            timing: currentActionDelay,
            applyStat: targetSkill.buffStat(spec)
        })
        //버프지속시간이 끝나고 버프해제
        eventList.push({
            name:skillName,
            timing: currentActionDelay + (targetSkill.buffDuration!(spec)),
            detachStat: targetSkill.buffStat(spec)
        })
    }
    if (targetSkill.autoActiveSkill) {
        const randomFactor = Math.random()
        Object.keys(targetSkill.autoActiveSkill).forEach((skillName:string)=>{
            const activeRate = targetSkill.autoActiveSkill![skillName]
            if(activeRate > randomFactor){
                eventList.push(...skillActivation(skillName,spec.job.skills![skillName],spec,currentActionDelay))
            }
        })
    }
    return eventList;
}
