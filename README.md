# Health Care App

- 운동 입력 유효성 검사

- 주 기능

  - 운동 추가
    - 필요 자원 : id, startDate / type,level,maxCount,[휴식주기(?), 세트수(?)]
  - 운동 루틴표
    - 필요 자원 : dDay, set, count, condition: { good, normal, bad }, setRestTime, exerRestTime
  - 운동 시간 Check
    - 필요 자원 : dDay, set, setRestTime, count, exerRestTime

- 페이지
  - 메인 (추가, 루틴표)
  - 체크 (운동 시간)

// 예시

1-1. 홈 트레이닝을 자주 하다 말다 하다보니 입맛대로 자신이 만든 루틴대로 운동들을 기록하고 관리하고 싶어서 만든 미니 프로젝트입니다.
redux-toolkit을 사용해보고자 react-typescript 환경에서 사용법을 익히고자 제작한 프로젝트입니다.

1-2. 집에서 간단한 운동만 하다가 간단한 운동이라도 체계적으로 해보자는 생각으로 간단한 데 운동을 경험해줄수있게 만들어주는 미니 프로젝트입니다.

2-1. 제작기간 : 2023/02/10 ~

3-1. 주요 기능

크립토 검색 기능
검색 결과 차트로 시각화
북마크 한 크립토 데이터 비교
검색어 자동 완성 기능, 유효성 검사
Tech Stack

javscript, typescript
sass
parcel-bundler
역할

개인프로젝트(기획, 디자인 , 개발)
배운점

해시를 이용한 라우트 함수로 페이지 제어하기
중복되는 함수 묶어서 관리하기
중복되는 html, template화 시켜서 관리하기
객체 데이터 속성 추가, 관리
타입스크립트의 변수 타입 지정, 타입 가드
클래스로 인스턴스 재활용해서 사용하기
안전한 전역 상태 관리
스크린샷
