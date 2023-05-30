import type {StatInfo} from "../util/mapleParser/mapleStat";

export type EquipmentSet = {
    nickName:string;
    setOptions:{[index:number]:StatInfo};
}
export const equipmentSetOptions:{[index:string]:EquipmentSet} = {
    "마이스터 세트":{
        nickName:"마이",
        setOptions: {
            2: {
                "HP%": 10,
                "MP%": 10,
            },
            3: {
                "공격력": 40,
                "마력": 40
            },
            4: {
                "보스 데미지": 20
            }
        }
    },
    "칠요 세트":{
        nickName:"칠요",
        setOptions: {
            2: {
                "방어율 무시": 10
            }
        }
    },
    "보스 장신구 세트":{
        nickName:"보장",
        setOptions: {
            3: {
                "공격력": 5,
                "마력": 5,
                "올스탯": 10,
                "HP%": 5,
                "MP%": 5
            },
            5: {
                "공격력": 5,
                "마력": 5,
                "올스탯": 10,
                "HP%": 5,
                "MP%": 5
            },
            7: {
                "공격력": 10,
                "마력": 10,
                "방어율 무시": 10,
            },
            9: {
                "공격력": 10,
                "마력": 10,
                "보스 데미지": 10,
            }
        }
    },
    "여명의 보스 세트":{
        nickName:"여명",
        setOptions: {
            2: {
                "올스탯": 10,
                "HP": 250,
                "공격력": 10,
                "마력": 10,
                "보스 데미지": 10,
            },
            3: {
                "올스탯": 10,
                "HP": 250,
                "공격력": 10,
                "마력": 10,
            },
            4: {
                "올스탯": 10,
                "HP": 250,
                "공격력": 10,
                "마력": 10,
                "방어율 무시": 10,
            }
        }
    },
    "칠흑의 보스 세트":{
        nickName:"칠흑",
        setOptions: {
            2: {
                "올스탯": 10,
                "HP": 250,
                "공격력": 10,
                "마력": 10,
                "보스 데미지": 10,
            },
            3: {
                "올스탯": 10,
                "HP": 250,
                "공격력": 10,
                "마력": 10,
                "방어율 무시": 10
            },
            4: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "크리티컬 데미지": 5
            },
            5: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "보스 데미지": 10
            },
            6: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "방어율 무시": 10
            },
            7: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "크리티컬 데미지": 5
            },
            8: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "보스 데미지": 10
            },
            9: {
                "올스탯": 15,
                "HP": 375,
                "공격력": 15,
                "마력": 15,
                "크리티컬 데미지": 5
            }
        }
    },
    "펜살리르 세트":{
        nickName:"펜살",
        setOptions: {
            3: {
                "HP%": 9,
                "MP%": 9,
                "일반 데미지": 2
            },
            4: {
                "공격력": 9,
                "마력": 9,
                "일반 데미지": 4
            },
            5: {
                "올스탯": 15,
                "방어율 무시": 10,
                "일반 데미지": 6
            },
            6: {
                "공격력": 10,
                "마력": 10,
                "방어율 무시": 10,
                "일반 데미지": 8
            }
        }
    },
    "네크로 세트":{
        nickName:"네크로",
        setOptions: {
            2: {
                "올스탯": 3
            },
            3: {
                "이동속도": 5,
                "보스 데미지": 5
            },
            4: {
                "올스탯": 5
            },
            5: {
                "공격력": 5,
                "마력": 5,
                "보스 데미지": 10
            }
        }
    },
    "반레온 세트":{
        nickName:"반레온",
        setOptions: {
            4: {
                "올스탯": 6,
                "보스 데미지": 10
            },
            5: {
                "올스탯": 9,
                "공격력": 10,
                "마력": 10,
                "이동속도": 10,
                "점프력": 15,
            },
            6: {
                "올스탯": 25,
                "HP%": 15,
                "MP%": 15,
                "공격력": 20,
                "마력": 20,
                "보스 데미지": 10,
            }
        }
    },
    "여제 세트":{
        nickName:"여제",
        setOptions: {
            3: {
                "HP%": 15,
                "MP%": 15
            },
            4: {
                "공격력": 15,
                "마력": 15,
            },
            5: {
                "올스탯": 20
            },
            6: {
                "공격력": 30,
                "마력": 30,
                "보스 데미지": 30
            },
            7: {
                "공격력": 10,
                "마력": 10,
                "HP%": 15,
                "MP%": 15
            }
        }
    },
    "루타비스 세트":{
        nickName:"루타",
        setOptions: {
            2: {
                "올스탯": 20,
                "HP": 1000,
                "MP": 1000
            },
            3: {
                "HP%": 10,
                "MP%": 10,
                "공격력": 50,
                "마력": 50
            },
            4: {
                "보스 데미지": 30
            }
        }
    },
    "앱솔랩스 세트":{
        nickName:"앱솔",
        setOptions: {
            2: {
                "HP": 1500,
                "MP": 1500,
                "공격력": 20,
                "보스 데미지": 10
            },
            3: {
                "올스탯": 30,
                "공격력": 20,
                "마력": 20,
                "보스 데미지": 10
            },
            4: {
                "공격력": 25,
                "마력": 25,
                "방어율 무시": 10
            },
            5: {
                "공격력": 30,
                "마력": 30,
                "보스 데미지": 10
            },
            6: {
                "HP%": 20,
                "MP%": 20,
                "공격력": 20,
                "마력": 20,
            },
            7: {
                "공격력": 20,
                "마력": 20,
                "방어율 무시": 10
            }
        }
    },
    "아케인셰이드 세트":{
        nickName:"앜",
        setOptions: {
            2: {
                "공격력": 30,
                "마력": 30,
                "보스 데미지": 10
            },
            3: {
                "공격력": 30,
                "마력": 30,
                "방어율 무시": 10
            },
            4: {
                "공격력": 35,
                "마력": 35,
                "올스탯": 50,
                "보스 데미지": 10
            },
            5: {
                HP: 2000,
                MP: 2000,
                "공격력": 40,
                "보스 데미지": 10
            },
            6: {
                "HP%": 30,
                "MP%": 30,
                "공격력": 30,
                "마력": 30,
            },
            7: {
                "공격력": 30,
                "마력": 30,
                "방어율 무시": 10
            }
        }
    },
    "에테르넬 세트":{
        nickName:"에테",
        setOptions: {
            2: {
                "HP": 2500,
                "MP": 2500,
                "보스 데미지": 10
            },
            3: {
                "올스탯": 50,
                "공격력": 40,
                "마력": 40,
                "보스 데미지": 10,
            },
            4: {
                "HP%": 15,
                "MP%": 15,
                "공격력": 40,
                "마력": 40,
                "보스 데미지": 10
            },
            5: {
                "공격력": 40,
                "마력": 40,
                "방어율 무시": 20
            }
        }
    }
}

