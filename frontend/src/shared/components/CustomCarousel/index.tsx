import { Carousel } from "react-bootstrap";
import image1 from "/images/artificial_1.jpg";
import image2 from "/images/artificial_2.jpg";
import image3 from "/images/artificial_3.jpg";

export const CustomCarousel = () => {
  return (
    <Carousel className="shadow-sm">
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image1}
          alt="First slide"
          height={400}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image2}
          alt="Second slide"
          height={400}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src={image3}
          alt="Third slide"
          height={400}
        />
      </Carousel.Item>
    </Carousel>
  );
};
