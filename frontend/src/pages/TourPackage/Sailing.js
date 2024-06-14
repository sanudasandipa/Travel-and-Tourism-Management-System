import React from 'react';
import './adventure.css'; 
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

import Image1 from '../../img/location image/mirissa.png';
import Image2 from '../../img/location image/trinco.png';
import Image3 from '../../img/location image/negambo.png';
import Image4 from '../../img/location image/beruwala.png';
import Image5 from '../../img/location image/galle.png';
import Image6 from '../../img/location image/tangalle-1000.png';
import Image7 from '../../img/location image/colombo.png';

function Sailing() {
    return (
        <div>
            <Navigation />
        <div className="package-page1">
          <div className="package-info1">
            <h2>Sailing Package</h2>
            <p>Set sail on a voyage of discovery with our sailing tours, where the sea becomes your playground
and the wind guides your journey. Explore hidden coves, and soaking in the serenity and majesty
of the open water.</p>
          </div> 
          <div className='locatinCard'>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image1} alt="Activity 1" />
              <div className="card-content1">
                <h4>Mirissa</h4>
                <p>A popular starting point for whale watching and dolphin watching excursions.</p>
              </div>
            </div>
          </div>
        
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image2} alt="Activity 1" />
              <div className="card-content1">
                <h4>Trincomalee</h4>
                <p>Known for its picturesque beaches and sailing opportunities.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image3} alt="Activity 1" />
              <div className="card-content1">
                <h4>Negombo</h4>
                <p>Offers sailing tours along the scenic Negombo Lagoon.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image4} alt="Activity 1" />
              <div className="card-content1">
                <h4>Beruwala</h4>
                <p> A coastal town with sailing and boating options for tourists.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image5} alt="Activity 1" />
              <div className="card-content1">
                <h4>Galle</h4>
                <p>Offers sailing tours along the stunning southern coastline.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image6} alt="Activity 1" />
              <div className="card-content1">
                <h4>Tangalle</h4>
                <p>Known for its tranquil beaches and sailing experiences.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image7} alt="Activity 1" />
              <div className="card-content1">
                <h4>Colombo</h4>
                <p>The capital city with sailing clubs and opportunities for yacht charters.</p>
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

export default Sailing
