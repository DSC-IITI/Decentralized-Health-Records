import React, { useState, useEffect } from "react";
import { useMoralis, useWeb3Contract } from "react-moralis";
import Header from "../components/Navbar";
import contractAddress from "../../constant/contractAddress.json";
import contractAbi from "../../constant/contractAbi.json";
import { Link } from "react-router-dom";

const Patient = () => {
  const { Moralis, isWeb3Enabled, chainId: chainIdHex } = useMoralis();
  const chainId = parseInt(chainIdHex);
  const recordAddress =
    chainId in contractAddress ? contractAddress[chainId][0] : null;

  const [patientDetails, setPatientDetails] = useState({});
  const [patientAppointment, setPatientAppointment] = useState({});
  const [isLoadingDetails, setIsLoadingDetails] = useState(false);
  const [isLoadingDetailsOpen, setIsLoadingDetailOpen] = useState(false);
  const [isLoadingAppointment, setIsLoadingAppointment] = useState(false);
  // const [isLoadingDoctor, setIsLoadingDoctor] = useState(false);
  const [isLoadingAppointmentOpen, setIsLoadingAppointmentOpen] =
    useState(false);
  const [bookingFormOpen, setBookingFormOpen] = useState(false);
  const [doctorAddress, setDoctorAddress] = useState("");
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentDate, setAppointmentDate] = useState("");
  const [doctorsList, setDoctorsList] = useState([]);
  const [isLoadingDoctorsList, setIsLoadingDoctorsList] = useState(false);
  const [showDoctorTable, setShowDoctorTable] = useState(false);

  const handleSuccess = async (tx) => {
    try {
      await tx.wait(1);
      handleNewNotification(tx);
    } catch (error) {
      console.log(error);
    }
  };

  const {
    runContractFunction: getPatientDetails,
    data: patientDetailsData,
    isLoading: isPatientDetailsLoading,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "getPatientDetailes",
  });
  const handleInputChange = (event, setStateFunction) => {
    setStateFunction(event.target.value);
  };
  const {
    runContractFunction: getPatientAppointment,
    data: patientAppointmentData,
    isLoading: isPatientAppointmentLoading,
  } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "getPatientAppointment",
  });

  const { runContractFunction: bookAppointment } = useWeb3Contract({
    abi: contractAbi,
    contractAddress: recordAddress,
    functionName: "bookAppointment",
    params: {
      _docAddress: doctorAddress,
      _time: appointmentTime,
      _date: appointmentDate,
    },
  });

  const { runContractFunction: getDoctorsList, data: doctorData } =
    useWeb3Contract({
      abi: contractAbi,
      contractAddress: recordAddress,
      functionName: "DoctorsList",
    });

  // const handleGetDoctorsList = async () => {
  //   try {
  //     setIsLoadingDoctorsList(true);
  //     await getDoctorsList({ onError: (error) => console.log(error) });
  //     console.log(doctorData)
  //     const [
  //       address,
  //       name,
  //       qualifications,
  //       departmentMajor,
  //       contact,
  //       gender,
  //       Availability,
  //       dob,

  //     ] = doctorData;
  //     setDoctorsList({
  //       address,
  //       name,
  //       qualifications,
  //       departmentMajor,
  //       contact,
  //       gender,
  //       Availability,
  //       dob});
  //     setShowDoctorTable(true);
  //     setIsLoadingDoctorsList(false);
  //   } catch (error) {
  //     console.error("Error getting doctors list:", error);
  //     setIsLoadingDoctorsList(false);
  //   }
  // };
  const handleGetDoctorsList = async () => {
    try {
      setIsLoadingDoctorsList(true);
      await getDoctorsList({ onError: (error) => console.log(error) });
      const doctors = doctorData.map((doctorData) => {
        const [
          address,
          name,
          qualifications,
          departmentMajor,
          contact,
          gender,
          Availability,
          dob,
        ] = doctorData;
        return {
          address,
          name,
          qualifications,
          departmentMajor,
          contact,
          gender,
          Availability,
          dob,
        };
      });
      setDoctorsList(doctors);
      setShowDoctorTable(true);
      setIsLoadingDoctorsList(false);
    } catch (error) {
      setIsLoadingDoctorsList(false);
      console.error("Error getting doctors list:", error);
    }
  };

  const handleGetPatientDetails = async () => {
    try {
      setIsLoadingDetails(true);
      setIsLoadingDetailOpen(true);
      await getPatientDetails({ onError: (error) => console.log(error) });
      const [
        address,
        name,
        rollnuber,
        contact,
        email,
        gender,
        allergies,
        dob,
        height,
        weight,
        appointmentsCount,
        addr,
        vaccins,
      ] = patientDetailsData;
      setPatientDetails({
        address,
        name,
        rollnuber,
        contact,
        email,
        gender,
        allergies,
        dob,
        height,
        weight,
        appointmentsCount,
        addr,
      });
      setIsLoadingDetails(false);
    } catch (error) {
      setIsLoadingDetails(false);
      console.error(error);
    }
  };

  const handleGetPatientAppointment = async () => {
    try {
      setIsLoadingAppointment(true);
      setIsLoadingAppointmentOpen(true);
      await getPatientAppointment({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      const [patientAddress, DoctorAddress, time, date, status] =
        patientAppointmentData;
      // Set patient appointment state
      setPatientAppointment({
        patientAddress,
        DoctorAddress,
        time,
        date,
        status,
      });

      setIsLoadingAppointment(false);
    } catch (error) {
      setIsLoadingAppointment(false);
      console.error(error);
    }
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    try {
      //setBookingFormOpen(true);
      console.log(doctorAddress);
      await bookAppointment({
        onSuccess: handleSuccess,
        onError: (error) => console.log(error),
      });
      console.log("Appointment booked successfully!");
      //setBookingFormOpen(false);
    } catch (error) {
      console.error("Error booking appointment:", error);
    }
  };

  return (
    <div>
      <Header />
      <div className="container mx-auto mt-10 ml-16">
        <h1 className="text-2xl font-bold mb-4">Smart Contract Interaction</h1>

        <button
          onClick={handleGetPatientDetails}
          disabled={isLoadingDetails}
          className="mr-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoadingDetails ? "Loading..." : "Get Personal Details"}
        </button>
        <button
          onClick={handleGetPatientAppointment}
          disabled={isLoadingAppointment}
          className="mr-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          {isLoadingAppointment ? "Loading..." : "Get  Appointment Details"}
        </button>
        <button
          onClick={(e) => {
            setBookingFormOpen(!bookingFormOpen);
          }}
          className="mr-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Book Appointment
        </button>
        <button
          onClick={handleGetDoctorsList}
          className="mr-2 mb-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Doctors List
        </button>
        <Link
          to="/patienthome"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mb-4 mr-4 inline-block"
        >
          Back
        </Link>

        {isLoadingDetailsOpen && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-6">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">Patient Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>Roll Number:</strong>
                    {patientDetails.rollnuber}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Name:</strong>
                    {patientDetails.name}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Contact:</strong>
                    {patientDetails.contact}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Email:</strong>
                    {patientDetails.email}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Gender:</strong>
                    {patientDetails.gender}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Weight:</strong>
                    {patientDetails.weight}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Height:</strong>
                  </p>
                  <p>{patientDetails.height}</p>
                </div>

                <div className="col-span-2">
                  <p>
                    <strong>Allergies:</strong>
                    {patientDetails.allergies}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Address:</strong>
                    {patientDetails.address}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsLoadingDetailOpen(!isLoadingDetailsOpen);
              }}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Close
            </button>
          </div>
        )}

        {/* Display Patient Appointment */}
        {isLoadingAppointmentOpen && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-5">
            <div className="p-4">
              <h2 className="text-lg font-bold mb-2">Patient Details</h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p>
                    <strong>DoctorAddress:</strong>{" "}
                    {patientAppointment.DoctorAddress}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Date:</strong> {patientAppointment.date}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Status:</strong>{" "}
                    {patientAppointment.status === 0 ? "Pending" : "confirmed"}
                  </p>
                </div>
                <div>
                  <p>
                    <strong>Time:</strong> {patientAppointment.time}
                  </p>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                setIsLoadingAppointmentOpen(!isLoadingAppointmentOpen);
              }}
              type="submit"
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded"
            >
              Close
            </button>
          </div>
        )}
        {/* Booking Form */}
        {bookingFormOpen && (
          <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg overflow-hidden mt-4">
            <div className="p-6">
              <h2 className="text-xl font-bold mb-4">Book Appointment</h2>
              <form onSubmit={handleBookAppointment}>
                <div className="mb-4">
                  <label
                    htmlFor="docAddress"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Doctor Address
                  </label>
                  <input
                    type="text"
                    id="docAddress"
                    name="docAddress"
                    placeholder="Enter doctor's address"
                    value={doctorAddress}
                    onChange={(e) => handleInputChange(e, setDoctorAddress)}
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Date
                  </label>
                  <input
                    type="text"
                    id="date"
                    name="date"
                    placeholder="Select date"
                    value={appointmentDate}
                    onChange={(e) => handleInputChange(e, setAppointmentDate)}
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Time
                  </label>
                  <input
                    type="text"
                    id="time"
                    name="time"
                    placeholder="Select time"
                    value={appointmentTime}
                    onChange={(e) => handleInputChange(e, setAppointmentTime)}
                    className="border border-gray-300 rounded-md px-3 py-2 mt-1 focus:outline-none focus:ring-blue-500 focus:border-blue-500 block w-full shadow-sm sm:text-sm"
                  />
                </div>
                <button
                  type="submit"
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Confirm Appointment
                </button>
              </form>
            </div>
          </div>
        )}
        {showDoctorTable && (
          <div className="mt-2 overflow-x-auto ">
            <div style={{ marginRight: '12rem' }} className="bg-white p-4 rounded-lg shadow-md ">
              <h2 className="text-lg font-bold mb-1">Doctor List</h2>
              <table className="table-auto">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="px-4 py-2">Name</th>
                    <th className="px-4 py-2">Qualifications</th>
                    <th className="px-4 py-2">Department/Major</th>
                    <th className="px-4 py-2">Contact</th>
                    <th className="px-4 py-2">Gender</th>
                    <th className="px-4 py-2">Availability</th>
                    <th className="px-4 py-2">Date of Birth</th>
                    <th className="px-4 py-2">Address</th>
                  </tr>
                </thead>
                <tbody>
                  {doctorsList &&
                    doctorsList.map((doctor, index) => (
                      <tr
                        key={index}
                        className={index % 2 === 0 ? "bg-gray-100" : ""}
                      >
                        <td className="border px-4 py-2">{doctor.name}</td>
                        <td className="border px-4 py-2">
                          {doctor.qualifications}
                        </td>
                        <td className="border px-4 py-2">
                          {doctor.departmentMajor}
                        </td>
                        <td className="border px-4 py-2">{doctor.contact}</td>
                        <td className="border px-4 py-2">{doctor.gender}</td>
                        <td className="border px-4 py-2">
                          {doctor.Availability === 0
                            ? "Available"
                            : "Not Available"}
                        </td>
                        <td className="border px-4 py-2">{doctor.dob}</td>
                        <td className="border px-4 py-2">{doctor.address}</td>
                      </tr>
                    ))}
                </tbody>
              </table>
              <button
                onClick={() => setShowDoctorTable(!showDoctorTable)}
                type="submit"
                className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4"
              >
                Close Doctor List
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Patient;
