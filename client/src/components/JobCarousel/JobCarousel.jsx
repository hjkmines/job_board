import React, { useEffect, useState } from "react";
import JobCard from "../JobCard/JobCard";

import "./JobCarousel.css";
import { useSpringCarousel } from 'react-spring-carousel'
import { MDBProgress, MDBProgressBar, MDBRange } from 'mdb-react-ui-kit';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import useMediaQuery from '../../hooks/useMediaQuery'
import useBreakpoints from '../../hooks/useBreakpoints'


function JobCarousel({ jobs }) {


  const [activeItem, setActiveItem] = useState(0)

  const groupSizes = {
    'xs': 1,
    'sm': 1,
    'md': 2,
    'lg': 2,
    'xl': 3,
  }
  const breakpoint = useBreakpoints()
 
  const groupSize = groupSizes[breakpoint.active]

  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToItem,
    slideToNextItem,
    slideToPrevItem
  } = useSpringCarousel({
    itemsPerSlide: groupSize,
    items: jobs.map((job, index) => ({
      id: index,
      renderItem: (
        <JobCard key={job._id} job={job} />
      )
    })),
  });
  useListenToCustomEvent((event) => {
    if (event.eventName === "onSlideStartChange") {
      setActiveItem(event.nextItem.id)
    }
  });

  const handleChange = (e) => {
    setActiveItem(parseInt(e.target.value))
    slideToItem(parseInt(e.target.value))
  }



  return (
    <>
      <div className="d-flex flex-row align-items-stretch justify-content-center">
        <button className=" d-lg-flex d-none align-items-center carousel-control " onClick={slideToPrevItem} >
          <FontAwesomeIcon icon={faChevronLeft} className="fa-10x" />
        </button>
        <div className=" overflow-hidden ">
          {carouselFragment}

        </div>

        <button className=" d-lg-flex d-none align-items-center carousel-control   " onClick={slideToNextItem}>
          <FontAwesomeIcon icon={faChevronRight} className="fa-10x  " />

        </button>

      </div >
      {(jobs.length / groupSize) > 1 ?
        <div className="slidecontainer text-center ">
          <input
            type="range"
            value={activeItem}
            id='customRange'
            label='Example range'
            min='0'
            max={(jobs.length - 1) - ((jobs.length) % groupSize) - 1}
            className="w-75"
            onChange={(e) => handleChange(e)} />
        </div>
        : <></>}

    </>


  );
}

export default JobCarousel;