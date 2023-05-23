// styles - react & other assets  //
import  "./LandingJumbotron.css";
import React from 'react';
// import JobBoardBG from "../../assets/job_board_bg.svg";

//  MDB  //
import {
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';
import Navbar from "../Navbar/Navbar.jsx";
function LandingJumbotron() {

  return (
    <>
      <MDBContainer fluid className='text-center bg-jumbo p-0 vh-100  m-0'>
        <Navbar/>
          <div className='d-flex align-items-center justify-content-center h-100  m-0 p-0'>
            <div className='text-black '>
              <h1  className='mb-2 tagGrab' >Job Stuff Made Easy!</h1>
              <h4 className='mb-4 tagLine'>Always up to Date, Always Relevant</h4>
              <div className="d-grid gap-2 col-6 mx-auto ">
                <MDBBtn rounded className="my-2 mx-auto action-btn shadow-none "
                id="letsGo" size="md" href="!#">
                  LET'S GO!
                </MDBBtn>
              </div>
             
            </div>
          </div>

      </MDBContainer>

    </>
  );
}

export default LandingJumbotron;