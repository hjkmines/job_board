import { 
    MDBCol,
    MDBContainer, 
    MDBRow,
    MDBSwitch,
    MDBDropdown,
    MDBDropdownToggle,
    MDBDropdownMenu,
    MDBDropdownItem,
    MDBInput,
    MDBBtn,
    MDBIcon

} from 'mdb-react-ui-kit'
import React from 'react'
import './JobSearch.css';

export default function App () {
  return (
    <MDBContainer fluid className='bg-white' id="searchFilterContainer"  >
        <MDBRow className='py-2' id='searchRow'>
            <MDBCol >
                    <p>Filters: </p>
            </MDBCol>
            <MDBCol >
                    <MDBSwitch id="remoteWork" label="Remote Work" />
            </MDBCol>
            <MDBCol >
                <MDBInput label="City" id="cityInput" type="text" />
            </MDBCol>
            <MDBCol >
                <MDBDropdown className="btn-group" id="stateButton">
                    <MDBDropdownToggle>
                    State
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem >NY</MDBDropdownItem>
                        <MDBDropdownItem >CA</MDBDropdownItem>
                        <MDBDropdownItem >TX</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
            <MDBCol >
            <MDBDropdown className='btn' id="stateButton">
                    <MDBDropdownToggle tag='a' role='button'>
                    Experience
                    </MDBDropdownToggle>
                    <MDBDropdownMenu>
                    <MDBDropdownItem >0 - no experience</MDBDropdownItem>
                    <MDBDropdownItem >internship ~ 6 months</MDBDropdownItem>
                    <MDBDropdownItem >1 year</MDBDropdownItem>
                    <MDBDropdownItem >2 years</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
            <MDBCol >
                <MDBDropdown>
                    <MDBDropdownToggle>Sort By:</MDBDropdownToggle>
                    <MDBDropdownMenu>
                        <MDBDropdownItem>Remote</MDBDropdownItem>
                        <MDBDropdownItem>Location</MDBDropdownItem>
                        <MDBDropdownItem>Experience</MDBDropdownItem>
                    </MDBDropdownMenu>
                </MDBDropdown>
            </MDBCol>
            <MDBCol >
                <MDBIcon fas icon="ellipsis-h" size='2x' animate='beat-fade' />
            </MDBCol>
        </MDBRow>
    </MDBContainer>
  )
}
