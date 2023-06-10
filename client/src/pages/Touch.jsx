import LandingJumbotron from '../components/landingJumbotron/LandingJumbotron';
import JobSearchGeoTouch from '../components/JobSearchGeoTouch/JobSearchGeoTouch.jsx';
import JobSectionTouch from '../components/JobSectionTouch/JobSectionTouch.jsx';


export default function Touch() {

    return (
        <>
            <LandingJumbotron />
            <JobSearchGeoTouch />
            <JobSectionTouch sectionTitle='New Jobs' query={{ latest: true, limit: 50 }} />
            <JobSectionTouch sectionTitle='All Jobs' query={{ limit: 100 }} />
        </>
    )
}