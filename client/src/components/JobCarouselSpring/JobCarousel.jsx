import React from "react";
import JobCard from "../JobCard/JobCard";
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


  export function JobCarousel({jobs}) {
    const { 
      carouselFragment, 
      slideToPrevItem, 
      slideToNextItem 
    } = useSpringCarousel({
      freeScroll: true,
      enableFreeScrollDrag: false,
      disableGestures: false,
      items: jobs.map((job) => ({
        id: job._id,
        renderItem: (
            <JobCard key = {job._id} job = {job}/>
        ),
      })),
    });

    return (
        <div className="overflow-hidden">
        {carouselFragment}
        </div>
    );
  }

export default JobCarousel;