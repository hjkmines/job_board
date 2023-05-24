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

  const toDateString = (dateISO) => {
    const date = new Date(dateISO)
    return date.toDateString()
  }

  const getLocation = (job) => {
    if (job.source === 'dice' || job.source === 'indeed') {
      if (job.state) {
        return job.city + ', ' + job.state
      }

      if (!job.city) {
        return null
      }
      return job.city

    } else if (job.source === 'greenhouse' || job.source === 'lever')  {
      if (job.location) {
        return job.location
      }
    }
  }

  return (
    <MDBContainer className="m-4 bg-transparent">
      <MDBRow className='vh-50'>
        <MDBCol >
          <MDBCard className="job-card vh-50 p-1">
            <MDBCardBody className='overflow-hidden'>
              <MDBCardTitle className="job-title vh-50  mb-0">{job.title}</MDBCardTitle>
              <MDBCardSubTitle className='fw-bold'>{job.company}</MDBCardSubTitle>
              <MDBCardSubTitle> {getLocation(job)}</MDBCardSubTitle>
              <MDBCardSubTitle>Date Posted: {toDateString(job.date)}</MDBCardSubTitle>
              <MDBCardSubTitle>{job.source}</MDBCardSubTitle>
              <MDBCardText className="mt-2 job-text ">
                {job.description.slice(0, 500)}
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

