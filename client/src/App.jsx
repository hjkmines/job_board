import 'mdb-react-ui-kit/dist/css/mdb.min.css';
import "@fortawesome/fontawesome-free/css/all.min.css";
import './App.css';
import JobSection from './components/JobSection/JobSection.jsx';
import LandingJumbotron from './components/LandingJumbotron/LandingJumbotron.jsx';
import JobSearchGeo from './components/JobSearchGeo/JobSearchGeo.jsx';

function App() {

  return (
    <>
      <LandingJumbotron />
      <JobSearchGeo />
      <JobSection sectionTitle='New Jobs' query={{ latest: true, limit: 100 }} />
      <JobSection sectionTitle='All Jobs' query={{ limit: 1000 }} />
    </>
  )
}

export default App;