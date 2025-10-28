import NoteForm from './components/NoteForm';
import { useState, useEffect } from 'react';
import NoteList from './components/NoteList';

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  //Handle deleting a note
  const deleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id));
  };

  // Save notes to localStorage whenever notes state changes
  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  return (
    <div className='max-w-lg mx-auto mt-10 p-6 bg-gray-100 rounded-lg shadow-lg'>
      <h2 className='text-2xl font-bold mb-4 text-center'>Notes App</h2>
      <NoteForm notes={notes} setNotes={setNotes} />
      <NoteList notes={notes} deleteNote={deleteNote} />
    </div>
  );
};

export default App;
