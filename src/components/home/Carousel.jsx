import Slider from "react-slick";
import CarouselCard from "./CarouselCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../css/components/home/Carousel.css";

const Carousel = ({ cards }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 2800, // lg
        settings: {
          slidesToShow: 5,
        },
      },
      {
        breakpoint: 2400, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2200, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 2100, // lg
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 1800, // 3xl
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 1080, // lg
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 920, // md
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 640, // sm and below
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="carousel-outer-div">
      <Slider {...settings}>
        {cards.map((card, index) => (
          <div key={index} className="carousel-div">
            <CarouselCard
              name={card.name}
              description={card.description}
              rating={card.rating}
              author={card.author}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default Carousel;
