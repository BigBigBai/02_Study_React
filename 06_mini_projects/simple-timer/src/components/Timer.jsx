import { useState, useRef, useEffect } from 'react';
import TimerDisplay from './TimerDisplay';
import TimerControls from './TimerControls';

const Timer = () => {
  const timerRef = useRef(null);
  const [time, setTime] = useState(() => {
    return Number(localStorage.getItem('time')) || 0;
  });
  const [isRunning, setIsRunning] = useState(false);

  const toggleTimer = () => {
    if (isRunning) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    } else {
      timerRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    setIsRunning(!isRunning);
  };

  const resetTimer = () => {
    clearInterval(timerRef.current);
    setIsRunning(false);
    setTime(0);
    timerRef.current = null;
    localStorage.removeItem('time');//Remove saved time on reset
  };

  //Save time to localStorage whenever it updates
  useEffect(() => {
    localStorage.setItem('time', time);
  }, [time]);

  return (
    <div>
      {/* <h2 className='text-4xl font-bold mb-4'>Timer: {time} sec</h2> */}
      <TimerDisplay time={time} />

      {/* <button
        onClick={toggleTimer}
        className='mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600'
      >
        {isRunning ? 'Pause' : 'Start'}
      </button>
      <button
        onClick={resetTimer}
        className='mt-2 bg-red-500 w-full text-white px-4 py-2 cursor-pointer rounded hover:bg-red-600'
      >
        Reset
      </button> */}

      <TimerControls
        isRunning={isRunning}
        onToggle={toggleTimer}
        onReset={resetTimer}
      />
    </div>
  );
};

export default Timer;
