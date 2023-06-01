import './JobSearchGeo.css';
import React, { useState, useEffect } from 'react'
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
  MDBTooltip,
  MDBIcon,
  MDBTypography,
  MDBInputGroup
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMagnifyingGlass} from '@fortawesome/free-solid-svg-icons'
import JobSection from '../JobSection/JobSection';
import { Formik, Field, Form, useFormik } from 'formik';
import axios from 'axios'
export default function JobSearchGeo() {


  const [query, setQuery] = useState({})
  const [locationDisable, setLocationDisable] = useState(false)
  const [remoteDisable, setRemoteDisable] = useState(false)
  const [geoLocationChecked, setGeoLocationChecked] = useState(false)
  const [remoteChecked, setRemoteChecked] = useState(false)


  const formik = useFormik({

    initialValues: {

      search: '',
      location: '',
      radius: 40233.6,
      lat: '',
      long: '',
      remoteOnly: false
    },

    onSubmit: (values) => {
      setQuery({ ...values })
    }
  });

  const setLocationValue = (coords) => {
    formik.setFieldValue("long", coords[0])
    formik.setFieldValue("lat", coords[1])
  }

  return (
    <>
      <MDBContainer  fluid className=''>
        <form onSubmit={formik.handleSubmit} >

          <MDBRow  className='d-flex justify-content-center align-items-end mx-0 py-4 px-4 '>
            {/* Column for Search and query input */}
            <MDBCol xl='6' xs='12' >

              <MDBRow className=' d-flex justify-content-center  align-items-end'>

                <MDBCol  size={1}  className=' d-lg-none d-xs-block' >
                  <MDBBtn floating  size='lg' type="submit" className='action-btn  shadow-none ' >
                  <FontAwesomeIcon icon={faMagnifyingGlass}  />
                  </MDBBtn>
                </MDBCol>

                <MDBCol  size={1} lg={2} xl={4}  className=' d-none d-lg-block' >
                  <MDBBtn rounded  size='lg' type="submit" className='action-btn fw-bold  shadow-none w-100' >
                  Search
                  </MDBBtn>
                </MDBCol>

                <MDBCol  size={11} lg={10} xl={8} >
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
            <MDBCol xl='6' xs='12'>

              <MDBRow className='d-flex justify-content-center align-items-end  '>

                <MDBCol xl={6} size={5}>
                  <label htmlFor="location" className='fw-bold'>Location</label>
                  <input
                    name="location"
                    id="location"
                    type='text'
                    placeholder='Zip code, city'
                    className="searchInput form-control"
                    value={formik.values.location}
                    disabled={locationDisable}
                    onChange={formik.handleChange} />
                </MDBCol>


                <MDBCol xl={2}  size={3} >
                  <div className="form-group ">
                    <label htmlFor="radius" className='fw-bold'>Within</label>

                    <select className="form-select select-round" name="radius" id='radius' onChange={formik.handleChange} disabled={remoteChecked}>
                      <option value={40233.6} >25 mi</option>
                      <option value={80467.2} >50 mi</option>
                      <option value={160934} >100 mi</option>
                    </select>
                  </div>
                </MDBCol>
                <MDBCol xl='2'  size={2}>
                  <label htmlFor="geoLocation" className='fw-bold'>Use your location</label>
                  <label className="switch">
                    <input type="checkbox"
                      id='geoLocationSwitch'
                      className='mx-1'
                      onClick={() => {
                        formik.setFieldValue('location', '');
                        navigator.geolocation.getCurrentPosition(function (position) {
                          const userCoords = [position.coords.longitude, position.coords.latitude];
                          setLocationValue(userCoords);
                        });
                        setLocationDisable(!locationDisable);
                        setRemoteDisable(!remoteDisable);
                      }}
                      onChange={(e) => {
                        setGeoLocationChecked(e.target.checked);
                        setRemoteChecked(false);
                      }}
                      checked={geoLocationChecked}
                    />
                    <span className="slider round"></span>
                  </label>

                </MDBCol>
                <MDBCol xl={2} size={2} >
                  <label htmlFor="remote" className='fw-bold'>Remote only</label>

                  <label className="switch">
                    <input type="checkbox"
                      id='remoteSwitch'
                      className='mx-1'
                      onClick={() => {
                        setLocationDisable(!locationDisable);
                        formik.setFieldValue('remoteOnly', !formik.values.remoteOnly)
                        console.log(formik.values)
                      }}
                      onChange={(e) => {
                        setRemoteChecked(e.target.checked);
                        setGeoLocationChecked(false);
                      }}
                      checked={remoteChecked} />
                    <span className="slider round"></span>
                  </label>
                </MDBCol>

              </MDBRow>
            </MDBCol>
            <MDBRow className='d-flex justify-content-center px-5 mt-4 '>
              <span className='job-search-border '></span>
            </MDBRow>
          </MDBRow >
        </form >

      </MDBContainer >

      <JobSection query={query} sectionTitle={'Your Search Results'} />

    </>

  )
}
