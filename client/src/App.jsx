import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css'

import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';
import JobSearchGeo from './components/JobSearchGeo/JobSearchGeo.jsx';
import JobSearchGeo from './components/JobSearchGeo/JobSearchGeo.jsx';
import JobSection from './components/JobSection/JobSection.jsx';
import { useState, useEffect } from 'react';
import { useState, useEffect } from 'react';

function App() {
  
  return (
    <>
      {/* react-router-dom ? broswerrouter? */}
      <LandingJumbotron />
      <JobSearchGeo/>
      <JobSection sectionTitle='New Jobs' query={{latest: true, limit: 100}} />
      <JobSection sectionTitle='All Jobs' query={{limit: 1000}} />
      <LandingJumbotron />
      <JobSearchGeo/>
      <JobSection sectionTitle='New Jobs' query={{latest: true, limit: 100}} />
      <JobSection sectionTitle='All Jobs' query={{limit: 1000}} />
    </>
  )
}

export default App