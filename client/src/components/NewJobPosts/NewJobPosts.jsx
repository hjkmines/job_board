import React, {useState} from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBTypography,
  MDBRow,
  MDBCol
} from 'mdb-react-ui-kit';
import "./NewJobPosts.css";
import JobCard from '../JobCard/JobCard.jsx';
import WithScrollbar from '../JobCarousel/WithScrollbar';
const NewJobPosts = () => {
  const [basicActive, setBasicActive] = useState('tab1');
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  return (
    <MDBContainer className='border'>
      
        <MDBTypography tag='h2' className='d-flex align-self-center pt-3'>
          New Jobs
        </MDBTypography>
        <WithScrollbar/>

    </MDBContainer>

  )
}

export default NewJobPosts
