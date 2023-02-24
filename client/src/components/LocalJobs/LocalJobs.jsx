import React, {useState} from 'react';
import {
  MDBTabs,
  MDBTabsItem,
  MDBTabsLink,
  MDBTabsContent,
  MDBTabsPane,
  MDBContainer,
  MDBTypography
} from 'mdb-react-ui-kit';
import "./LocalJobs.css";
import JobCard from '../JobCard/JobCard.jsx';



const LocalJobs = () => {
  const [localActive, setLocalActive] = useState('tab1');
  const handleLocalClick = (value) => {
    if (value === localActive) {
      return;
    }
    setLocalActive(value);
  };
  return (
    <MDBContainer >
      
      <MDBTabs pills className='mb-3'>
        <MDBTypography tag='h2' className='d-flex align-self-center pt-3'>
          Local Jobs
        </MDBTypography>
        <MDBTabsItem>
          <MDBTabsLink onClick={()=> handleLocalClick('tab1')} active={localActive === 'tab1'}> 
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleLocalClick('tab2')} active={localActive === 'tab2'}>
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleLocalClick('tab3')} active={localActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={localActive === 'tab1'}>
          Tab 1 content
          < JobCard />
          </MDBTabsPane>
        <MDBTabsPane show={localActive === 'tab2'}>
          Tab 2 content
          < JobCard />
          </MDBTabsPane>
        <MDBTabsPane show={localActive === 'tab3'}>
          Tab 3 content
        < JobCard />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>

  )
}

export default LocalJobs