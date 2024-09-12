import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase';
import Logo from './Logo';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate('/');
    } catch (error) {
      console.error('Logout Error', error);
    }
  };

  return (
    <header className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 py-4">
        <div className="flex justify-between items-center">
          <Logo />
          
          {/* Hamburger menu button for mobile */}
          <button 
            className="md:hidden w-10 h-10 relative focus:outline-none"
            onClick={toggleMenu}
          >
            <span className="sr-only">Open main menu</span>
            <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'rotate-45' : '-translate-y-1.5'}`}></span>
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? 'opacity-0' : ''}`}></span>
              <span aria-hidden="true" className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${isMenuOpen ? '-rotate-45' : 'translate-y-1.5'}`}></span>
            </div>
          </button>

          {/* Desktop menu */}
          <nav className="hidden md:block font-space-mono">
            <Link to="/" className="mx-2 hover:text-blue-400 transition duration-300">Home</Link>
            {user ? (
              <>
                <Link to="/order" className="mx-2 hover:text-blue-400 transition duration-300">Order</Link>
                <Link to="/profile" className="mx-2 hover:text-blue-400 transition duration-300">Profile</Link>
                <button onClick={handleLogout} className="mx-2 hover:text-blue-400 transition duration-300">Logout</button>
              </>
            ) : (
              <>

                <Link to="/about" className="mx-2 hover:text-blue-400 transition duration-300">About Me</Link>
                <Link to="/portfolio" className="mx-2 hover:text-blue-400 transition duration-300">Portfolio</Link>
                <Link to="/news" className="mx-2 hover:text-blue-400 transition duration-300">News</Link>
                <Link to="/order" className="mx-2 hover:text-blue-400 transition duration-300">Order</Link>
                {/* <Link to="/register" className="mx-2 hover:text-blue-400 transition duration-300">Register</Link>
                <Link to="/login" className="mx-2 hover:text-blue-400 transition duration-300">Login</Link> */}
              </>
            )}
          </nav>
        </div>

        {/* Mobile menu */}
        <nav className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out font-space-mono ${
          isMenuOpen ? 'max-h-56 opacity-100' : 'max-h-0 opacity-0'
        }`}>
          <Link to="/" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Home</Link>
          {user ? (
            <>
              <Link to="/order" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Order</Link>
              <Link to="/profile" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Profile</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-blue-400 transition duration-300">Logout</button>
            </>
          ) : (
            <>
              <Link to="/news" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>News</Link>
              <Link to="/order" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Order</Link>
              {/* <Link to="/register" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Register</Link>
              <Link to="/login" className="block py-2 hover:text-blue-400 transition duration-300" onClick={toggleMenu}>Login</Link> */}
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Header;