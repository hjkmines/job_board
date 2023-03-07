// styles - react & other assets  //
import  "./LandingJumbotron.css";
import React from 'react';
// import JobBoardBG from "../../assets/job_board_bg.svg";

//  MDB  //
import {
  MDBContainer,
  MDBBtn
} from 'mdb-react-ui-kit';

function LandingJumbotron() {

  return (
    <>
      <MDBContainer fluid className='text-center bg-jumbo p-0'>
          <div className='d-flex align-items-center justify-content-center vh-100 vw-100 m-0 pt-1'>
            <div className='text-black '>
              <h1  className='mb-5 tagGrab' >Job Stuff Made Easy!</h1>
              <h4 className='mb-5 tagLine'>Always up to Date, Always Relevant</h4>
              <div className="d-grid gap-2 col-6 mx-auto text-white">
                <MDBBtn rounded className="my-2"
                id="letsGo" color="#029C53" size="lg" href="#jobs">
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