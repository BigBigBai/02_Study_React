import { useState } from 'react';
import TextInput from './inputs/TextInput';
import SelectInput from './inputs/SelectInput';
import TextareaInput from './inputs/TextareaInput';

const NoteForm = ({ notes, setNotes }) => {
  //   const [title, setTitle] = useState('');
  //   const [category, setCategory] = useState('Work');
  //   const [priority, setPriority] = useState('Medium');
  //   const [description, setDescription] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    category: 'Work',
    priority: 'Medium',
    description: '',
  });

  const handleChange = (e) => {
    // console.log(e.target.name, e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log('Form submitted:', formData);

    if (!formData.title || !formData.description) return;
    const newNote = { id: Date.now(), ...formData };
    setNotes([newNote, ...notes]);

    setFormData({
      title: '',
      category: 'Work',
      priority: 'Medium',
      description: '',
    });

    // Hide form after submission
    setIsFormVisible(false);
  };

  const [isFormVisible, setIsFormVisible] = useState(false);

  return (
    <div>
      {/* Toggle Button */}
      <button
        onClick={() => setIsFormVisible(!isFormVisible)}
        className='w-full bg-gray-100 border border-gray-300 text-purple-800 py-2 rounded-lg cursor-pointer hover:bg-purple-200 hover:border-purple-300 transition mb-4'
      >
        {isFormVisible ? 'Hide Form ▲' : 'Add New Note ▼'}
      </button>

      {isFormVisible && (
        <form onSubmit={handleSubmit} className='mb-6'>
          {/* <div className='mb-4'>
            <lable className='block font-semibold'>Title:</lable>
            <input
              type='text'
              name='title'
              value={formData.title}
              //   onChange={(e) => setTitle(e.target.value)}
              onChange={handleChange}
              placeholder='Title'
              className='w-full p-2 border rouded-lg'
              required
            />
          </div> */}

          <TextInput
            label='Title'
            name='title'
            value={formData.title}
            onChange={handleChange}
            required
          />

          {/* <div className='mb-4'>
            <label className='block font-semibold'>Priority:</label>
            <select
              name='priority'
              value={formData.priority}
              //   onChange={(e) => setPriority(e.target.value)}
              onChange={handleChange}
              className='w-full p-2 border rounded-lg'
            >
              <option value='High'>🔴 High</option>
              <option value='Medium'>🟠 Medium</option>
              <option value='Low'>🟢 Low</option>
            </select>
          </div> */}

          <SelectInput
            label='Priority'
            name='priority'
            value={formData.priority}
            onChange={handleChange}
            options={[
              { value: 'High', label: '🔴 High' },
              { value: 'Medium', label: '🟠 Medium' },
              { value: 'Low', label: '🟢 Low' },
            ]}
          ></SelectInput>

          {/* <div className='mb-4'>
            <label className='block font-semibold'>Category:</label>
            <select
              name='category'
              value={formData.category}
              //   onChange={(e) => setCategory(e.target.value)}
              onChange={handleChange}
              className='w-full p-2 border rounded-lg'
            >
              <option value='Work'>📂 Work</option>
              <option value='Personal'>🏠 Personal</option>
              <option value='Ideas'>💡 Ideas</option>
            </select>
          </div> */}

          <SelectInput
            label='Category'
            name='category'
            value={formData.category}
            onChange={handleChange}
            options={[
              { value: 'Work', label: '📂 Work' },
              { value: 'Personal', label: '🏠 Personal' },
              { value: 'Ideas', label: '💡 Ideas' },
            ]}
          ></SelectInput>

          {/* <div className='mb-4'>
            <label className='block font-semibold'>Description:</label>
            <textarea
              name='description'
              value={formData.description}
              //   onChange={(e) => setDescription(e.target.value)}
              onChange={handleChange}
              className='w-full p-2 border rounded-lg'
              required
            ></textarea>
          </div> */}

          <TextareaInput
            label='Description'
            name='description'
            value={formData.description}
            onChange={handleChange}
            required
          ></TextareaInput>

          <button
            type='submit'
            className='w-full bg-purple-500 text-white cursor-pointer py-2 rounded-lg hover:bg-purple-600 transitionn'
          >
            Add Note
          </button>
        </form>
      )}
    </div>
  );
};

export default NoteForm;
