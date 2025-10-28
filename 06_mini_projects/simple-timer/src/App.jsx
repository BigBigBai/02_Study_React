import { useRef, useState } from 'react';

const App = () => {
  // const inputRef = useRef(null);
  // const submit = () => {
  //   console.log(inputRef.current);
  //   console.log(inputRef.current.value);
  //   inputRef.current.focus();
  // };

  const timerRef = useRef(null);
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);

  console.log(timerRef.current);

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
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center'>
      <h2 className='text-4xl font-bold mb-4'>Timer: {time} sec</h2>

      {/* <input
        type='text'
        className='w-full p-2 border rounded-lg'
        placeholder='Type something...'
        ref={inputRef}
        defaultValue='Hello, useRef!'
      />

      <button
        className='mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'
        onClick={submit}
      >
        Submit
      </button> */}

      <button
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
      </button>
    </div>
  );
};

export default App;
