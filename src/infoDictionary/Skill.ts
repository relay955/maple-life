import type {CharacterSpecSummary, Stats} from "../util/mapleParser/mapleStat";

export interface Skill{
  imgUrl?:string;
  actionDelay?:number;//스킬 사용 후딜. ms단위로 표기. 자동발동이거나 즉발형 스킬이면 undefined
  affectAttackSpeed?:boolean;//공속영향
  startupCooldown?:number;//초기 발동대기시간.
  cooldown?:number;//스킬 쿨타임. ms단위로 표기. 없으면 undefined
  maxStack?:number;//스킬 최대스택(카트리지식 스킬) 없으면 undefined

  //스킬 시전 후 발생하는 데미지. 단발형 스킬도 있고 설치/소환/지속유지형 스킬도 있기때문에
  //시나리오상 스킬 사용시 시간의 흐름에 따라 어떤 피해를 주는지를 명시함.
  damage?:(specSummary:CharacterSpecSummary)=>{
    damageRate:number;//퍼뎀
    dealtTime:number;//데미지가 들어가는 시점. 단발형일경우 0. ms 단위로 표기
    dealtCount?:number;//같은 데미지로 연속으로 공격하는경우, 공격하는 횟수.undefined면 1회
    damageBonusStat?:Stats;//타격시 추가적으로 적용되는 스텟
  }[];
  autoActiveSkill?:{[index:string]:number};//스킬 사용시 자동으로 발동되는 스킬 목록. 스킬명:확률. 0~1사이로 표기
  isDefaultSkill?:boolean;//기본스킬인지 여부.1~4차, 하이퍼스킬을 기본스킬로 정의하며 항상 사용가능하다고 판단함. 5차스킬은 코어 장착 여부에 따라 사용여부가 달라짐.

  buffStat?:(specSummary:CharacterSpecSummary)=>Stats;//스킬 사용시 버프형태로 일정시간동안 제공되는 스텟
  buffDuration?:(specSummary:CharacterSpecSummary)=>number;//버프 지속시간. 지속시간동안 버프 적용
}

//어떻게 할것인가?
//파이널 어택 -> 폭풍의시 타격시 일정확률로 발동
//플래시 미라주
//마법화살
//모탈블로우 -> 30번 직접공격하는 스킬이 적중하면 5초간 데미지 35% 증가
//설치기들, 소환물들은 어떻게 처리할것인가?
