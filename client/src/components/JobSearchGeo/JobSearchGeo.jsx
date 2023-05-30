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
  MDBIcon,
  MDBTypography,
  MDBInputGroup
} from 'mdb-react-ui-kit'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationCrosshairs } from '@fortawesome/free-solid-svg-icons'
import JobSection from '../JobSection/JobSection';
import { Formik, Field, Form, useFormik } from 'formik';
import axios from 'axios'
export default function JobSearchGeo() {


  const [query, setQuery] = useState({})
  const [locationDisable, setLocationDisable] = useState(false)

  const [locationPermission, setLocationPerimssion] = useState(true)

  const getLocationPermissionStatus = () => {
    navigator.permissions.query({ name: "geolocation" }).then((result) => {
      if (result.state === "granted" || result.state == 'prompt') {
        setLocationPerimssion(true)
      } else if (result.state === 'denied') {
        setLocationPerimssion(false)
      }
    });
  }
  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
  const formik = useFormik({

    initialValues: {

      search: '',
      location: '',
      radius: 40233.6,
      lat: '',
      long: '',
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
      <form onSubmit={formik.handleSubmit} >

        <MDBContainer fluid className='search2 mt-2  mb-4 px-5'>

          <MDBRow className='justify-content-evenly align-items-end'>
            <MDBCol fluid='true' size={2} className='searchBtnCol justify-content-end '>
              <MDBBtn type="submit" className='searchSubmitBtn fw-bold' >
                Search
              </MDBBtn>
            </MDBCol>

            <MDBCol size={4} className="filterSearch">
              <label htmlFor="search" className='text-center fw-bold'>Search</label>
              <input
                id='search'
                name='search'
                type='text'
                placeholder='Frontend, Python, etc'
                className="searchInput form-control"
                value={formik.values.search}
                onChange={formik.handleChange} />
            </MDBCol>

            <MDBCol size={4} className="filterSearch">
              <label htmlFor="location" className='text-center fw-bold'>Location</label>
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

            <MDBCol size={1} className="filterSearch">
              <label htmlFor="geoLocation" className='text-center fw-bold'>Use your location</label>

              <MDBSwitch
                id='flexSwitchCheckDefault'
                className='m-1 mt-2'
                onClick={() => {
                  formik.setFieldValue('location', '');
                  navigator.geolocation.getCurrentPosition(function (position) {
                    const userCoords = [position.coords.longitude, position.coords.latitude];
                    setLocationValue(userCoords);
                  });
                  setLocationDisable(!locationDisable);
                }}
              
              />
            </MDBCol>

            <MDBCol size={1} >
              <div className="form-group ">
                <label htmlFor="radius" className='text-center fw-bold'>Within</label>

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

      <JobSection query={query} sectionTitle={'Your Search Results'} />

    </>

  )
}
