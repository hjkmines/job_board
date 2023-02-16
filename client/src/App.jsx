import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import Navbar from "./components/Navbar.jsx";
import LandingJumbotron from './components/LandingJumbotron';
import {
  MDBContainer,
} from "mdb-react-ui-kit";


function App() {
 

  return (
    <MDBContainer fluid>
      {/* <Navbar /> */}
      {/* react-router-dom ? broswerrouter? */}
      <LandingJumbotron />
      
    </MDBContainer>
  )
}

export default App
