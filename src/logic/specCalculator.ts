import type {
    CharacterSpec,
    Stat,
    CharacterSpecSummary, StatIndicator, StatIndicators, Stats,
} from "../util/mapleParser/mapleStat";
import type {Character} from "../storage/dto/character";
import type {Job} from "../infoDictionary/JobDict"
import {
    jobDict,
    defaultCalcBonusStatGradeFomula,
    defaultCalcDmgFomula
} from "../infoDictionary/JobDict";
import {
    equipmentSetOptions,
    equipmentToSetDict
} from "../infoDictionary/EquipmentDict";
import {linkSkillDict} from "../infoDictionary/LinkSkillDict";
import {buffDict} from "../infoDictionary/BuffDict";


export const summarizeSpec = (character:Character, spec:CharacterSpec):CharacterSpecSummary => {
    let classInfo = jobDict[character.classType]!
    let specSummary:CharacterSpecSummary = {job:classInfo,statList:{},sets:{},
        starforce:0,statTotal:{},skills:spec.skills,skillsAvgLevel:{skillCore:0,enhanceCore:0}};
    let statList = specSummary.statList;
    //스텟별 합산
    //메용
    if(classInfo.mainStat) {
        //캐릭터 AP
        statList["AP"+classInfo.mainStat] = {};
        let characterAP = 18 + character.level*5;
        statList["AP"+classInfo.mainStat]["캐릭터 스텟"] = characterAP;
        statList[classInfo.mainStat] = {};
        statList[classInfo.mainStat]!["메이플 용사"] = Math.floor(characterAP * 0.15);
    }

    //캐릭터 기본스텟
    let passiveStats = jobDict[character.classType].passiveStats ?? {}
    Object.keys(passiveStats).forEach((stat)=> {
        if(statList[stat] === undefined) statList[stat] = {}
        statList[stat]["캐릭터 기초/스킬"] = passiveStats[stat];
    })

    //성향
    Object.keys(spec.tendency).forEach((stat)=> {
        if(statList[stat] === undefined) statList[stat] = {}
        statList[stat]["성향"] = spec.tendency[stat];
    })

    //어빌리티
    Object.keys(spec.ability).forEach((stat)=> {
        if(statList[stat] === undefined) statList[stat] = {}
        statList[stat]["어빌리티"] = spec.ability[stat];
    })

    //하이퍼스텟
    Object.keys(spec.hyperStat).forEach((stat)=> {
        if(statList[stat] === undefined) statList[stat] = {}
        statList[stat]["하이퍼스텟"] = spec.hyperStat[stat];
    })

    //장비
    Object.keys(spec.equipments).forEach((equipmentType)=>{
        const equipment = spec.equipments[equipmentType]
        Object.keys(equipment.stats).forEach((stat)=>{
            if(statList[stat] === undefined) statList[stat] = {}
            statList[stat]["[장비] "+equipment.name] = equipment.stats[stat];
        })
        if(equipment.starForce !== undefined){
            specSummary.starforce += equipment.starForce;
        }
        if(equipment.potential !== undefined) {
            Object.keys(equipment.potential.stats).forEach((stat) => {
                if (statList[stat] === undefined) statList[stat] = {}
                statList[stat]["[잠재] " + equipment.name] = equipment.potential!.stats[stat];
            })
        }
        if(equipment.additionalPotential !== undefined){
            Object.keys(equipment.additionalPotential.stats).forEach((stat) => {
                if (statList[stat] === undefined) statList[stat] = {}
                statList[stat]["[에잠] "+ equipment.name] = equipment.additionalPotential!.stats[stat];
            })
        }
        if(equipment.soul !== undefined){
            Object.keys(equipment.soul.stats).forEach((stat) => {
                if (statList[stat] === undefined) statList[stat] = {}
                statList[stat]["[소울] "+equipment.name] = equipment.soul!.stats[stat];
            })
            if (statList["공격력"] === undefined) statList["공격력"] = {}
            statList["공격력"]["[소울] "+equipment.name] = 20;
            if (statList["마력"] === undefined) statList["마력"] = {}
            statList["마력"]["[소울] "+equipment.name] = 20;
        }
        //세트옵션
        if(equipmentToSetDict[equipment.name] !== undefined){
            let setName = equipmentToSetDict[equipment.name]
            if(specSummary.sets[setName] === undefined) specSummary.sets[setName] = 1
            else specSummary.sets[setName] += 1

            let setEquipmentcount = specSummary.sets[setName];
            let setOptions = equipmentSetOptions[setName].setOptions[setEquipmentcount]
            if(setOptions !== undefined) {
                Object.keys(setOptions).forEach((stat) => {
                    if (statList[stat] === undefined) statList[stat] = {}
                    if(statList[stat]["[세트] "+setName] !== undefined) {
                        statList[stat]["[세트] "+setName] += setOptions[stat]
                    }else{
                        statList[stat]["[세트] "+setName] = setOptions[stat]
                    }
                })
            }
        }
    })

    //활성화된 링크스킬 계산
    Object.keys(spec.linkSkill).forEach((skillName)=> {
        let skillLevel = spec.linkSkill[skillName];
        let skillBonusStats = linkSkillDict[skillName][skillLevel]
        Object.keys(skillBonusStats).forEach((stat)=>{
            if(statList[stat] === undefined) statList[stat] = {}
            statList[stat]["[링크] "+skillName] = skillBonusStats[stat];
        });
    })

    //활성화된 버프 계산
    Object.keys(spec.buff).forEach((buffName)=> {
        Object.keys(buffDict[buffName]).forEach((stat)=>{
            if(statList[stat] === undefined) statList[stat] = {}
            statList[stat]["[버프] "+buffName] = buffDict[buffName][stat];
        });
    })

    //스킬코어/강화코어 평균갯수 계산
    let skillCoreNum = 0
    let skillCoreLevelTotal = 0
    let enhanceCoreNum = 0
    let enhanceCoreLevelTotal = 0

    Object.keys(spec.skills).forEach((skillName)=>{
        let skill = spec.skills[skillName]
        let vMatrixSkillType = classInfo.vMatrixSkillType?.[skillName]
        if(vMatrixSkillType === "skill"){
            skillCoreNum += 1
            skillCoreLevelTotal += skill.level
        }else if(vMatrixSkillType === "enhance"){
            enhanceCoreNum += 1
            enhanceCoreLevelTotal += skill.level
        }
    })
    specSummary.skillsAvgLevel.skillCore = skillCoreNum > 0 ?
        Math.round(skillCoreLevelTotal / skillCoreNum):0
    specSummary.skillsAvgLevel.enhanceCore = enhanceCoreNum > 0 ?
        Math.round(enhanceCoreLevelTotal / enhanceCoreNum):0

    //TODO 캐릭터가 가지고있는 5차 버프스킬을 기반으로 버프효과 추가
    //TODO 프리셋 사용 -> 공격대원 스텟 및 점령효과 계산

    //스텟합계 계산
    Object.keys(specSummary.statList).forEach((statName)=>{
        specSummary.statTotal[statName] = 0;
        let stats:{[index:string]:number} = specSummary.statList[statName]!

        if(statName === "최종 데미지"){
            specSummary.statTotal[statName] = 100;
            Object.keys(stats).forEach((key)=> specSummary.statTotal[statName]! *= 1+(stats[key]/100));
            specSummary.statTotal[statName]! = Math.round((specSummary.statTotal[statName]! - 100)*100)/100;
        }else if(statName === "방어율 무시" || statName === "속성내성 무시"){
            Object.keys(stats).forEach((key)=> {
                if(specSummary.statTotal[statName] === 0){
                    specSummary.statTotal[statName] = stats[key];
                    return;
                }
                specSummary.statTotal[statName]! = (
                    (specSummary.statTotal[statName]!/100) + (stats[key]/100) -
                    (specSummary.statTotal[statName]!/100) * (stats[key]/100)
                )*100;
            });
            specSummary.statTotal[statName]! = Math.round(specSummary.statTotal[statName]! *100)/100;
        }else{
            Object.keys(stats).forEach((key)=> specSummary.statTotal[statName]! += stats[key]);
        }

    })
    return specSummary;
}

