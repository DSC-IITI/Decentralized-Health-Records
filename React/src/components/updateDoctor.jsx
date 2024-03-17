import React, { useState } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { Link } from "react-router-dom";
import { useNotification } from "web3uikit";

const UpdateDoctorInfo = () => {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const dispatch = useNotification();

  const [showProfessionalForm, setShowProfessionalForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [_qualifications, setQualifications] = useState("");
  const [_departmentMajor, setDepartmentMajor] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [email, setEmail] = useState("");

  const { runContractFunction: updateDoctorProfessionalDetails } =
    useWeb3Contract({
      abi: contractAbi,
      contractAddress: recordAddress,
      functionName: "updateDocterProfessionalDetails",
      params: {
        _qualifications,
        _departmentMajor,
      },
    });

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const { runContractFunction: updateDoctorPersonalDetails } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "updateDocterPersonalDetails",
    params: {
      _name: name,
      _contact: contact,
      _gender: gender,
      _dob: dob,
      _email: email,
    },
  });

  const handleUpdateProfessionalDetails = async () => {
    try {
      await updateDoctorProfessionalDetails({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      console.log("Doctor professional details updated successfully!");
    } catch (error) {
      console.error("Error updating doctor professional details:", error);
    }
  };

  const handleUpdatePersonalInfo = async () => {
    try {
      await updateDoctorPersonalDetails({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      console.log("Doctor personal information updated successfully!");
    } catch (error) {
      console.error("Error updating doctor personal information:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 ml-16">
        <button
          onClick={() => setShowProfessionalForm(!showProfessionalForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-2"
        >
          Update Professional Details
        </button>

        <button
          onClick={() => setShowPersonalForm(!showPersonalForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-2"
        >
          Update Personal Information
        </button>
        <Link
          to="/admin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 ml-2 inline-block"
        >
          Go back
        </Link>

{showProfessionalForm && (
  <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Doctor Professional Details</h2>
      <div className="mb-4">
        <label htmlFor="docQualifications" className="block text-sm font-medium text-gray-700">
          Qualifications
        </label>
        <input
          type="text"
          id="docQualifications"
          name="docQualifications"
          placeholder="Enter qualifications"
          value={_qualifications}
          onChange={(e) => setQualifications(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="docDepartment" className="block text-sm font-medium text-gray-700">
          Department Major
        </label>
        <input
          type="text"
          id="docDepartment"
          name="docDepartment"
          placeholder="Enter department major"
          value={_departmentMajor}
          onChange={(e) => setDepartmentMajor(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <button
        onClick={handleUpdateProfessionalDetails}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Update Professional Details
      </button>
    </div>
  </div>
)}

{showPersonalForm && (
  <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Update Doctor Personal Information</h2>
      <div className="mb-2">
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="contact" className="block text-sm font-medium text-gray-700">
          Contact
        </label>
        <input
          type="text"
          id="contact"
          name="contact"
          placeholder="Enter contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="gender" className="block text-sm font-medium text-gray-700">
          Gender
        </label>
        <input
          type="text"
          id="gender"
          name="gender"
          placeholder="Enter gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="dob" className="block text-sm font-medium text-gray-700">
          Date of Birth
        </label>
        <input
          type="text"
          id="dob"
          name="dob"
          placeholder="Enter date of birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <div className="mb-2">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
        />
      </div>
      <button
        onClick={handleUpdatePersonalInfo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      >
        Update Personal Information
      </button>
    </div>
  </div>
)}

      </div>
    </div>
  );
};

export default UpdateDoctorInfo;
