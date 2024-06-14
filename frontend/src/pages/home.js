import React from 'react';
import NavHome from '../component/navHome';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import image1 from '../img/image1.png';
import image2 from '../img/image2.png';
import image3 from '../img/image3.png';
import './home.css';

function Home() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000
  };

  return (
    <div className="home">
      <div className='nav-bar-in-home'>
      <NavHome />
      </div>
   <div className="slider-container">
    <Slider {...settings}>
      <div>
        <img src={image1} alt="Slide 1" />
      </div>
      <div>
        <img src={image2} alt="Slide 2" />
      </div>
      <div>
        <img src={image3} alt="Slide 3" />
      </div>
    </Slider>
  </div>
  <div className='para'>

    <p>
    Welcome to our comprehensive travel platform! Whether you're planning a relaxing getaway,
     an adventurous expedition, or a business trip, we've got you covered. Our website offers a diverse range 
     of travel packages tailored to suit every traveler's preferences and budget. From luxurious hotels to cozy bed-and-breakfasts,
      from gourmet restaurants to local eateries serving authentic cuisine, and from comfortable transportation options to exciting 
      tour packages, we provide everything you need to make your travel experience seamless and memorable. Explore our website, 
      browse through our enticing offerings, and embark on your next journey with confidence!
    </p>

  </div>
    </div>
  );
}

export default Home;
