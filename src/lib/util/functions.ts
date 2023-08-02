// 두 날짜의 기간을 계산하는 함수
const calcPeriods = (start: Date, end: Date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays =
    Math.round(Math.abs((new Date(end).setHours(0, 0, 0, 0) - new Date(start).setHours(0, 0, 0, 0)) / oneDay)) + 1;
  return diffDays;
};

export { calcPeriods };
