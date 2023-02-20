import { MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

const JobSearch = () => {
  return (
    <MDBContainer>
        <div className='d-flex align-items-center justify-content-center'>
            Job Search 
        </div>
        <div className=" d-flex row" >
            Filters Wrapper / Container
            
            <div className="d-flex col-sm">

                Remote work switch
            </div>
            <div className="d-flex col-sm">
                Location
            </div>
            <div className="d-flex col-sm">
                Experience
            </div>
            <div className="d-flex col-sm">
                Sort by: 
            </div>
            <div className="d-flex col-sm">
                more 
            </div>

        </div>
    </MDBContainer>
  )
}

export default JobSearch