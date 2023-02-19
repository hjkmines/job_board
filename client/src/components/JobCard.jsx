import React from 'react';
import {
  MDBCard,
  MDBCardBody,
  MDBCardTitle,
  MDBCardText,
  MDBCardHeader,
  MDBCardFooter,
  MDBBtn,
  MDBListGroupItem,
  MDBCardSubTitle
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBContainer>
    <MDBCard>
      <MDBCardBody>
        <MDBCardTitle className="h2">Job Title</MDBCardTitle>
        <MDBCardSubTitle>Company</MDBCardSubTitle>
        <MDBCardText>
          <ul>
            <li>
              Candidate will work as Front-End Developer utilizing SDLC
              process
            </li>
            <li>Proficient in JavaScript and TypeScript</li>
            <li>
              Familiar with AWS core technology such as Lambda, S3, Cloud
              formation, SQS
            </li>
          </ul>
          We are looking for an Intermediate Software Engineer to join our
          development team that builds and maintains high-traffic storefronts
          on the Shopify platform. The Technology team supports a dynamic end
          to end e-commerce organization and implements a variety of
          technology partners as well as custom solutions and integrations.
          The right candidate for the role is a team player and problem solver
          who enjoys learning and implementing new systems and technologies.{" "}
        </MDBCardText>
        <MDBBtn href="#" rounded className="shadow-none">
          Apply
        </MDBBtn>
      </MDBCardBody>
    </MDBCard>
  </MDBContainer>
  );
}