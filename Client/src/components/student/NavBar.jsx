import React from 'react';
import logo from '../../assets/logo.svg'; // Import the logo.svg
import userIcon from '../../assets/user_icon.svg'; // Ensure the user_icon is correctly imported
import { Link, useLocation } from 'react-router-dom';
import { useClerk, useUser, UserButton } from '@clerk/clerk-react'; // Import UserButton

const NavBar = () => {
  const location = useLocation();
  const isCourseListPage = location.pathname.includes('/course-list');

  const { openSignIn } = useClerk(); // Destructured Clerk method
  const { user } = useUser(); // Destructured user hook

  return (
    <div className={`flex items-center justify-between px-4 sm:px-10 md:px-14 lg:px-36 border-b border-gray-500 py-4 ${isCourseListPage ? 'bg-white' : 'bg-cyan-100/70'}`}>
      <img src={logo} alt="Logo" className='w-28 lg:w-32 cursor-pointer' />

      <div className='flex ml-auto items-center gap-5 text-lg text-gray-500'>
        <div className='flex items-center gap-5'>
          {user && (
            <>
              <button>Become Educator</button>
              <Link to='/my-enrollments'>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()} className='bg-blue-600 text-white px-5 py-2 rounded-full'>
            Create Account
          </button>
        )}
      </div>

      {/* For phone Screens */}
      <div className='md:hidden flex items-center gap-2 sm:gap-5 text-gray-500'>
        <div className='flex items-center gap-1 sm:gap-2 max-sm:text-xs'>
          {user && (
            <>
              <button>Become Educator</button>
              <Link to='/my-enrollments'>My Enrollments</Link>
            </>
          )}
        </div>

        {user ? (
          <UserButton />
        ) : (
          <button onClick={() => openSignIn()}>
            <img src={userIcon} alt="User Icon" />
          </button>
        )}
      </div>
    </div>
  );
}

export default NavBar;
