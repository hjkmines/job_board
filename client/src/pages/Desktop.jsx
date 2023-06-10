import LandingJumbotron from '../components/landingJumbotron/LandingJumbotron';
import JobSearchGeo from '../components/JobSearchGeo/JobSearchGeo.jsx';
import JobSection from '../components/JobSection/JobSection.jsx';



function Desktop() {
 
  
  return (
    <>
      {/* {/* react-router-dom ? broswerrouter? */}
      <LandingJumbotron />
      <JobSearchGeo/>
      <JobSection query={{'latest': true}} sectionTitle={'New Jobs'}/>
      <JobSection query={{'limit' : 500}} sectionTitle={'All Jobs'}/>
   
    </>
  )
}

export default Desktop;