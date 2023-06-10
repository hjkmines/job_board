import { useState, useEffect } from 'react';
import {
    MDBContainer,
    MDBTypography,

} from 'mdb-react-ui-kit';

import "./JobSection.css";
import JobCarousel from '../JobCarouselSpring/JobCarousel';
import axios from 'axios';
import LoadingDots from '../LoadingDots/LoadingDots';

const JobSection = ({ sectionTitle, query }) => {
    const [jobs, setJobs] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    search
    useEffect(() => {
            setIsLoading(true)
            if (import.meta.env.MODE === 'development') {
                // Local dev server
                console.log('Using local dev server at port 5001')
                axios.get('http://localhost:5001/jobs', { params: { ...query } }).then((res) => {
                    setJobs([...res.data]);
                    setIsLoading(false)
                })
            } else {
                // Production server
                axios.get('https://hanawilo-jobs-server.onrender.com/jobs', { params: { ...query } }).then((res) => {
                    setJobs([...res.data]);
                    setIsLoading(false)
                })
            }
    },[query]);

    return (
        <MDBContainer fluid className='mb-4  px-5  '>

            <MDBTypography tag='h2' className='pt-3 mx-5 px-5  section-header'>
                {sectionTitle}
            </MDBTypography>

            {isLoading ?
                <div className='d-flex fluid m-2  p-2  text-center justify-content-center  '>
                    <LoadingDots className='m-4' />
                </div>
                : <MDBContainer fluid className=' mt-4 px-5 '>
                    <JobCarousel jobs={jobs} />
                </MDBContainer>}

        </MDBContainer>

    )
}

export default JobSection;
