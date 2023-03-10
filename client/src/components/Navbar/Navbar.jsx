import "./Navbar.css";
import React, { useState } from 'react';
import {
  MDBContainer,
  MDBNavbar,
  MDBNavbarBrand,
  MDBNavbarToggler,
  MDBIcon,
  MDBNavbarNav,
  MDBNavbarItem,
  MDBNavbarLink,
  MDBBtn,
  MDBDropdown,
  MDBDropdownToggle,
  MDBDropdownMenu,
  MDBDropdownItem,
  MDBCollapse,
} from 'mdb-react-ui-kit';


export default function App() {
  const [showBasic, setShowBasic] = useState(false);

  return (
    <MDBNavbar expand='lg' light className="shadow-none ">
      <MDBContainer fluid className="NavbarContainer">
        <MDBNavbarBrand className="mr-2" href='#'>
          <MDBIcon fas icon="kiwi-bird" animate='shake' />
        </MDBNavbarBrand>

        <MDBNavbarToggler
          aria-controls='navbarSupportedContent'
          aria-expanded='false'
          aria-label='Toggle navigation'
          onClick={() => setShowBasic(!showBasic)}
        >
          <MDBIcon icon='bars' fas />
        </MDBNavbarToggler>

        <MDBCollapse navbar show={showBasic} >
          <MDBNavbarNav className='mr-auto mb-2 mb-lg-0 navBarCollapse'>
            <MDBNavbarItem>
              <MDBNavbarLink active aria-current='page' href='#'>
                Home
              </MDBNavbarLink>
            </MDBNavbarItem>
            <MDBNavbarItem>
              <MDBNavbarLink href='#'>Jobs</MDBNavbarLink>
            </MDBNavbarItem>

            <MDBNavbarItem>
              <MDBDropdown className="navDropDown">
                <MDBDropdownToggle tag='ul' className='toggleDropDown' role='button'>
                  User 
                </MDBDropdownToggle>
                <MDBDropdownMenu className="profileSettings">
                  <MDBDropdownItem link>Profile</MDBDropdownItem>
                  <MDBDropdownItem link>Contact / About</MDBDropdownItem>
                  <MDBDropdownItem link>Something else here</MDBDropdownItem>
                </MDBDropdownMenu>
              </MDBDropdown>
            </MDBNavbarItem>

            
          </MDBNavbarNav>

        </MDBCollapse>
      </MDBContainer>
    </MDBNavbar>
  );
}