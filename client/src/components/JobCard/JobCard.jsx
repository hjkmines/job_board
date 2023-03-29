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

export default function JobCard({ job }) {
  return (
    <MDBContainer className="m-4 bg-transparent">
      <MDBRow className='vh-50 border'>
        <MDBCol >
          <MDBCard className="job-card vh-50 p-1">
            <MDBCardBody className='overflow-hidden'>
              <MDBCardTitle className="job-title vh-50  mb-0">{job.job_title}</MDBCardTitle>
              <MDBCardSubTitle>{job.company}</MDBCardSubTitle>
              <MDBCardText className="mt-2 job-text ">
             {job.description.slice(0,500)}
              </MDBCardText>
              <MDBBtn href={job.link} target='_blank' rounded className="shadow-none apply-btn">
                Apply
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}

