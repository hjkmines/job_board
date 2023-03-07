import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import Navbar from "./components/Navbar/Navbar.jsx";
import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';
import JobSearch from './components/JobSearch/JobSearch.jsx';
import JobSection from './components/JobSection/JobSection.jsx';

function App() {

  return (
 <>
      {/* react-router-dom ? broswerrouter? */}
      <LandingJumbotron/>
      <JobSearch />
      <JobSection sectionTitle='New Jobs'/>
      <JobSection sectionTitle='Your Matches'/>
      <JobSection sectionTitle='Local Jobs'/>

 </>
  )
}

export default App