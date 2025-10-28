import { useState } from 'react';

const NoteForm = () => {
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

  return (
    <form className='mb-6'>
      <div className='mb-4'>
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
      </div>

      <div className='mb-4'>
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
      </div>

      <div className='mb-4'>
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
      </div>

      <div className='mb-4'>
        <label className='block font-semibold'>Description:</label>
        <textarea
          name='description'
          value={formData.description}
          //   onChange={(e) => setDescription(e.target.value)}
          onChange={handleChange}
          className='w-full p-2 border rounded-lg'
          required
        ></textarea>
      </div>
    </form>
  );
};

export default NoteForm;
