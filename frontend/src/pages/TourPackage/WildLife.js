import React from 'react';
import './adventure.css'; 
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

import Image1 from '../../img/location image/yala.png';
import Image2 from '../../img/location image/wilpattu.png';
import Image3 from '../../img/location image/minneriya.png';
import Image4 from '../../img/location image/Bundala.png';
import Image5 from '../../img/location image/galle.png';
import Image6 from '../../img/location image/sinharaje.png';
import Image7 from '../../img/location image/kumana.png';


function WildLife() {
    return (
        <div>
            <Navigation />
        <div className="package-page1">
          <div className="package-info1">
            <h2>Wildlife Package</h2>
            <p>Embark on a thrilling journey through nature with our wildlife tours. Explore untouched landscapes guided by experts, from dense forests to wide savannas and winding rivers. Encounter majestic animals like cheetahs and elephants in their natural habitats, and capture stunning photos of wildlife in action. Whether you're a seasoned explorer or new to adventure, our tours cater to everyone. Join us for an unforgettable experience in the wild, where every moment reveals the beauty and wonder of nature.</p>
          </div> 
          <div className='locatinCard'>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image1} alt="Activity 1" />
              <div className="card-content1">
                <h4>Yala National Park</h4>
                <p>Famous for leopard sightings and diverse wildlife.</p>
              </div>
            </div>
          </div>
        
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image2} alt="Activity 1" />
              <div className="card-content1">
                <h4>Wilpattu National Park</h4>
                <p>Known for its population of leopards and bird species.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image3} alt="Activity 1" />
              <div className="card-content1">
                <h4>Udawalawe National Park</h4>
                <p>Home to a large population of elephants and other wildlife.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image4} alt="Activity 1" />
              <div className="card-content1">
                <h4>Minneriya National Park</h4>
                <p> Offers thrilling jeep safaris and elephant gatherings.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image5} alt="Activity 1" />
              <div className="card-content1">
                <h4>Bundala National Park</h4>
                <p>A haven for birdwatchers with its diverse bird species.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image6} alt="Activity 1" />
              <div className="card-content1">
                <h4>Sinharaja Forest Reserve</h4>
                <p> A UNESCO World Heritage Site with rich biodiversity and rare species.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image7} alt="Activity 1" />
              <div className="card-content1">
                <h4>Kumana National Park</h4>
                <p>Ideal for birdwatching, especially during the migratory season.</p>
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

export default WildLife
