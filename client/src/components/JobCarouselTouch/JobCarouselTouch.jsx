import React, {useState} from "react";
import JobCard from "../JobCard/JobCard";

import "./JobCarouselTouch.css";
import { useSpringCarousel } from 'react-spring-carousel'
import { MDBProgress, MDBProgressBar, MDBRange } from 'mdb-react-ui-kit';

export function JobCarouselTouch({ jobs }) {

  const [activeItem, setActiveItem] = useState(0)
  const {
    carouselFragment,
    useListenToCustomEvent,
    slideToItem
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

  const handleChange= (e) => {
    setActiveItem(parseInt(e.target.value))
    slideToItem(parseInt(e.target.value))
  }
  return (

    <div className="overflow-hidden" >
      {carouselFragment}
      
      <MDBRange
      defaultValue={0}
      value={activeItem}
      id='customRange'
      label='Example range'
      min='0'
      max={jobs.length-1}
      onChange={(e)=> handleChange(e)}
    />

      </div>

  );
}

export default JobCarouselTouch;