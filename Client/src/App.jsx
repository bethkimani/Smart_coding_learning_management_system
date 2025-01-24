import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/student/Home';
import CourseList from './pages/student/CourseList';
import CourseDetails from './pages/student/CourseDetails';
import MyEnrollments from './pages/student/MyEnrollments';
import Player from './pages/student/Player';
import Loading from './components/student/Loading';
import Educator from './pages/educator/Educator';
import Dashboard from './pages/educator/Dashboard';
import AddCourse from './pages/educator/AddCourse';
import MyCourses from './pages/educator/MyCourses';
import StudentsEnrolled from './pages/educator/StudentsEnrolled';
import NavBar from './components/educator/NavBar';

const App = () => {
  return (
    <div className='text-default min-h-screen bg-white'>
      <NavBar />

      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/course-list' element={<CourseList />} />
        <Route path='/course/:id' element={<CourseDetails />} />
        <Route path='/my-enrollments' element={<MyEnrollments />} />
        <Route path='/player/:courseId' element={<Player />} />
        <Route path='/loading/:path' element={<Loading />} />
        <Route path='/educator' element={<Educator />} />
        <Route path='/educator/dashboard' element={<Dashboard />} />
        <Route path='/educator/add-course' element={<AddCourse />} />
        <Route path='/educator/my-courses' element={<MyCourses />} />
        <Route path='/educator/students-enrolled' element={<StudentsEnrolled />} />
      </Routes>
    </div>
  );
}

export default App;