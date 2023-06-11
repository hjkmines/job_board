import React, {useState} from "react";
import JobCard from "../JobCard/JobCard";

import "./JobCarouselTouch.css";
import { useSpringCarousel } from 'react-spring-carousel'
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';

export function JobCarouselTouch({ jobs }) {
  console.log(jobs.length)
  
  const [activeItem, setActiveItem] = useState(0)
  const {
    carouselFragment,
    useListenToCustomEvent
  } = useSpringCarousel({
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


  return (

    <div className="overflow-x-scroll" >
      {carouselFragment}
      {/* <MDBProgress className="jobs-progress">
        <MDBProgressBar className="jobs-progress-bar" width={activeItem/jobs.length*100+1} valuemin={1} valuemax={99} />
      </MDBProgress> */}
      </div>

  );
}

export default JobCarouselTouch;