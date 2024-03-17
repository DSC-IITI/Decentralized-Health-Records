import React from "react";
import { Link } from "react-router-dom";
import backgroundImage from "../assets/img/hos_back1.avif"


const LoginCards = () => {
  return (
    <div className="bg-cover bg-center h-screen" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="flex justify-center items-center h-full">
        <div className="grid grid-cols-2 gap-8">
          {/* Admin Login Card */}
          <div className="bg-white bg-opacity-80 rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Admin Login</h2>
            <ul className="list-disc list-inside">
              <li>Can add Admins</li>
              <li>Can remove Admins</li>
              <li>Owner of the contract can transfer his ownership</li>
            </ul>
            <div className="mt-4">
              <Link to="/admin" className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600">
                Login
              </Link>
            </div>
          </div>

          {/* Patient Login Card */}
          <div className="bg-white bg-opacity-80 rounded-md shadow-md p-6">
            <h2 className="text-lg font-semibold mb-4">Patient Login</h2>
            <ul className="list-disc list-inside">
              <li>Patient/Doctor can Register itself</li>
              <li>Can See the appointments and set the Avaliability</li>
              <li>Can Book appointment of the doctor</li>
            </ul>
            <div className="mt-4 flex justify-between">
              <Link to="/patienthome" className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600">
                Patient
              </Link>
              <Link to="/doctorhome" className="text-white bg-blue-500 py-2 px-4 rounded-md hover:bg-blue-600">
                Doctor
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginCards;
