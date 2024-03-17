import { BrowserRouter as  Router,Routes, Route} from 'react-router-dom';
import Home from './pages/HomePage';
import Admin from "../src/pages/admin";
import Patient from "../src/pages/patient";
import SignUp from '../src/components/signUp';
import DoctorRegister from '../src/components/doctor_register';
import DoctorDetails from "../src/components/doctor_det";
import UpdateDoctorInfo from './components/updateDoctor';
import UpdatePatientInfo from './components/updatePatient';
import PatientHomePage from './pages/patientHome';
import DocotrHomePage from './pages/doctorHome';
//import IPFS from "./components/ipfs";
import './App.css';
function App() {
  return (
    <Router>
        <Routes>
        <Route exact path="/" element={<Home/>} />
        <Route exact path="/admin" element={<Admin/>} />
        <Route exact path="/signup" element={<SignUp/>} />
        <Route exact path="/patient" element={<Patient/>} />
        <Route exact path="/doc_reg" element={<DoctorRegister/>} />
        <Route exact path="/docs_det" element={<DoctorDetails/>} />
        <Route exact path="/update_info" element={<UpdatePatientInfo/>} />
        <Route exact path="/patienthome" element={<PatientHomePage/>} />
        <Route exact path="/doctorhome" element={<DocotrHomePage/>} />
        <Route exact path="/update_doc" element={<UpdateDoctorInfo/>} />
        
        </Routes>
      
    </Router>  
  );
}

export default App;
