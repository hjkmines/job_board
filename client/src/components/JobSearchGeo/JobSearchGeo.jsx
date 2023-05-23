import './JobSearch.css';
import React from 'react'
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
    MDBIcon,
    MDBTypography,
    MDBInputGroup
} from 'mdb-react-ui-kit'



export default function JobSearchGeo () {


  return (
    <MDBContainer  fluid className='search2'>
    
        <MDBRow className='searchRow1  justify-content-start gx-0'>
            <MDBCol fluid='true' size={2} className='searchBtnCol justify-content-end gr-0'>
               <MDBBtn type="submit" className='searchSubmitBtn' >
                    Search
               </MDBBtn>
            </MDBCol>
            <MDBCol size={8}  className="filterSearch">
                <MDBInput label="Search" type='text' className="searchInput" name='search'/>
            </MDBCol>
        </MDBRow>

        
    </MDBContainer>

    // </MDBContainer>
  )
}
