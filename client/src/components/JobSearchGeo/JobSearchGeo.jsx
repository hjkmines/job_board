import './JobSearchGeo.css';
import React, { useState } from 'react'
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
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import JobSection from '../JobSection/JobSection';
import { Formik, Field, Form } from 'formik';

export default function JobSearchGeo() {
  const [query, setQuery] = useState({})


  console.log(query)
  return (
    <>
      <Formik
        initialValues={{
          search: '',
          location: [],
          radius: '',
        }}

        onSubmit={(values) => console.log(values)}

      >

        <Form>

          <MDBContainer fluid className='search2 mt-2 mb-4'>

            <MDBRow className='justify-content-evenly align-items-end'>
              <MDBCol fluid='true' size={2} className='searchBtnCol justify-content-end '>
                <MDBBtn type="submit" className='searchSubmitBtn' >
                  Search
                </MDBBtn>
              </MDBCol>

              <MDBCol size={4} className="filterSearch">
                <label htmlFor="search" className='text-center'> Search </label>
                <Field id='search' name='search' type='text' placeholder='Frontend, Python, etc' className="searchInput form-control" />
              </MDBCol>

              <MDBCol size={3} className="filterSearch">
                <label htmlFor="location" className='text-center'> Location </label>
                <Field name="location" id="location" type='text' placeholder='Zip code, city' className="searchInput form-control" />
              </MDBCol>

              <MDBCol size={1} className="filterSearch">
              
                <Field as ='button' className='p-2 success' type = 'button' onClick={(values) => values.location = navigator.geolocation.getCurrentPosition((pos) => { return [pos.coords.longitude, pos.coords.latitude] })}>
                  <FontAwesomeIcon icon={faLocationCrosshairs} size='xl' />
                </Field>
              </MDBCol>

              <MDBCol size={2} >
                <div className="form-group ">
                  <label htmlFor="radius" className='text-center'> Within: </label>

                  <Field as='select' className="form-select" name="radius" >
                    <option value={null} ></option>
                    <option value={25} >25 mi</option>
                    <option value={50} >50 mi</option>
                    <option value={100} >100 mi</option>
                  </Field>
                </div>
              </MDBCol>
            </MDBRow>

          </MDBContainer >
        </Form>
      </Formik >

      {(query.location || query.search) && <JobSection query={query} sectionTitle={'Your Search Results'} />
      }

    </>

  )
}
