import React from 'react';

const CourseCard = ({ course }) => {
  const { currency } = useContext(AppContext); // Fixed `use Context` to `useContext`

  return (
    <div>
      <img src={course.courseThumbnail} alt="" />
      <div>
        <h3>{course.courseTitle}</h3>
        <p>{course.educator.name}</p>
        <div>
          <p>4.5</p>
          <div>
            {[...Array(5)].map((_, i) => (
              <img key={i} src={assets.star} alt="" /> // Fixed typo `assests` to `assets`
            ))}
          </div>
          <p>22</p>
        </div>
        <p>
          {currency}
          {(course.coursePrice - (course.discount * course.coursePrice) / 100).toFixed(2)} // Moved `.toFixed(2)` correctly
        </p>
      </div>
    </div>
  );
};

export default CourseCard;
