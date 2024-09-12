import React, { useState, useEffect } from 'react';
import { useAuth } from '../hooks/useAuth';  // Make sure this path is correct

const Profile = () => {
  const { user } = useAuth();
  const [showDetails, setShowDetails] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  // Dummy additional user data (replace with real data in a production app)
  const additionalUserData = {
    name: "John Doe",
    age: 30,
    occupation: "Quantum Engineer",
    favoriteColor: "Blue",
    lastLogin: new Date().toLocaleString()
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-black to-purple-900 transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0'}`}>
      <div className="relative max-w-2xl w-full">
        <div className="absolute inset-0 bg-blue-500 rounded-lg animate-pulse mix-blend-multiply filter blur-xl opacity-75"></div>
        <div className="absolute inset-0 bg-purple-500 rounded-lg animate-pulse mix-blend-multiply filter blur-xl opacity-75 animation-delay-1000"></div>
        <div className="relative bg-gray-900 bg-opacity-80 backdrop-filter backdrop-blur-sm p-8 rounded-lg shadow-2xl z-10">
          <h2 className="text-3xl font-bold mb-6 text-blue-300">User Profile</h2>
          {user && (
            <div className="space-y-4">
              <p className="text-cyan-300">Email: {user.email}</p>
              <p className="text-cyan-300">UID: {user.uid}</p>
              <button 
                onClick={() => setShowDetails(!showDetails)}
                className="mt-4 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-500 transition duration-300"
              >
                {showDetails ? 'Hide Details' : 'Show Details'}
              </button>
              {showDetails && (
                <div className="mt-6 space-y-2 animate-fadeIn">
                  <p className="text-green-300">Name: {additionalUserData.name}</p>
                  <p className="text-green-300">Age: {additionalUserData.age}</p>
                  <p className="text-green-300">Occupation: {additionalUserData.occupation}</p>
                  <p className="text-green-300">Favorite Color: {additionalUserData.favoriteColor}</p>
                  <p className="text-green-300">Last Login: {additionalUserData.lastLogin}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Profile;