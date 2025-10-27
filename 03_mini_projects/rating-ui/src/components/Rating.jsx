import { useState } from 'react';
import Star from './Star';

const Rating = ({
  heading = 'Rate your Experience',
  color = 'gold',
  feedbackMessages = ['Terrible', 'Poor', 'Fair', 'Good', 'Excellent'],
}) => {
  const stars = Array.from({ length: 5 }, (_, i) => i + 1);
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className='rating-container'>
      <h2>{heading}</h2>
      <div className='stars'>
        {stars.map((star) => (
          // <span
          //   key={star}
          //   className={`star ${star <= (hover || rating) ? 'active' : ''}`}
          //   style={{ color: star <= (hover || rating) ? color : '#ccc' }}
          //   onClick={() => setRating(star)}
          //   onMouseEnter={() => setHover(star)}
          //   onMouseLeave={() => setHover(0)}
          // >
          //   {'\u2605'}
          // </span>

          <Star
            key={star}
            star={star}
            hover={hover}
            rating={rating}
            color={color}
            ratingClick={setRating}
            hoverEnter={setHover}
            hoverLeave={() => setHover(null)}
          />
        ))}
      </div>
      {rating > 0 && <p className='feedback'>{feedbackMessages[rating - 1]}</p>}
    </div>
  );
};

export default Rating;
