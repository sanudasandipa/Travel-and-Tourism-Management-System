import React from 'react';
import Navigation from '../Navigation';
import './map.css'; 
import Map from '../../img/location image/map.png'; 

function MapPage() {
  return (
    <div>
              <Navigation />

    <div className="container">
      <div>
        <img src={Map} alt="Map" className="map-image" />
      </div>
    </div>
    </div>
  );
}

export default MapPage;
