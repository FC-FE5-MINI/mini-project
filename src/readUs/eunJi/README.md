## 23.07.27

- 캘린더 라이브러리 선정 : FullCalendar
- 더미 event 요소 삽입
- id 값에 따른 스타일 설정

## 23.07.28

- 당직, 연차에 따른 캘린더 표시 스타일 수정
- 더미데이터 postman 삽입
- 가상 api 연결, 데이터 타입 확인

* 받아온 data의 타입이 array여야 하는데 왜..string일까?

## 23.07.30

- useQuery 설치 후 api 호출 방식수정
  > 반성 : useEffect안에 async로 api를 호출하는 아주 이상한 방법을 사용했음..
- 지금까지 했던거 정리
  > useQuery로 데이터 가져옴
  > 달력의 초기 뷰를 "월(Month)"로 설정해야 하므로 'dayGridPlugin', 'interactionPlugin' 사용
  > 이벤트 데이터를 EventInput 형식으로 가공, 이벤트 데이터에서 필요한 정보를 EventInput으로 변환하고 formattedEvent 배열에 저장
  > eventContent : 각 콘텐츠를 렌더링
