import React from 'react';
import './adventure.css'; 
import Navigation from '../Navigation';
import { Link } from 'react-router-dom';

import Image1 from '../../img/location image/sigiriya.png';
import Image2 from '../../img/location image/Anuradhapura.png';
import Image3 from '../../img/location image/Polonnaruwa.png';
import Image4 from '../../img/location image/dambulla.png';
import Image5 from '../../img/location image/Galle Fort.png';
import Image6 from '../../img/location image/Kandy.png';
import Image7 from '../../img/location image/Mihintale-01.webp';


function Historical() {
    return (
        <div>
            <Navigation />
        <div className="package-page1">
          <div className="package-info1">
            <h2>Historical Package</h2>
            <p>Dive into the past with our historical tours, where every step unveils the stories of ancient
civilizations, grand empires, and pivotal moments in history. Walk through iconic landmarks,
explore archaeological sites, and immerse yourself in the rich tapestry of human heritage.</p>
          </div> 
          <div className='locatinCard'>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image1} alt="Activity 1" />
              <div className="card-content1">
                <h4>Sigiriya</h4>
                <p>The ancient rock fortress with impressive ruins and stunning frescoes.</p>
              </div>
            </div>
          </div>
        
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image2} alt="Activity 1" />
              <div className="card-content1">
                <h4>Anuradhapura</h4>
                <p>An ancient city with well-preserved ruins of palaces, temples, and stupas.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image3} alt="Activity 1" />
              <div className="card-content1">
                <h4>Polonnaruwa</h4>
                <p>Another ancient capital showcasing ruins of temples, statues, and irrigation systems.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image4} alt="Activity 1" />
              <div className="card-content1">
                <h4>Dambulla Cave Temple</h4>
                <p> A UNESCO World Heritage Site featuring cave paintings and over 150 Buddha statues.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image5} alt="Activity 1" />
              <div className="card-content1">
                <h4>Galle Fort </h4>
                <p>A fortified city with Dutch colonial architecture and charming streets.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image6} alt="Activity 1" />
              <div className="card-content1">
                <h4>Kandy</h4>
                <p> Home to the Temple of the Tooth Relic, a sacred Buddhist site.</p>
              </div>
            </div>
          </div>
          <div className="package-cards1">
            <div className="package-card1">
              <img src={Image7} alt="Activity 1" />
              <div className="card-content1">
                <h4>Mihintale</h4>
                <p>Known as the birthplace of Buddhism in Sri Lanka, with ancient ruins and panoramic views.</p>
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

export default Historical
