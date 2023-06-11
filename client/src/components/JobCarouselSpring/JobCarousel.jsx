import React from "react";
import JobCard from "../JobCard/JobCard";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronRight, faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import "./JobCarousel.css";
import { useSpringCarousel } from 'react-spring-carousel'

const responsive = {
  superLargeDesktop: {
    // the naming can be any, depends on you.
    breakpoint: { max: 4000, min: 3000 },
    items: 3
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};


export function JobCarousel({ jobs }) {
  const {
    carouselFragment,
    slideToPrevItem,
    slideToNextItem
    // useListenToCustomEvent
  } = useSpringCarousel({
    itemsPerSlide: jobs.length < 3 ? jobs.length : 3,
    freeScroll: true,
    enableFreeScrollDrag: false,
    items: jobs.map((job) => ({
      id: job._id,
      renderItem: (
        <JobCard key={job._id} job={job} />
      ),
    })),
  });

  // useListenToCustomEvent((event) => {
  //   // Triggered during drag gestures
  //   if (event.eventName === "onDrag") {
  //     if (event.slideActionType === 'prev') {
  //       slideToPrevItem()
  //     } else if (event.slideActionType === 'next') {
  //       slideToNextItem()
  //     }
  //   }
  // })

  return (
    <div className="d-flex flex-row ">


      <div className="   align-items-center carousel-control d-lg-flex d-none  " onClick={slideToPrevItem} >
        <FontAwesomeIcon icon={faChevronLeft} className="fa-10x" />
      </div>


      {carouselFragment}

      <div className="  d-lg-flex d-none align-items-center carousel-control " onClick={slideToNextItem}>
        <FontAwesomeIcon icon={faChevronRight} className="fa-10x " />


      </div>
    </div >
  );
}

export default JobCarousel;