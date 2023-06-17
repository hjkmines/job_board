import './JobCard.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBRow,
  MDBCol,
  MDBContainer,
  MDBCardSubTitle
} from "mdb-react-ui-kit";
import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheck, faArrowRotateRight} from '@fortawesome/free-solid-svg-icons'

export default function JobCard({ job }) {
  
  const [applied, setApplied] =useState(false)

  const toDateString = (dateISO) => {
    const date = new Date(dateISO)
    return date.toDateString()
  }

  const getLocation = (job) => {
    if (job.source === 'dice' || job.source === 'indeed') {
      if (job.state) {
        return job.city + ', ' + job.state
      }

      if (job.city) {
        return job.city
      }

    } else if (job.source === 'greenhouse' || job.source === 'lever')  {
      if (job.location) {
        return job.location
      }
    }
  }

  return (
    <MDBContainer className="mx-4  bg-transparent h-100">
          <MDBCard className="job-card" style={{'maxHeight': '95%', 'minHeight': '95%' }}>
            <MDBCardBody className='d-flex flex-column mb-2 overflow-hidden'>
              <MDBCardTitle className="job-title  mb-0">{job.title}</MDBCardTitle>
              <MDBCardSubTitle className='fw-bold'>{job.company}</MDBCardSubTitle>
              <MDBCardSubTitle> {getLocation(job)}</MDBCardSubTitle>
              <MDBCardSubTitle>Date Posted: {toDateString(job.date)}</MDBCardSubTitle>
              {/* <MDBCardSubTitle>Date Posted: {job.date}</MDBCardSubTitle> */}
              {/* <MDBCardSubTitle>{job.source}</MDBCardSubTitle> */}
              {job.description && <MDBCardText className="mt-2 job-text">
                {job.description.slice(0,500)}
              </MDBCardText>}

              {applied ? <MDBRow className='d-flex align-items-center w-100 mt-auto'> 
                <MDBBtn rounded className="shadow-none applied-btn mt-auto me-2 w-50" href={job.link} target='_blank' >
              <FontAwesomeIcon icon={faCheck} /> Good Luck!
              </MDBBtn>
              <MDBBtn outline floating className='reset-btn' size='sm' onClick={()=> setApplied(false)} > 
              <FontAwesomeIcon icon={faArrowRotateRight} size='xl' />
              </MDBBtn>
                </MDBRow>
              : <MDBBtn href={job.link} target='_blank' rounded className="shadow-none apply-btn mt-auto" onClick={()=> setApplied(!applied)}>
                Apply
              </MDBBtn>
                 }

            </MDBCardBody>
          </MDBCard>
   
    </MDBContainer>
  );
}
