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

export default function JobCard({ data }) {
  return (
    <MDBContainer className="m-4 bg-transparent">
      <MDBRow>
        <MDBCol >
          <MDBCard className="job-card p-1">
            <MDBCardBody>
              <MDBCardTitle className="job-title mb-0">{data.title}</MDBCardTitle>
              <MDBCardSubTitle>{data.company}</MDBCardSubTitle>
              <MDBCardText className="mt-2 job-text">
             {data.description}
              </MDBCardText>
              <MDBBtn href={data.link} rounded className="shadow-none apply-btn">
                Apply
              </MDBBtn>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
}