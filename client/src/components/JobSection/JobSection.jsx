
import {
    MDBContainer,
    MDBTypography,
  
  } from 'mdb-react-ui-kit';
  
  import "./JobSection.css";
  
  import WithScrollbar from '../JobCarousel/WithScrollbar';
  
  const JobSection = ({sectionTitle}) => {
   
    return (
      <MDBContainer className='mb-4'>
  
        <MDBTypography tag='h2' className='pt-3 section-header'>
          {sectionTitle}
        </MDBTypography>
  
        <MDBContainer fluid className='m-2 overflow-hidden p-2 '>
          <WithScrollbar />
        </MDBContainer>
  
      </MDBContainer>
  
    )
  }
  
  export default JobSection;
  