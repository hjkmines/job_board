import React from "react";
import Carousel from "react-multi-carousel";
import JobCard from "../JobCard/JobCard";
import "./JobCarousel.css";
import "react-multi-carousel/lib/styles.css";

const responsive = {
    superLargeDesktop: {
        // the naming can be any, depends on you.
        breakpoint: { max: 4000, min: 3000 },
        items: 5
    },
    desktop: {
        breakpoint: { max: 3000, min: 1024 },
        items: 3
    },
    tablet: {
        breakpoint: { max: 1024, min: 464 },
        items: 2
    },
    mobile: {
        breakpoint: { max: 464, min: 0 },
        items: 1
    }
};

class JobCarousel extends React.Component {
    state = { additionalTransfrom: 0 };
    render() {
        const { deviceType } = this.props;
        const CustomSlider = ({ carouselState }) => {
            let value = 0;
            let carouselItemWidth = 0;
            if (this.Carousel) {
                carouselItemWidth = this.Carousel.state.itemWidth;
                const maxTranslateX = Math.round(
                    // so that we don't over-slide
                    carouselItemWidth *
                    (this.Carousel.state.totalItems -
                        this.Carousel.state.slidesToShow) +
                    150
                );
                value = maxTranslateX / 100; // calculate the unit of transform for the slider
            }
            const { transform, currentSlide } = carouselState;
            return (
                <div className="custom-slider">
                    <input
                        type="range"
                        value={Math.round(Math.abs(transform) / value)}
                        max={
                            (carouselItemWidth *
                                (carouselState.totalItems - carouselState.slidesToShow) +
                                (this.state.additionalTransfrom === 150 ? 0 : 150)) /
                            value
                        }
                        onChange={e => {
                            if (this.Carousel.isAnimationAllowed) {
                                this.Carousel.isAnimationAllowed = false;
                            }
                            const nextTransform = e.target.value * value;
                            const nextSlide = Math.round(nextTransform / carouselItemWidth);
                            if (
                                e.target.value == 0 &&
                                this.state.additionalTransfrom === 150
                            ) {
                                this.Carousel.isAnimationAllowed = true;
                                this.setState({ additionalTransfrom: 0 });
                            }
                            this.Carousel.setState({
                                transform: -nextTransform, // padding 20px and 5 items.
                                currentSlide: nextSlide
                            });
                        }}
                        className="custom-slider__input"
                    />
                    
                </div>
            );
        };
        return (
            <Carousel
                keyBoardControl={true}
                ssr={false}
                ref={el => (this.Carousel = el)}
                partialVisible={false}
                arrows={false}
                customButtonGroup={<CustomSlider />}
                deviceType={this.props.deviceType}
                itemClass="job-item"
                itemAriaLabel="Image-aria-label"
                responsive={responsive}
                containerClass="carousel-container-with-scrollbar"
                focusOnSelect={true}
                additionalTransfrom={this.state.additionalTransfrom-50}

                beforeChange={nextSlide => {
                    if (nextSlide !== 0 && this.state.additionalTransfrom !== 150) {
                        this.setState({ additionalTransfrom: 150 });
                    }
                    if (nextSlide === 0 && this.state.additionalTransfrom === 150) {
                        this.setState({ additionalTransfrom: 0 });
                    }
                }}
            >
                {this.props.jobs.forEach(job => {
                    <JobCard data = {job}/>
                } )}

            </Carousel>
        );
    }
}

export default JobCarousel;