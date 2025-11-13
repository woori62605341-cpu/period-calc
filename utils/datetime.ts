import { differenceInDays, startOfDay } from "date-fns"; // 💡 startOfDay 추가

export const diffInDays = (sDate: string, eDate: string) => {
  return differenceInDays(new Date(eDate), new Date(sDate));
};

// 💡 오늘 날짜와 목표 날짜의 차이를 계산하는 함수 추가
export const diffTodayToTarget = (targetDate: string): number => {
  // 오늘 날짜를 가져와서 시간을 00:00:00으로 설정 (정확한 일수 계산을 위해)
  const today = startOfDay(new Date()); 
  
  // 목표 날짜도 시간을 00:00:00으로 설정
  const target = startOfDay(new Date(targetDate)); 
  
  // 목표 날짜와 오늘 날짜의 차이 계산
  // 결과는 남은 일수(양수) 또는 지난 일수(음수)가 됩니다.
  return differenceInDays(target, today); 
};