export const equipmentToSetDict:{[index:string]:string} = {
    "마이스터 이어링":"마이스터 세트",
    "마이스터링":"마이스터 세트",
    "마이스터 숄더":"마이스터 세트",

    "칠요의 뱃지":"칠요 세트",
    "칠요의 몬스터파커":"칠요 세트",

    "아쿠아틱 레터 눈장식":"보스 장신구 세트",
    "블랙빈 마크":"보스 장신구 세트",
    "파풀라투스 마크":"보스 장신구 세트",
    "응축된 힘의 결정석":"보스 장신구 세트",
    "골든 클로버 벨트":"보스 장신구 세트",
    "분노한 자쿰의 벨트":"보스 장신구 세트",
    "혼테일의 목걸이":"보스 장신구 세트",
    "카오스 혼테일의 목걸이":"보스 장신구 세트",
    "매커네이터 펜던트":"보스 장신구 세트",
    "도미네이터 펜던트":"보스 장신구 세트",
    "데아 시두스 이어링":"보스 장신구 세트",
    "지옥의 불꽃":"보스 장신구 세트",
    "실버블라썸 링":"보스 장신구 세트",
    "고귀한 이피아의 반지":"보스 장신구 세트",
    "가디언 엔젤 링":"보스 장신구 세트",
    "크리스탈 웬투스 뱃지":"보스 장신구 세트",
    "로얄 블랙메탈 숄더":"보스 장신구 세트",
    "영생의 돌":"보스 장신구 세트",
    "핑크빛 성배":"보스 장신구 세트",

    "트와일라이트 마크":"여명의 보스 세트",
    "에스텔라 이어링":"여명의 보스 세트",
    "데이브레이크 펜던트":"여명의 보스 세트",
    "여명의 가디언 엔젤 링":"여명의 보스 세트",

    "루즈 컨트롤 머신 마크":"칠흑의 보스 세트",
    "마력이 깃든 안대":"칠흑의 보스 세트",
    "블랙 하트":"칠흑의 보스 세트",
    "몽환의 벨트":"칠흑의 보스 세트",
    "고통의 근원":"칠흑의 보스 세트",
    "창세의 뱃지":"칠흑의 보스 세트",
    "커맨더 포스 이어링":"칠흑의 보스 세트",
    "거대한 공포":"칠흑의 보스 세트",
    "저주받은 적의 마도서":"칠흑의 보스 세트",
    "저주받은 청의 마도서":"칠흑의 보스 세트",
    "저주받은 황의 마도서":"칠흑의 보스 세트",
    "저주받은 녹의 마도서":"칠흑의 보스 세트",
    "미트라의 분노 : 전사":"칠흑의 보스 세트",
    "미트라의 분노 : 궁수":"칠흑의 보스 세트",
    "미트라의 분노 : 마법사":"칠흑의 보스 세트",
    "미트라의 분노 : 도적":"칠흑의 보스 세트",
    "미트라의 분노 : 해적":"칠흑의 보스 세트",

    "펜살리르 센티널부츠":"펜살리르 세트",
    "펜살리르 센티널슈트":"펜살리르 세트",
    "펜살리르 센티널글러브":"펜살리르 세트",
    "펜살리르 센티널케이프":"펜살리르 세트",

    //루타비스 세트
    "파프니르 윈드체이서":"루타비스 세트",
    "하이네스 레인져베레":"루타비스 세트",
    "이글아이 레인져후드":"루타비스 세트",
    "트릭스터 레인져팬츠":"루타비스 세트",

    //앱솔랩스 세트
    "앱솔랩스 슈팅보우":"앱솔랩스 세트",
    "앱솔랩스 아처후드":"앱솔랩스 세트",
    "앱솔랩스 아처슈트":"앱솔랩스 세트",
    "앱솔랩스 아처슈즈":"앱솔랩스 세트",
    "앱솔랩스 아처글러브":"앱솔랩스 세트",
    "앱솔랩스 아처케이프":"앱솔랩스 세트",
    "앱솔랩스 아처숄더":"앱솔랩스 세트",
}
