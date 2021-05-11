import React from "react"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import "./carousel.css"

import image1 from "./carousel_1.jpg";
import image2 from "./carousel_2.jpg";
import image3 from "./carousel_3.jpg";
import image4 from "./carousel_4.jpg";
import image5 from "./carousel_5.jpg";

const images=[
    {id: 1, src: image1, alt: "photo1"},
    {id: 2, src: image2, alt: "photo2"},
    {id: 3, src: image3, alt: "photo3"},
    {id: 4, src: image4, alt: "photo4"},
    {id: 5, src: image5, alt: "photo5"}
]

const MyCarousel=()=> (
  <Carousel showThumbs={false} showStatus={false} autoPlay={true} >
  {
      images.map(el=>(
          <div className="carousel-image" key={el.alt}>
              <img src={el.src} alt={el.alt}/>
          </div>
      ))
  }
  </Carousel>
)

export default MyCarousel;
