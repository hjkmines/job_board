import React, {useState} from "react";
import JobCard from "../JobCard/JobCard";

import "./JobCarouselTouch.css";
import { useSpringCarousel } from 'react-spring-carousel'
import { MDBProgress, MDBProgressBar } from 'mdb-react-ui-kit';

export function JobCarouselTouch({ jobs }) {

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

    <div className="overflow-hidden  ">

      {carouselFragment}
      <MDBProgress className="jobs-progress">
        <MDBProgressBar className="jobs-progress-bar" width={activeItem+1} valuemin={0} valuemax={jobs.length+1} />
      </MDBProgress>
      </div>


  );
}

export default JobCarouselTouch;