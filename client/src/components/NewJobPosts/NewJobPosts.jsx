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

const NewJobPosts = () => {
  const [basicActive, setBasicActive] = useState('tab1');
  const handleBasicClick = (value) => {
    if (value === basicActive) {
      return;
    }
    setBasicActive(value);
  };
  return (
    <MDBContainer >
      
      <MDBTabs pills className='mb-3'>
        <MDBTypography tag='h2' className='d-flex align-self-center pt-3'>
          New Jobs
        </MDBTypography>
        <MDBTabsItem>
          <MDBTabsLink onClick={()=> handleBasicClick('tab1')} active={basicActive === 'tab1'}> 
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab2')} active={basicActive === 'tab2'}>
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleBasicClick('tab3')} active={basicActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={basicActive === 'tab1'}>
          Tab 1 content
          <MDBContainer fluid>
            <MDBRow className='d-flex'>
              <MDBCol>
                < JobCard />
              </MDBCol>
              <MDBCol>
                < JobCard />
              </MDBCol>
            </MDBRow>
          </MDBContainer>
          
          </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab2'}>
          Tab 2 content
          < JobCard />
          </MDBTabsPane>
        <MDBTabsPane show={basicActive === 'tab3'}>
          Tab 3 content
        < JobCard />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>

  )
}

export default NewJobPosts
