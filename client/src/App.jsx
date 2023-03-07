import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'
import Navbar from "./components/Navbar/Navbar.jsx";
import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';

import NewJobPosts from './components/NewJobPosts/NewJobPosts.jsx';
import JobSearch from './components/JobSearch/JobSearch.jsx';
import YourMatches from './components/YourMatches/YourMatches.jsx'
import LocalJobs from './components/LocalJobs/LocalJobs.jsx';
import JobCarousel from './components/JobCarousel/JobCarousel.jsx';

function App() {
 

  return (
 <>
      {/* react-router-dom ? broswerrouter? */}
      <Navbar />
      <LandingJumbotron />
      
      <JobSearch />
      <NewJobPosts /> 
      <YourMatches />
      <LocalJobs />
      
 </>
      
  
  )
}

export default App
