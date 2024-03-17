import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Navbar';

const DocotrHomePage = () => {
  return (
    <div>
        <Header/>
        <div className="container mx-auto py-8 ml-16">
      {/* Button to register */}
      <Link to="/doc_reg" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 inline-block">
        Register
      </Link>

      {/* Button to see other details */}
      <Link to="/docs_det" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 inline-block">
        See Other Details
      </Link>
      <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 inline-block">
        Back
      </Link>
    </div>
    </div>
  );
};

export default DocotrHomePage;
