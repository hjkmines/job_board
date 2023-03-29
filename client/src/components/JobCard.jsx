import './JobCard.css'
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBBtn,
  MDBCardSubTitle
} from "mdb-react-ui-kit";

export default function JobCard({ job }) {
  return (
    <MDBCard className="job-card p-1">
      <MDBCardBody>
        <MDBCardTitle className="job-title mb-0">{job.job_title}</MDBCardTitle>
        <MDBCardSubTitle>{job.company}</MDBCardSubTitle>
        <MDBCardText className="mt-2 job-text">
          {job.description}
        </MDBCardText>
        <MDBBtn href={job.link} rounded className="shadow-none apply-btn">
          Apply
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  );
}