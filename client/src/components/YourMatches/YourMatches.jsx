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
import "./YourMatches.css";
import JobCard from '../JobCard/JobCard.jsx';



const YourMatches = () => {
  const [matchesActive, setMatchesActive] = useState('tab1');
  const handleMatchesClick = (value) => {
    if (value === matchesActive) {
      return;
    }
    setMatchesActive(value);
  };
  return (
    <MDBContainer >
      
      <MDBTabs pills className='mb-3'>
        <MDBTypography tag='h2' className='d-flex align-self-center pt-3'>
          Your Matches
        </MDBTypography>
        <MDBTabsItem>
          <MDBTabsLink onClick={()=> handleMatchesClick('tab1')} active={matchesActive === 'tab1'}> 
            Tab 1
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleMatchesClick('tab2')} active={matchesActive === 'tab2'}>
            Tab 2
          </MDBTabsLink>
        </MDBTabsItem>
        <MDBTabsItem>
          <MDBTabsLink onClick={() => handleMatchesClick('tab3')} active={matchesActive === 'tab3'}>
            Tab 3
          </MDBTabsLink>
        </MDBTabsItem>
      </MDBTabs>
      <MDBTabsContent>
        <MDBTabsPane show={matchesActive === 'tab1'}>
          Tab 1 content
          < JobCard />
          </MDBTabsPane>
        <MDBTabsPane show={matchesActive === 'tab2'}>
          Tab 2 content
          < JobCard />
          </MDBTabsPane>
        <MDBTabsPane show={matchesActive === 'tab3'}>
          Tab 3 content
        < JobCard />
        </MDBTabsPane>
      </MDBTabsContent>
    </MDBContainer>

  )
}

export default YourMatches