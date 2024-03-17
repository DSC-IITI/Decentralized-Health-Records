// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import {ownable} from "../contracts/Ownable.sol";


contract Record is ownable{

    // enum Status{
    //     Pending,
    //     Approved,
    //     OnGoing,
    //     CompletedCheckUp,
    //     Rejected,
    //     Missed
    // }
    // enum Availability{
    //     NotAvailable,
    //     Available,
    //     Arriving,
    //     Departuring
    // }

    bool Status;
    bool Availability;

    struct Patient{
        address addr;
        string name;
        string rollnuber;
        string contact;
        string email;
        string gender;
        string allergies;
        string vaccins;
        string height;
        string weight;
        string dob;
        Records[] records;

        uint appointmentsCount;
        
    }
    event RegisterPatientEvent(
        address indexed addr,
        string name,
        string contact,
        string email,
        string gender,
        string rollnumber

    );

    //Change
    struct Records {
    string reason;
    string ipfs;
    }


    struct Doctor{
        address addr;
        string name;
        string qualifications;
        string departmentMajor;
        string gender;
        string contact;
        string dob;
       //Availability available;
       bool Availability;
        string email;
    }
    event RegisterDoctorEvent(
        address indexed  addr,
        string name,
        string qualifications,
        string contact
    );

    struct Appointment{
        address patientAddress;
        address DoctorAddress;
        string time;
        string date;
        bool status;
        string prescription;
        uint serialNumber;
    }

    event AppointmentBooking(
        address DoctorAddress,
        string time,
        string date
    );

    // address public  owner;
    // constructor(){
    //     owner = msg.sender;
    // }


    mapping(address => bool) public  isPatient;
    mapping (address => Patient) public  Patients;
    mapping(address => uint) public Patientserialnumber;
    mapping (address => bool) public  isDoctor;
    mapping (address => Doctor) public Doctors;
    mapping (address => uint) public Doctorserialnumber;
    mapping (address => Appointment) public Appointments; 
    mapping (address => Appointment[]) public AppointmentsDoc;
    Patient[] public  patients;
    Doctor[] public  doctors;
    Appointment[] public appointments;

    // updating events

    event updatePatientEvent(
        address indexed addr,
        string allergies,
        string vaccins,
        string height,
        string weight,
        string dob
    );

    event updatePatientPersonalEvent(
        address indexed  addr,
        string name,
        string contact,
        string roll,
        string email,
        string gender
    );

    event updateDoctorProfessionalDetailsEvent(
        address indexed addr,
        string qualifications,
        string departmentMajor
    );

    event updateDoctorPersonalDetailsEvent(
        address indexed  addr,
        string name,
        string contact,
        string gender,
        string email,
        string dob
    );

    event updateStatus(
        address indexed addr,
        address indexed patientaddress,
        bool Status
    );

    event updateAvailability(
        address indexed addr,
        bool Availability 
    );

    function Register(string calldata _name,string calldata _contact,string calldata _email,string calldata _gender,string calldata _rollnumber) public {
        require(!isPatient[msg.sender]);
        Patient storage patient = Patients[msg.sender];
        patient.addr = msg.sender;
        patient.name = _name;
        patient.contact = _contact;
        patient.email = _email;
        patient.gender = _gender;
        patient.rollnuber = _rollnumber;
        isPatient[msg.sender] = true;
        Patientserialnumber[msg.sender] = patients.length;
        patients.push(patient);
        emit RegisterPatientEvent(msg.sender, _name, _contact, _email, _gender,_rollnumber);
    }

    function PatientsList() public view returns (Patient[] memory) {
        return patients;
    }
    function RegisterDoctor(string calldata _name,string calldata _contact,string calldata _qualifications,string calldata _email) public {
        require(!isDoctor[msg.sender]);
        Doctor storage doctor = Doctors[msg.sender];
        doctor.addr = msg.sender;
        doctor.name = _name;
        doctor.contact = _contact;
        // doctor.gender = _gender;
        doctor.qualifications = _qualifications;
        // doctor.departmentMajor = _departmentMajor;
        // doctor.dob = _dob;
        doctor.email = _email;
        isDoctor[msg.sender] = true;
        Doctorserialnumber[msg.sender] = doctors.length;
        doctors.push(doctor);
        emit RegisterDoctorEvent(msg.sender, _name, _qualifications, _contact);
    }

    function DoctorsList() public view returns(Doctor[] memory){
        return doctors;
    }

    function updatePatientmedicalRecord(string calldata _allergies,string calldata _vaccins,string calldata _height,string calldata _weight,string calldata _dob) public {
        require(isPatient[msg.sender]);
        Patient storage patient = Patients[msg.sender];
        patient.allergies = _allergies;
        patient.vaccins = _vaccins;
        patient.weight = _weight;
        patient.height = _height;
        patient.dob = _dob;
        patients[Patientserialnumber[msg.sender]] = patient;
        emit updatePatientEvent(msg.sender, _allergies, _vaccins, _height, _weight, _dob);
    }

    function updatePatientPersonal(string calldata _name,string calldata _contact,string calldata _roll,string calldata _email,string calldata _gender) public {
        require(isPatient[msg.sender]);
        Patient storage patient = Patients[msg.sender];
        patient.name = _name;
        patient.contact = _contact;
        patient.rollnuber = _roll;
        patient.email = _email;
        patient.gender = _gender;
        patients[Patientserialnumber[msg.sender]] = patient;
        emit updatePatientPersonalEvent(msg.sender, _name, _contact, _roll, _email, _gender);
    }

    function updateDocterProfessionalDetails(string calldata _qualifications,string calldata _departmentMajor) public {
        require(isDoctor[msg.sender]);
        Doctor storage doctor = Doctors[msg.sender];
        doctor.qualifications = _qualifications;
        doctor.departmentMajor = _departmentMajor;
        doctors[Doctorserialnumber[msg.sender]] = doctor;
        emit updateDoctorProfessionalDetailsEvent(msg.sender, _qualifications, _departmentMajor);
    }

    function updateDocterPersonalDetails(string calldata _name,string calldata _contact,string calldata _gender,string calldata _dob,string calldata _email) public {
        require(isDoctor[msg.sender]);
        Doctor storage doctor = Doctors[msg.sender];
        doctor.name = _name;
        doctor.contact = _contact;
        doctor.gender = _gender;
        doctor.email = _email;
        doctor.dob = _dob;
        doctors[Doctorserialnumber[msg.sender]] = doctor;
        emit updateDoctorPersonalDetailsEvent(msg.sender, _name, _contact, _gender, _email, _dob);
    }

    function bookAppointment(address _docAddress,string calldata _time,string calldata _date) public {
        require(isPatient[msg.sender]);
        require(isDoctor[_docAddress]);
        Appointment storage appointment = Appointments[msg.sender];
        appointment.patientAddress = msg.sender;
        appointment.DoctorAddress = _docAddress;
        appointment.date = _date;
        appointment.time = _time;
        appointment.serialNumber = appointments.length;
        appointments.push(appointment);
        AppointmentsDoc[_docAddress].push(appointment);
        Patient storage patient = Patients[msg.sender];
        patient.appointmentsCount++;
        emit AppointmentBooking(_docAddress, _time, _date);
        
    }
    
    function getDoctorAppointments() public view returns(Appointment[] memory) {
        require(isDoctor[msg.sender]);
        Appointment[] memory appointmentsOfDoc = AppointmentsDoc[msg.sender];
        return appointmentsOfDoc;
    }

    function getAllAppointments() public view returns(Appointment[] memory){
        return appointments;
    }
    function getPatientDetailes() public view returns(Patient memory){
        require(isPatient[msg.sender]);
        return Patients[msg.sender];
    }
    function getPatientAppointment() public view returns(Appointment memory){
        require(isPatient[msg.sender]);
        return Appointments[msg.sender];
    }
    function setStatus(uint i,bool _status) public {
        require(isDoctor[msg.sender]);
        Appointment[] storage appointmentsOfDoctors = AppointmentsDoc[msg.sender];
        uint serialNumber = appointmentsOfDoctors[i].serialNumber;
        appointmentsOfDoctors[i].status = _status;
        appointments[serialNumber].status = _status;
        address patientAddress = appointmentsOfDoctors[i].patientAddress;
        emit updateStatus(msg.sender, patientAddress, _status);
    }
    function setAvailability(bool _availability) public {
        require(isDoctor[msg.sender]);
        Doctor storage doctor = Doctors[msg.sender];
        doctor.Availability = _availability;
        uint docSerialnum = Doctorserialnumber[msg.sender];
        doctors[docSerialnum].Availability = _availability;
        emit updateAvailability(msg.sender, _availability);
    }

    //change
    function addRecord(address _addr,string memory _reason,string memory _ipfs) public onlyAdmin {
        require(isPatient[_addr],"User Not registered");
        
        Patients[_addr].records.push(Records(_reason,_ipfs));
        
    }

    

}