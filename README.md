# Maple life
https://maplelife.kr  
메이플스토리를 인생처럼 플레이하는 사람들을 위한 보조 도구입니다.  

## 웹 버전
웹 버전( https://maplelife.kr )은 기본적인 할일 관리(숙제)만 지원합니다.  
웹 버전에서는 github pages를 통해 호스팅되며, 모든 데이터는 indexed DB 및 local storage로 저장되어 서버와 통신하지 않습니다.

## 데스크톱 버전
설치 기반의 데스크톱 버전은 알림 및 캐릭터의 상세정보를 분석하고 관리, 계산하는 기능 등을 추가적으로 지원합니다.  
또한 할일 관리 등에서 캐릭터 정보를 불러올 때, 프록시를 사용하지 않고 rust 코드를 이용하므로 데이터 페칭 속도가 매우 빠릅니다.


## 기능
### 구현됨
- 캐릭터/월드/계정 별 일일/주간/월간 퀘스트, 할일 관리
- Tauri 기반 데스크톱 앱 지원, 프록시를 사용하지 않는 메이플스토리 서버 데이터 페칭


### 구현 예정 (될수도 있고 안될수도 있음)
- 소유 캐릭터 목록 관리
- 캐릭터 스텟 정보 계산
- 특정시간까지 무언가 안했을경우 알림시스템(ex)우르스)
- 표형태 유니온 레벨/링크 획득여부 확인, 유니온 링크스킬 및 테트리스 자동 배치
- 캐릭터 환산주스텟 계산, 보스 커트라인 계산, 몹체력 원킬컷 계산
- 캐릭터 액션 추천(예상 레벨업 소요시간, 소모비용, 격파가능 보스 등을 종합 ) - [maplestats](https://maplestats.com/home)에서 착안한 기능입니다.
- DPM 시뮬레이션(powered by [simaple](https://github.com/simaple-team/simaple))
- 길드 게시판 확인
- 인포메이션 정리 - 레벨 별 메소/경험치 효율, 몹체력표 등
- indexedDB 동기화(하고싶은사람만 할수있도록, 간편 로그인 기반)

