import React from 'react';
import './adventure.css'; 
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

import Image1 from '../../img/location image/ella.png';
import Image2 from '../../img/location image/kithulgala.png';
import Image3 from '../../img/location image/Horton.png';
import Image4 from '../../img/location image/sripade.png';
import Image5 from '../../img/location image/Knuckles.png';
import Image6 from '../../img/location image/minneriya.png';
import Image7 from '../../img/location image/pidurangala.png';

const AdventurePackagePage = () => {
  return (
    <div>
        <Navigation />
    <div className="package-page1">
      <div className="package-info1">
        <h2>Adventure Package</h2>
        <p>Get your adrenaline pumping with our adventure tours, perfect for thrill-seekers and adrenaline
junkies. Whether it's scaling towering peaks, navigating rugged terrain, or embarking on heart-
pounding excursions, our adventure tours promise exhilarating experiences and unforgettable
challenges.</p>
      </div> 
      <div className='locatinCard'>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image1} alt="Activity 1" />
          <div className="card-content1">
            <h4>Ella</h4>
            <p>For hiking, rock climbing, and stunning views.</p>
          </div>
        </div>
      </div>
    
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image2} alt="Activity 1" />
          <div className="card-content1">
            <h4>Kitulgala</h4>
            <p> Famous for white-water rafting and jungle trekking.</p>
          </div>
        </div>
      </div>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image3} alt="Activity 1" />
          <div className="card-content1">
            <h4>Horton Plains National Park</h4>
            <p>FOffers challenging hikes and the stunning "World's End" viewpoint.</p>
          </div>
        </div>
      </div>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image4} alt="Activity 1" />
          <div className="card-content1">
            <h4>Adam's Peak (Sri Pada)</h4>
            <p> A pilgrimage site with a challenging trek and beautiful sunrise views.</p>
          </div>
        </div>
      </div>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image5} alt="Activity 1" />
          <div className="card-content1">
            <h4>Knuckles Mountain Range</h4>
            <p>Ideal for adventurous hikes amidst scenic landscapes and waterfalls.</p>
          </div>
        </div>
      </div>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image6} alt="Activity 1" />
          <div className="card-content1">
            <h4>Minneriya National Park</h4>
            <p>Known for thrilling jeep safaris and elephant sightings</p>
          </div>
        </div>
      </div>
      <div className="package-cards1">
        <div className="package-card1">
          <img src={Image7} alt="Activity 1" />
          <div className="card-content1">
            <h4>Pidurangala Rock</h4>
            <p>Offers a rewarding hike and panoramic views of Sigiriya Rock.</p>
          </div>
        </div>
      </div>

      </div>

      
      <div className="buttons1">
      <Link to="/Map" className="map-button">View Map</Link>
      <Link to="/aboutus" className="map-button">
      <button className="review-button">Review Package</button>
      </Link>
        
        <Link to="/BookingPackage" className="book-button">Booking Package</Link>
      </div>
    </div>
    </div>
  );
};

export default AdventurePackagePage;
