import {
  MDBContainer,
  MDBTypography
} from 'mdb-react-ui-kit';
import "./LocalJobs.css";
import WithScrollbar from '../JobCarousel/WithScrollbar';

const LocalJobs = () => {


  return (

    <MDBContainer className='mb-4'>

      <MDBTypography tag='h2' className='pt-3 fw-bold'>
        Local Jobs
      </MDBTypography>

      <MDBContainer fluid className='m-2 overflow-hidden p-2 '>
        <WithScrollbar />
      </MDBContainer>

    </MDBContainer>



  )
}

export default LocalJobs