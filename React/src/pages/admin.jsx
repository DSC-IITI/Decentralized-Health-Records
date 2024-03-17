import React, { useState, useEffect } from "react";
import Header from "../components/Navbar";
import { useMoralis, useWeb3Contract } from "react-moralis";
import contractAddressOwner from "../../constant/contractAddressowner.json";
import contractAbiOwner from "../../constant/contractAbiOwner.json";
import { useNotification } from "web3uikit";
import { Link } from "react-router-dom";

const YourComponent = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress = chainId in contractAddressOwner ? contractAddressOwner[chainId][0] : null;

  const [newAdmin, setNewAdmin] = useState('');
  const [load, setLoad] = useState(false);

  const handleInputChange = (event) => {
    setNewAdmin(event.target.value);
  };

  const { runContractFunction: addAdmin } = useWeb3Contract({
    abi: contractAbiOwner,
    contractAddress: recordAddress,
    functionName: 'addAdmin',
    params: { _address: newAdmin },
  });

  const { runContractFunction: removeAdmin } = useWeb3Contract({
    abi: contractAbiOwner,
    contractAddress: recordAddress,
    functionName: 'removeAdmin',
    params: { _address: newAdmin },
  });

  const { runContractFunction: setOwner } = useWeb3Contract({
    abi: contractAbiOwner,
    contractAddress: recordAddress,
    functionName: 'setOwner',
    params: { _owner: newAdmin },
  });

  const handleAddAdmin = async () => {
    try {
      setLoad(true);
      await addAdmin();
      console.log('Admin added successfully!');
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };

  const handleRemoveAdmin = async () => {
    try {
      setLoad(true);
      await removeAdmin();
      console.log('Admin removed successfully!');
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };

  const handleSetOwner = async () => {
    try {
      setLoad(true);
      await setOwner();
      console.log('Owner set successfully!');
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };

  return (
     <div>
        <Header/>
    <div className="container mx-auto mt-10 ml-16">
      <h1 className="text-2xl font-bold mb-4">Admin And Owner Ops</h1>
      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter address of new admin"
          value={newAdmin}
          onChange={handleInputChange}
          className="border border-gray-300 rounded-md p-2 mb-2"
        />
        <button
          onClick={handleAddAdmin}
          disabled={load}
          className="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2 ml-4"
        >
          {load ? 'Adding Admin...' : 'Add Admin'}
        </button>
        <button
          onClick={handleRemoveAdmin}
          disabled={load}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline mr-2"
        >
          {load ? 'Removing Admin...' : 'Remove Admin'}
        </button>
        <button
          onClick={handleSetOwner}
          disabled={load}
          className="bg-green-500 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-md focus:outline-none focus:shadow-outline"
        >
          {load ? 'Setting Owner...' : 'Set Owner'}
        </button>
        <Link to="/update_info" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 ml-2 inline-block">
        Update Patient Info
      </Link>
        <Link to="/update_doc" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 ml-2 inline-block">
        Update Doctor Info
      </Link>
        <Link to="/" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4  inline-block">
       Back Home
      </Link>
      </div>
    </div>
     </div>
  );
};

export default YourComponent;
