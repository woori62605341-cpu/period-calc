import React, { useState } from "react";
import styles from "./period.module.css";

// 💡 1. PeriodProps 인터페이스 수정
interface PeriodProps {
  onSubmit: (sDate: string, eDate: string, targetDate: string) => void;
}

export default function Period(props: PeriodProps) {
  const { onSubmit } = props;
  const [sDate, setSDate] = useState("");
  const [eDate, setEDate] = useState("");
  const [targetDate, setTargetDate] = useState(""); // 💡 2-1. 새로운 상태 추가

  const onSDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setSDate(e.target.value);
  };

  const onEDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setEDate(e.target.value);
  };

  // 💡 2-2. 새로운 핸들러 함수 추가
  const onTargetDateChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setTargetDate(e.target.value);
  };

  const onPeriodSubmit = () => {
    // 💡 3. targetDate를 onSubmit 함수에 추가하여 전달
    onSubmit(sDate, eDate, targetDate);
    setSDate("");
    setEDate("");
    setTargetDate(""); // 제출 후 초기화
  };

  return (
    <div className={styles["period"]}>
      <input type="date" onChange={onSDateChange} value={sDate} />
      <span>~</span>
      <input type="date" onChange={onEDateChange} value={eDate} />
      
      {/* 💡 4. 목표 날짜 입력 필드 추가 */}
      <input 
          type="date" 
          onChange={onTargetDateChange} 
          value={targetDate} 
          placeholder="목표 날짜"
      />

      <button onClick={onPeriodSubmit}>추가</button>
    </div>
  );
}
