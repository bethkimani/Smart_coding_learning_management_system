import React, { useContext } from 'react';
import { assets } from "../../assets/assets.js";
import { AppContext } from '../../context/AppContext';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
  const { currency, calculatingRating } = useContext(AppContext); // Updated function name here

  return (
    <Link to={'/course/' + course._id} onClick={() => scrollTo(0, 0)}
      className='border border-gray-500/30 pb-6 overflow-hidden rounded-lg'>
      <img className='w-full' src={course.courseThumbnail} alt='' />
      <div className='p-3 text-left'>
        <h3 className='text-base font-semibold'>{course.courseTitle}</h3>
        <p className='text-gry-500'>{course.educator.name}</p>
        <div className='flex items-center space-x-2'>
          <p>{calculatingRating(course)}</p> {/* Updated function name here */}
          <div className='flex'>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={i < Math.floor(calculatingRating(course)) ? assets.star : assets.star_blank} alt='' 
                className='w-3.5 h-3.5' />
            ))}
          </div>
          <p className='text-gray-500'>22</p>
        </div>
        <p className='text-base font-semibold text-gray-800'>{currency}{(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)}</p>
      </div>
    </Link>
  );
};

export default CourseCard;