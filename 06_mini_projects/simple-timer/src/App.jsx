import { useRef } from 'react';

const App = () => {
  const inputRef = useRef(null);

  const submit = () => {
    console.log(inputRef.current);
    console.log(inputRef.current.value);

    inputRef.current.focus();
  };

  return (
    <div className='max-w-md mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg text-center'>
      <h2 className='text-2xl font-bold mb-4'>useRef Example</h2>

      <input
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
      </button>
    </div>
  );
};

export default App;
