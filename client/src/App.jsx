import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import Navbar from "./components/Navbar.jsx";
import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';
import {
  MDBContainer,
} from "mdb-react-ui-kit";
import FillerSpace from './components/FillerSpace';


function App() {
 

  return (
 <>
      {/* <Navbar /> */}
      {/* react-router-dom ? broswerrouter? */}

      <LandingJumbotron />
      {/* <FillerSpace /> */}
      
 </>
      
  
  )
}

export default App
