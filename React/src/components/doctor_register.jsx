import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";

const docRegister = () => {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [_name, setName] = useState('');
  const [_contact, setContact] = useState('');
  const [_qualifications, setQualifications] = useState('');
  const [_email, setEmail] = useState('');
  const [load, setLoad] = useState(false);


  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };

  const {
    runContractFunction: registerDoctor,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: 'RegisterDoctor',
    params: {
      _name,
      _contact,
      _qualifications,
      _email,
    },
  });

  const handleRegisterDoctor = async () => {
    try {
      setLoad(true);
      await registerDoctor();
      console.log('Doctor registered successfully!');
      setLoad(false);
    } catch (error) {
      setLoad(false);
      console.error(error);
    }
  };
  return (
    <div>
        <Header/>
        <div className="max-w-md mx-auto p-4 mt-10">
          <h1 className="text-lg font-bold mb-4 justify-center">Doctor Register</h1>
      <input
        type="text"
        placeholder="Name"
        value={_name}
        onChange={(e) => handleInputChange(e, setName)}
        className="border border-gray-400 rounded p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Contact"
        value={_contact}
        onChange={(e) => handleInputChange(e, setContact)}
        className="border border-gray-400 rounded p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Qualifications"
        value={_qualifications}
        onChange={(e) => handleInputChange(e, setQualifications)}
        className="border border-gray-400 rounded p-2 mb-2 w-full"
      />
      <input
        type="text"
        placeholder="Email"
        value={_email}
        onChange={(e) => handleInputChange(e, setEmail)}
        className="border border-gray-400 rounded p-2 mb-2 w-full"
      />
      <button
        onClick={handleRegisterDoctor}
        disabled={load}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        {load ? 'Loading...' : 'Register Doctor'}
      </button>
      <Link to="/doctorhome" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 ml-2 inline-block">
        Back
      </Link>
    </div>
    </div>
  );
};

export default docRegister;
