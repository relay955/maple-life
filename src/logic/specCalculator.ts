import type {
    Stat,
    StatDetails,
} from "../util/mapleParser/mapleStat";
import type {Character} from "../storage/dto/character";
import {classesDict} from "../infoDictionary/ClassesDict";
import {
    equipmentSetOptions,
    equipmentToSetDict
} from "../infoDictionary/EquipmentDict";
import {linkSkillDict} from "../infoDictionary/LinkSkillDict";
import {buffDict} from "../infoDictionary/BuffDict";

export const summarizeSpec = (character:Character, preset:"default"|"boss"):StatDetails => {
    const spec = character.spec![preset]!
    let statDetails:StatDetails = {statList:{},sets:{},starforce:0};
    let statList = statDetails.statList;
    //캐릭터 직업정보 획득
    let classInfo = classesDict[character.classType]!

    //스텟별 합산
    //캐릭터 AP
    statList["AP"+classInfo.mainStat] = {};
    let characterAP = 18 + character.level*5;
    statList["AP"+classInfo.mainStat]["캐릭터 스텟"] = characterAP;
    //메용
    statList[classInfo.mainStat] = {};
    statList[classInfo.mainStat]!["메이플 용사"] = Math.floor(characterAP*0.15);

    //캐릭터 기본스텟
    let passiveStats = classesDict[character.classType].passiveStats ?? {}
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
    spec.equipments.forEach((equipment)=>{
        Object.keys(equipment.stats).forEach((stat)=>{
            if(statList[stat] === undefined) statList[stat] = {}
            statList[stat]["[장비] "+equipment.name] = equipment.stats[stat];
        })
        if(equipment.starForce !== undefined){
            statDetails.starforce += equipment.starForce;
        }
        if(equipment.potential !== undefined) {
            Object.keys(equipment.potential.stats).forEach((stat) => {
                if (statList[stat] === undefined) statList[stat] = {}
                statList[stat]["[잠재]" + equipment.name] = equipment.potential!.stats[stat];
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
            if(statDetails.sets[setName] === undefined) statDetails.sets[setName] = 1
            else statDetails.sets[setName] += 1

            let setEquipmentcount = statDetails.sets[setName];
            let setOptions = equipmentSetOptions[setName][setEquipmentcount]
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


    //TODO 캐릭터가 가지고있는 5차 버프스킬을 기반으로 버프효과 추가
    //TODO 프리셋 사용 -> 공격대원 스텟 및 점령효과 계산
    return statDetails;
}

//스텟별 총합, 스텟공격력 및 점수 계산
export const calculateDmgAndScore = (statDetails:StatDetails) => {
}
