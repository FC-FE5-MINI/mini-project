# 23.07.27

- ModalLayout 생성
- 공용 Button 컴포넌트 생성
- 연차/당직 신청용 AddModal 생성

# 23.07.31

- postman mock server로 임시 api 생성
  - 신청, 신청 취소, 신청 내역 조회
- zustand store에 선택 날짜를 지정할 변수 및 함수 선언
- react datepicker로 날짜 선택 구현
- 선택한 날짜를 이용해 연차 및 당직 신청 구현

# 23.08.01

- constants.ts 생성 및 상수 등록
- 상수를 이용해 AddModal 리팩토링
- MyListModal 생성
  - useMyList 커스텀 훅을 생성해 api통신 로직 구현
  - 기간을 계산하는 유틸함수 calcPeriods 추가
  - 임시 api를 이용해 연차/당직 신청 현황 불러오기
  - todo : 지난 일자 현황 제거, 남은 연차 표시, 남은 연차를 통한 신청 제한
