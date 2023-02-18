import { MDBContainer } from 'mdb-react-ui-kit'
import React from 'react'

const JobSearch = () => {
  return (
    <MDBContainer>
        <div className='d-flex align-items-center justify-content-center'>
            Job Search 
        </div>
        <div className="d-flex">
            Filters Wrapper / Container
            
            <div className="d-flex">
                Remote work switch
            </div>
            <div className="d-flex">
                Location
            </div>
            <div className="d-flex">
                Experience
            </div>
            <div className="d-flex">
                Sort by: 
            </div>
            <div className="d-flex">
                more 
            </div>

        </div>
    </MDBContainer>
  )
}

export default JobSearch