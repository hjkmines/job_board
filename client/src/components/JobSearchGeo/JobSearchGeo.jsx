import './JobSearchGeo.css';
import React, { useState } from 'react'
import {
  MDBCol,
  MDBContainer,
  MDBRow,
  MDBBtn
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import JobSection from '../JobSection/JobSection';
import { useFormik } from 'formik';

export default function JobSearchGeo() {
  const [query, setQuery] = useState({})
  const [geoLocationChecked, setGeoLocationChecked] = useState(false)
  const [remoteChecked, setRemoteChecked] = useState(false)

  const formik = useFormik({

    initialValues: {

      search: '',
      location: '',
      radius: 40233.6,
      long: null,
      lat: null,
      geoLocation: null,
      remoteOnly: null
    },

    onSubmit: (values) => {
      if (geoLocationChecked) values.geoLocation = true
      if (remoteChecked) values.remoteOnly = true
      console.log(values)
      setQuery({ ...values })
    }
  });

  return (
    <>
      <MDBContainer fluid >
        <form onSubmit={formik.handleSubmit} >
          <MDBRow className='d-flex justify-content-center align-items-end mx-0 py-3  px-lg-4  px-sm-2 '>
            {/* Column for Search and query input */}
            <MDBCol xl='6' xs='12' >

              <MDBRow className=' d-flex justify-content-center  align-items-end'>

                <MDBCol size={2} md={1} className=' d-lg-none d-xs-block' >
                  <MDBBtn floating size='lg' type="submit" className='action-btn  shadow-none ' >
                    <FontAwesomeIcon icon={faMagnifyingGlass} />
                  </MDBBtn>
                </MDBCol>

                <MDBCol size={1} lg={2} xl={4} className=' d-none d-lg-block' >
                  <MDBBtn rounded size='lg' type="submit" className='action-btn fw-bold  shadow-none w-100'>
                    Search
                  </MDBBtn>
                </MDBCol>

                <MDBCol size={10} md={11} lg={10} xl={8} >
                  <label htmlFor="search" className='fw-bold'>Search</label>
                  <input
                    id='search'
                    name='search'
                    type='text'
                    placeholder='Frontend, Python, etc'
                    className="searchInput form-control"
                    value={formik.values.search}
                    onChange={formik.handleChange} />
                </MDBCol>
              </MDBRow>
            </MDBCol>

            {/* Column for location stuff */}
            <MDBCol xl='6' xs='12' >

              <MDBRow className='d-flex justify-content-center align-items-end  '>
                {/* Location input */}
                <MDBCol xl={6} md={5} sm={8}>
                  <label htmlFor="location" className='fw-bold'>Location</label>
                  <input
                    name="location"
                    id="location"
                    type='text'
                    placeholder='Zip code, city'
                    className="searchInput form-control"
                    value={formik.values.location}
                    disabled={remoteChecked || geoLocationChecked}
                    onChange={formik.handleChange} />
                </MDBCol>

                {/* Radius dropdown */}
                <MDBCol xl={2} md={3} sm={4} >
                  <div className="form-group ">
                    <label htmlFor="radius" className='fw-bold'>Within</label>

                    <select className="form-select select-round"
                      name="radius"
                      id='radius'
                      onChange={formik.handleChange}
                      disabled={remoteChecked}>
                      {/* Values are in meters */}
                      <option value={40233.6} >25 mi</option>
                      <option value={80467.2} >50 mi</option>
                      <option value={160934} >100 mi</option>
                    </select>
                  </div>
                </MDBCol>

                {/* Remote and geoLocation buttons */}
                <MDBCol xl='2' md={2} size={6} >
                  {/* geoLocation switch */}
                  <label htmlFor="geoLocation" className='fw-bold'>Your location</label>
                  <label className="switch">
                    <input type="checkbox"
                      id='geoLocationSwitch'
                      className='mx-1'
                      onChange={(e) => {
                        // Set geoLocation switch
                        // Set remote switch to false
                        console.log(e.target.checked)
                        setGeoLocationChecked(e.target.checked);
                        if (e.target.checked) {
                          
                          setRemoteChecked(false);
                          navigator.geolocation.getCurrentPosition(function (position) {
                            const coords = [position.coords.longitude, position.coords.latitude];
                            formik.setFieldValue("long", coords[0])
                            formik.setFieldValue("lat", coords[1])
                            formik.setFieldValue("remoteOnly", null)
                          });
                        } else { 
                          formik.setFieldValue("long", null)
                          formik.setFieldValue("lat", null)
                        }
                      }}

                      checked={geoLocationChecked}
                    />
                    <span className="slider round"></span>
                  </label>
                </MDBCol>

                {/* Remote switch */}
                <MDBCol xl={2} md={2} size={6} >
                  <label htmlFor="remote" className='fw-bold'>Remote only</label>

                  <label className="switch">
                    <input type="checkbox"
                      id='remoteSwitch'
                      className='mx-1'
                      onChange={(e) => {
                        // Set remote switch 
                        setRemoteChecked(e.target.checked);
                        setGeoLocationChecked(false);
                      }}
                      checked={remoteChecked}
                    />
                    <span className="slider round"></span>
                  </label>
                </MDBCol>
              </MDBRow>
            </MDBCol>
            <MDBRow className='d-flex justify-content-center px-4 mt-4 '>
              <span className='job-search-border '></span>
            </MDBRow>
          </MDBRow >
        </form >
      </MDBContainer >

      {formik.submitCount > 0 && <JobSection query={query} sectionTitle={'Your Search Results'} />}

    </>

  )
}
