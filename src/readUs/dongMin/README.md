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

# 23.08.02

- MyListModal 기초 스타일링
  - overflow-y : scroll 적용
  - orderState에 따라 신청 상태가 다르게 표시되도록 설정
- useMyList 훅 필터링 로직 변경
  - 현재 시점 기준으로 지난 내역은 나오지 않도록 구현
- 신청된 연차 기준으로 남은 연차 갯수 표시
  - WAITING인 데이터만 선택해 현재의 연차 갯수에서 차감

# 23.08.03

- 신청시 endDate 미입력한 경우 신청이 되지 않도록 로직 수정
- 연차/당직 토글 구현
- 연차/당직 전용 색상으로 취소/신청 버튼 스타일링
- 모달 open/close 구현

# 23.08.04

- List hover 스타일 추가 및 세부 스타일링
- react-datepicker 대신 antd datepicker로 변경
- 공용 Button 컴포넌트 hover 스타일 추가
