
import {
  MDBContainer,
  MDBTypography,

} from 'mdb-react-ui-kit';

import "./YourMatches.css";

import WithScrollbar from '../JobCarousel/WithScrollbar';

const YourMatches = () => {
 
  return (
    <MDBContainer className='mb-4'>

      <MDBTypography tag='h2' className='pt-3 fw-bold'>
        Your Matches
      </MDBTypography>

      <MDBContainer fluid className='m-2 overflow-hidden p-2 '>
        <WithScrollbar />
      </MDBContainer>

    </MDBContainer>

  )
}

export default YourMatches;
