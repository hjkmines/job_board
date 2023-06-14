import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import LandingJumbotron from './components/landingJumbotron/LandingJumbotron';
import JobSearchGeo from './components/JobSearchGeo/JobSearchGeo';
import JobSection from './components/JobSection/JobSection';

function App() {

  return (
    <>
      <LandingJumbotron/>
      <JobSearchGeo />
      <JobSection sectionTitle='New Jobs' query={{ latest: true, limit: 100 }} />
      <JobSection sectionTitle='Startup Jobs' query={{ startups: true, limit: 500 }} />
      <JobSection sectionTitle='All Jobs' query={{ limit: 1000 }} />
    </>
  )
}

export default App;