import type {StatInfo} from "../util/mapleParser/mapleStat";

export type EquipmentSetoptionDict = {[index:number]:StatInfo}

export const EquipmentSetoptions:{[index:string]:EquipmentSetoptionDict} = {
    "네크로 세트":{
        2:{

        }
    }
}

export const EquipmentToSetDict:{[index:string]:string} = {
    "상의":"보스 장신구 세트"
}
