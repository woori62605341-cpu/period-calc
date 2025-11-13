import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";
import styles from "../styles/Home.module.css";
import Period from "../components/period/Period";
import { usePeriods } from "../hooks/usePeriods";

// 💡 1. utils/date 파일에서 필요한 함수 가져오기 (경로를 맞게 수정하세요)
import { diffTodayToTarget } from "../utils/date";

const MONTH_IN_DAYS = 30;
const YEAR_IN_DAYS = 365;

const Home: NextPage = () => {
  const { periods, totalPeriod, onAdd } = usePeriods(); // 기존 onAdd 함수를 onAddPeriod 대신 onAdd로 받습니다.
  
  // 💡 2. 목표 날짜 계산 결과를 저장할 새로운 상태 추가
  const [targetDaysRemaining, setTargetDaysRemaining] = useState<number | null>(null); 

  // 💡 3. Period 컴포넌트의 onSubmit에 연결할 새로운 핸들러 함수 정의
  const onSubmitPeriod = (sDate: string, eDate: string, targetDate: string) => {
    // 3-1. 기존 기간 추가 로직 실행 (usePeriods 훅의 onAdd 사용)
    onAdd(sDate, eDate); 

    // 3-2. 목표 날짜가 유효한 값일 때만 D-Day 계산 실행
    if (targetDate) {
        const remainingDays = diffTodayToTarget(targetDate);
        setTargetDaysRemaining(remainingDays); // 계산 결과를 상태에 저장
    } else {
        setTargetDaysRemaining(null); // 입력하지 않았으면 결과 초기화
    }
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>날짜 기간 계산기</title>
        <meta name="description" content="간단한 날짜 기간 계산기" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>날짜 기간 계산기</h1>
        
        {/* 💡 4. 목표 날짜까지 남은 일수 표시 UI 추가 */}
        {targetDaysRemaining !== null && (
            <div className={styles.targetResult}>
                **목표 날짜**까지 
                <span style={{ fontSize: '24px', color: '#00796b', fontWeight: 'bold', margin: '0 8px' }}>
                    D-{Math.abs(targetDaysRemaining)}
                </span>
                일 남았습니다! 
                {targetDaysRemaining === 0 && <span style={{ color: 'red' }}> (D-DAY!)</span>}
                {targetDaysRemaining < 0 && <span style={{ color: 'gray' }}> (지남)</span>}
            </div>
        )}
        
        <Period onSubmit={onSubmitPeriod} /> {/* 💡 5. 수정된 onSubmitPeriod 연결 */}
        
        <ul>
          {periods.map((period, index) => {
            const [sDate, eDate] = period;
            return <li key={`period${index}`}>{`${sDate} - ${eDate}`}</li>;
          })}
        </ul>
        <ul>
          <li>총기간 일: {totalPeriod}</li>
          <li>총기간 월: {totalPeriod / MONTH_IN_DAYS}</li>
          <li>총기간 년: {totalPeriod / YEAR_IN_DAYS}</li>
        </ul>
      </main>
    </div>
  );
};

export default Home;
