import React from 'react';
import './adventure.css'; 
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

import Image1 from '../../img/location image/bentota.png';
import Image2 from '../../img/location image/pinnawala.png';
import Image3 from '../../img/location image/zoo.png';
import Image4 from '../../img/location image/colombo.png';
import Image5 from '../../img/location image/hikkaduwa.png';
import Image6 from '../../img/location image/rambodaElla.png';
import Image7 from '../../img/location image/kandylake.png';

function family() {
    return (
        <div>
            <Navigation />
        <div className="package-page1">
          <div className="package-info1">
            <h2>Family Package</h2>
            <p>Make memories that last a lifetime on our family tours, tailored to delight both kids and adults
alike. From exciting adventures to cultural discoveries, our family-friendly activities ensure fun
and bonding for the whole family, fostering moments of joy and togetherness.</p>
          </div> 
          <div className='locatinCard'>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image1} alt="Activity 1" />
              <div className="card-content1">
                <h4>Bentota</h4>
                <p>Offers family-friendly beaches and water sports activities.</p>
              </div>
            </div>
          </div>
        
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image2} alt="Activity 1" />
              <div className="card-content1">
                <h4>Pinnawala Elephant Orphanage</h4>
                <p>A sanctuary where families can observe and interact with elephants.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image3} alt="Activity 1" />
              <div className="card-content1">
                <h4>Dehiwala Zoo</h4>
                <p>A popular zoo featuring a wide variety of animals and attractions.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image4} alt="Activity 1" />
              <div className="card-content1">
                <h4>Colombo</h4>
                <p> The capital city with family-friendly attractions like parks, museums, and shopping malls.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image5} alt="Activity 1" />
              <div className="card-content1">
                <h4>Hikkaduwa</h4>
                <p>Known for its family-friendly beaches and snorkeling opportunities.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image6} alt="Activity 1" />
              <div className="card-content1">
                <h4>Ramboda Falls</h4>
                <p>A picturesque waterfall ideal for family picnics and relaxation.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image7} alt="Activity 1" />
              <div className="card-content1">
                <h4>Kandy Lake</h4>
                <p>Offers scenic boat rides and a peaceful atmosphere for families to enjoy.</p>
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

export default family
