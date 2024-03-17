import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { Link } from "react-router-dom";

const DocterDet = () => {
  const { chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [doctorAppointments, setDoctorAppointments] = useState();
  const [_status, setSelectedStatus] = useState("");
  const [doctorAvailability, setDoctorAvailability] = useState(false);

  const {
    runContractFunction: getDoctorAppointments,
    data: doctorAppointmentsData,
    isLoading: isDoctorAppointmentsLoading,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "getDoctorAppointments",
  });

  const { runContractFunction: setStatus } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "setStatus",
    params: {
      i: 0,
      _status: _status,
    },
  });

  const { runContractFunction: setAvailability } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "setAvailability",
    params: {
      _availability: doctorAvailability,
    },
  });

  useEffect(() => {
    const fetchDoctorAppointments = async () => {
      try {
        await getDoctorAppointments();
        console.log(doctorAppointmentsData);
        setDoctorAppointments(doctorAppointmentsData);
      } catch (error) {
        console.error("Error fetching doctor appointments:", error);
      }
    };
    fetchDoctorAppointments();
  }, [getDoctorAppointments]);

  const handleSetStatus = async (i) => {
    try {
      await setStatus();
    } catch (error) {
      console.error("Error updating appointment status:", error);
    }
  };

  const handleSetAvailability = async () => {
    try {
      await setAvailability();
    } catch (error) {
      console.error("Error updating doctor availability:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 ml-16">
        <h2 className="text-lg font-bold mb-4">Doctor Appointments</h2>
        {isDoctorAppointmentsLoading ? (
          <p>Loading doctor appointments...</p>
        ) : (
          <div
            style={{ marginRight: "12rem" }}
            className="overflow-x-auto bg-white rounded-lg shadow-md p-4"
          >
            <table className="table-auto border-collapse w-full">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Patient Address</th>
                  <th className="border px-4 py-2">Date</th>
                  <th className="border px-4 py-2">Time</th>
                  <th className="border px-4 py-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {doctorAppointments &&
                  doctorAppointments.map((appointment, index) => (
                    <tr
                      key={index}
                      className={index % 2 === 0 ? "bg-gray-100" : ""}
                    >
                      <td className="border px-4 py-2">{appointment[1]}</td>
                      <td className="border px-4 py-2">{appointment[2]}</td>
                      <td className="border px-4 py-2">{appointment[3]}</td>
                      <td className="border px-4 py-2">
                        <select
                          onChange={(e) => setSelectedStatus(e.target.value)}
                          value={_status}
                          className="border rounded-md px-2 py-1 mr-2 focus:outline-none focus:border-blue-500"
                        >
                          <option value="">Select Status</option>
                          <option value={0}>Pending</option>
                          <option value={1}>Completed CheckUp</option>
                        </select>
                        <button
                          onClick={() => handleSetStatus(index)}
                          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded inline-block"
                        >
                          Update Status
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}

        <h2 className="text-lg font-bold mt-8 mb-4">Set Doctor Availability</h2>
        <div>
          <select
            onChange={(e) => setDoctorAvailability(e.target.value)}
            value={doctorAvailability}
          >
            <option value="">Select Availability</option>
            <option value={false}>NotAvailable</option>
            <option value={true}>Available</option>
          </select>
          <button
            onClick={handleSetAvailability}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-4 mr-4 ml-2 inline-block"
          >
            Update Status
          </button>
          <Link
            to="/patienthome"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded mb-4 mr-4 ml-2 inline-block"
          >
            Back
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DocterDet;
