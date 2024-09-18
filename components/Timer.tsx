import { useState, useEffect } from 'react';

const Timer = () => {
  const [time, setTime] = useState({ hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTime(prevTime => {
        let { hours, minutes, seconds } = prevTime;

        seconds += 1;
        if (seconds === 60) {
          seconds = 0;
          minutes += 1;
        }
        if (minutes === 60) {
          minutes = 0;
          hours += 1;
        }

        return { hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(timerInterval);
  }, []);

  return (
    <div className='text-center m-auto text-2xl mb-5 text-slate-600'>
      <h1>
        {String(time.hours).padStart(2, '0')}:
        {String(time.minutes).padStart(2, '0')}:
        {String(time.seconds).padStart(2, '0')}
      </h1>
    </div>
  );
};

export default Timer;
