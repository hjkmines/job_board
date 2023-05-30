
import {
    MDBContainer,
    MDBTypography,

} from 'mdb-react-ui-kit';

import "./JobSection.css";
import JobCarousel from '../JobCarousel/JobCarousel';
import axios from 'axios';
import { useState, useEffect } from 'react';
import LoadingDots from '../LoadingDots/LoadingDots';

const JobSection = ({ sectionTitle, query }) => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)


    useEffect(() => {
                axios.get('http://localhost:5001/jobs', { params: { ...query } }).then((res) => {
                setJobs([...res.data]);
                setIsLoading(false)
            })
    }, [query]);

    return (
        <MDBContainer className='mb-4'>

            <MDBTypography tag='h2' className='pt-3 section-header'>
                {sectionTitle}
            </MDBTypography>
            
                {isLoading ?
                 <div className='d-flex fluid m-2 overflow-hidden p-2  text-center justify-content-center '>
                    <LoadingDots className='m-4'/>
                     </div> 
                     :<MDBContainer fluid className='m-2 overflow-hidden p-2 '> 
                     <JobCarousel jobs={jobs}/> 
                     </MDBContainer>}
            
        </MDBContainer>

    )
}

export default JobSection;
