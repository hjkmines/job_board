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
import { Formik, Field, Form, useFormik } from 'formik';

export default function JobSearchGeo() {
  
  
  
  const formik = useFormik({
    
    initialValues: {
      search: '',
      location: '',
      radius: 40233.6,
      geoLocated: false,
      lat : '',
      long : ''
    },

    onSubmit: (values) => {
      console.log(values);
    },
  
    enableReinitialize: true,
  });

  const setLocationValue = (coords) => {
    formik.setFieldValue("long", coords[0])
    formik.setFieldValue("lat", coords[1])
  }

  return (
    <>
      <form onSubmit={formik.handleSubmit} >

        <MDBContainer fluid className='search2 mt-2 mb-4'>

          <MDBRow className='justify-content-evenly align-items-end'>
            <MDBCol fluid='true' size={2} className='searchBtnCol justify-content-end '>
              <MDBBtn type="submit" className='searchSubmitBtn' >
                Search
              </MDBBtn>
            </MDBCol>

            <MDBCol size={4} className="filterSearch">
              <label htmlFor="search" className='text-center'> Search </label>
              <input
                id='search'
                name='search'
                type='text'
                placeholder='Frontend, Python, etc'
                className="searchInput form-control"
                value = {formik.values.search}
                onChange={formik.handleChange} />
            </MDBCol>

            <MDBCol size={3} className="filterSearch">
              <label htmlFor="location" className='text-center'> Location </label>
              <input
                name="location"
                id="location"
                type='text'
                placeholder='Zip code, city'
                className="searchInput form-control"
                value = {formik.values.location}
                onChange={formik.handleChange} />
            </MDBCol>

            <MDBCol size={1} className="filterSearch">

              <MDBBtn
                className='p-2'
                color='success'
                type='button'
                name='location'
                id='location'
                onClick={() => {
                  navigator.geolocation.getCurrentPosition(function (position) {
                    const userCoords = [position.coords.longitude, position.coords.latitude];
                    setLocationValue(userCoords)
                    formik.setFieldValue('geoLocated', true)
                  });
                }}
              >
                <FontAwesomeIcon icon={faLocationCrosshairs} size='xl' />
              </MDBBtn>
            </MDBCol>

            <MDBCol size={2} >
              <div className="form-group ">
                <label htmlFor="radius" className='text-center'> Within: </label>

                <select className="form-select" name="radius" id='radius' onChange={formik.handleChange}>
                  <option value={40233.6} >25 mi</option>
                  <option value={80467.2} >50 mi</option>
                  <option value={160934} >100 mi</option>
                </select>
              </div>
            </MDBCol>
          </MDBRow>

        </MDBContainer >
      </form>

      {formik.submitCount && <JobSection query={formik.values} sectionTitle={'Your Search Results'} />
      }

    </>

  )
}
