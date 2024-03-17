import { Link } from "react-router-dom";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { useMoralis, useWeb3Contract } from "react-moralis";
import { useEffect, useState } from "react";
import { useNotification } from "web3uikit";

const SignUp = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [_name, setName] = useState("");
  const [_contact, setContact] = useState("");
  const [_gender, setGender] = useState("");
  const [_email, setEmail] = useState("");
  const [_rollnumber, setRollNum] = useState("");
  const [sview, setSview] = useState(true);
  const [load, setLoad] = useState(false);
  const [account, setAccount] = useState("");
  const [owner, setOwner] = useState("loading");

  const onnameChange = (event) => {
    setName(event.target.value);
  };
  const onphoneChange = (event) => {
    setContact(event.target.value.toString());
  };
  const ongenderChange = (event) => {
    setGender(event.target.value);
  };
  const onEmailChange = (event) => {
    setEmail(event.target.value.toString());
  };
  const onRollNumChange = (event) => {
    setRollNum(event.target.value);
  };
  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };
  const dispatch = useNotification();
  const {
    runContractFunction: Register,
    data: enterTxResponse,
    isLoading,
    isFetching,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "Register",
    params: {
      _name,
      _contact,
      _email,
      _gender,
      _rollnumber,
    },
  });

  const isLoad = () => {
    if (load) {
      return (
        <div className="flex justify-center mt-5">
          <div className="p-10">
            <div className="flex justify-center items-center">
              <div className="p-5">
                <div className="rounded-full border-solid border-4 border-gray-200 border-opacity-25 animate-spin"></div>
              </div>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  const signupView = () => {
    if (sview) {
      return (
        <div className="flex justify-center mt-4">
          <div className="bg-white bg-opacity-80 p-10 rounded-md shadow-md w-96">
            <div className="flex justify-center mb-4">
              <h2 className="text-lg font-semibold">Register as Patient</h2>
            </div>
            <div>
              <input
                className="border-b border-black mb-4 w-full"
                type="text"
                placeholder="Name"
                value={_name}
                onChange={onnameChange}
              />
            </div>
            <div>
              <input
                className="border-b border-black mb-4 w-full"
                type="text"
                placeholder="Phone"
                value={_contact}
                onChange={onphoneChange}
              />
            </div>
            <div>
              <select
                className="border-b border-black mb-4 w-full"
                value={_gender}
                onChange={ongenderChange}
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <div>
              <input
                className="border-b border-black mb-4 w-full"
                type="number"
                placeholder="Roll NUmber"
                value={_rollnumber}
                onChange={onRollNumChange}
              />
            </div>
            <div>
              <input
                className="border-b border-black mb-4 w-full"
                type="email"
                placeholder="Email"
                value={_email}
                onChange={onEmailChange}
              />
            </div>
            <div className="flex justify-center">
              <button
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg"
                onClick={onSignup}
              >
                Sign Up
              </button>
            </div>
          </div>
        </div>
      );
    }
    return null;
  };
  const onSignup = async () => {
    setSview(false);
    setLoad(true);
    try {
      await Register({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      setLoad(false);
      setSview(true);
    } catch (e) {
      alert("Error");
      setLoad(false);
      setSview(true);
    }
  };
  return (
    <div className=" min-h-screen">
      <Header />
      <div className="text-center mt-16">
        <span className="ml-2">
          <Link to="/patienthome" style={{ color: "black" }}>
            Go back
          </Link>
        </span>
      </div>
      {isLoad()}
      {signupView()}
    </div>
  );
};

export default SignUp;
