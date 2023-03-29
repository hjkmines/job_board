
import {
    MDBContainer,
    MDBTypography,

} from 'mdb-react-ui-kit';

import "./JobSection.css";
import JobCarousel from '../JobCarousel/JobCarousel';
import axios from 'axios';
import { useState, useEffect } from 'react';

const JobSection = ({ sectionTitle }) => {
    const [jobs, setJobs] = useState([])


    useEffect(() => {
        axios.get('http://localhost:5001/jobs').then((res) => {
            setJobs(res.data);
            console.log('job data');
            console.log(res.data);
        });

    }, []);


    return (
        <MDBContainer className='mb-4'>

            <MDBTypography tag='h2' className='pt-3 section-header'>
                {sectionTitle}
            </MDBTypography>

            <MDBContainer fluid className='m-2 overflow-hidden p-2 '>
                <JobCarousel jobs={jobs} />
            </MDBContainer>

        </MDBContainer>

    )
}

export default JobSection;
