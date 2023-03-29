import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';
import JobSearch from './components/JobSearch/JobSearch.jsx';
import JobSection from './components/JobSection/JobSection.jsx';
import axios from 'axios';
import { useState, useEffect } from 'react';

function App() {
  const [jobs, setJobs] = useState([])


  useEffect(() => {
    axios.get('http://localhost:5001/jobs').then((res) => {
      setJobs(res.data);
      console.log(res.data)
    });

  }, []);

  return (
    <>
      {/* react-router-dom ? broswerrouter? */}
      <LandingJumbotron />
      <JobSearch />
      <JobSection sectionTitle='New Jobs' />
   
    </>
  )
}

export default App