//스텟별 총합, 스텟공격력 및 점수 계산
export const calcDamage = (statDetails:CharacterSpecSummary):number => {
    try {
        const classInfo = statDetails.job;
        //스텟*공격력 계산
        let totalScore = classInfo.calcDmg === undefined ?
            defaultCalcDmgFomula(statDetails.statTotal, classInfo) :
            classInfo.calcDmg(statDetails.statTotal, classInfo)

        //데미지, 보공 합계 계산
        let dmgFactor = 1+((statDetails.statTotal["데미지"] ?? 0) / 100)
                        +((statDetails.statTotal["보스 데미지"] ?? 0) /100)
        totalScore *= dmgFactor;

        //크리티컬 계수 계산
        let critcalFactor = 1+((statDetails.statTotal["크리티컬 확률"] ?? 0)/100)
                             *(((statDetails.statTotal["크리티컬 데미지"] ?? 0)+35)/100)
        totalScore *= critcalFactor;

        //숙련도 계수(예 : 숙련도가 85%라면 실제 데미지는 85~100% 사이로 들어가므로, 평균값은 92.5%임)
        let masteryFactor = (1+(statDetails.statTotal["숙련도"] ?? 0))/2
        totalScore *= masteryFactor

        //속성내성 무시
        let targetElementalResistance = 0.5*(1-(statDetails.statTotal["속성내성 무시"] ?? 0)/100)
        totalScore *= 1-targetElementalResistance

        //최종데미지
        let finalDamageFactor = 1 + ((statDetails.statTotal["최종 데미지"] ?? 0)/100)
        totalScore *= finalDamageFactor

        //무기 상수
        let weaponConstFactor = statDetails.statTotal["무기 상수"] ?? 1
        totalScore *= weaponConstFactor

        return totalScore

    }catch(e:any){
        console.error(e.message)
        return 0;
    }
}


//추가옵션 급수계산
export const calculateBonusOptionGrade = (bonusStats:Stats, classInfo:Job):number => {
    try {
        if(classInfo.calcBonusStatGrade === undefined) {
            return defaultCalcBonusStatGradeFomula(bonusStats,classInfo)
        }else{
            return classInfo.calcBonusStatGrade(bonusStats,classInfo)
        }
    }catch(e:any){
        console.error(e)
        return 0;
    }
}
