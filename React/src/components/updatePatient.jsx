import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { Link } from "react-router-dom";
import { useNotification } from "web3uikit";

const UpdatePatientInfo = () => {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;
  const dispatch = useNotification();

  const [showMedicalForm, setShowMedicalForm] = useState(false);
  const [showPersonalForm, setShowPersonalForm] = useState(false);
  const [_allergies, setAllergies] = useState("");
  const [_vaccins, setVaccins] = useState("");
  const [_height, setHeight] = useState("");
  const [_weight, setWeight] = useState("");
  const [_dob, setDob] = useState("");
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [roll, setRoll] = useState("");
  const [email, setEmail] = useState("");
  const [gender, setGender] = useState("");

  const { runContractFunction: updatePatientMedicalRecord } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "updatePatientmedicalRecord",
    params: {
      _allergies,
      _vaccins,
      _weight,
      _height,
      _dob,
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

  const { runContractFunction: updatePatientPersonal } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "updatePatientPersonal",
    params: {
      _name: name,
      _contact: contact,
      _roll: roll,
      _email: email,
      _gender: gender,
    },
  });

  const handleUpdateMedicalRecord = async () => {
    try {
      await updatePatientMedicalRecord({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      console.log("Patient medical record updated successfully!");
    } catch (error) {
      console.error("Error updating patient medical record:", error);
    }
  };

  const handleUpdatePersonalInfo = async () => {
    try {
      await updatePatientPersonal({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      console.log("Patient personal information updated successfully!");
    } catch (error) {
      console.error("Error updating patient personal information:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto py-8 ml-16">
        <button
          onClick={() => setShowMedicalForm(!showMedicalForm)}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 ml-2"
        >
          Update Medical Record
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

        {showMedicalForm && (
  <div className="mb-8 max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Update Patient Medical Record</h2>
      <div className="flex flex-wrap">
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Allergies"
          value={_allergies}
          onChange={(e) => setAllergies(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Vaccins"
          value={_vaccins}
          onChange={(e) => setVaccins(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Height"
          value={_height}
          onChange={(e) => setHeight(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Weight"
          value={_weight}
          onChange={(e) => setWeight(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Date of Birth"
          value={_dob}
          onChange={(e) => setDob(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdateMedicalRecord}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Update Medical Record
      </button>
    </div>
  </div>
)}

{showPersonalForm && (
  <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
    <div className="p-6">
      <h2 className="text-lg font-bold mb-4">Update Patient Personal Information</h2>
      <div className="flex flex-wrap">
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Contact"
          value={contact}
          onChange={(e) => setContact(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Roll Number"
          value={roll}
          onChange={(e) => setRoll(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          className="w-60 mb-4 p-2 border border-gray-300 rounded mx-2 focus:outline-none focus:border-blue-500"
          type="text"
          placeholder="Gender"
          value={gender}
          onChange={(e) => setGender(e.target.value)}
        />
      </div>
      <button
        onClick={handleUpdatePersonalInfo}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
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

export default UpdatePatientInfo;
