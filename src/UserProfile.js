import React from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const navigate = useNavigate();

  const handleEditProfileClick = () => {
    navigate('/editprofile');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4">User Profile</h2>
        <p className="mb-2"><strong>Name:</strong> Abdul Hadi</p>
        <p className="mb-2"><strong>Email:</strong> hadi@example.com</p>
        <p className="mb-4"><strong>Phone:</strong> 123-456-7890</p>
        <button
          onClick={handleEditProfileClick}
          className="bg-purple-900 text-white px-4 py-2 rounded w-full"
        >
          Edit Profile
        </button>
      </div>
    </div>
  );
};

export default Profile;
