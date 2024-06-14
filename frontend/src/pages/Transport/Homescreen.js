import React, { useState, useEffect } from 'react';
import axios from "axios";
import Vehicle from '../../component/Transport/Vehicle';
import Loader from '../../component/Transport/Loader'
import Error from '../../component/Transport/Error'
import './homescreen.css';
import Navigation from '../../pages/Navigation';

function Homescreen() {
  const [vehicles, setVehicles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [searchkey, setSearchKey] = useState('');
  const [type, setType] = useState('all');
  const [originalVehicles, setOriginalVehicles] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await axios.get('http://localhost:8080/api/vehicles/getallvehicles');
        setVehicles(data);
        setOriginalVehicles(data);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setError(true);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterBySearch = () => {
    const filteredVehicles = originalVehicles.filter(vehicle => 
      vehicle.name.toLowerCase().includes(searchkey.toLowerCase())
    );
    setVehicles(filteredVehicles);
  }

  const filterByType = (e) => {
    setType(e.target.value);
    if (e.target.value === 'all') {
      setVehicles(originalVehicles);
    } else {
      const filteredVehicles = originalVehicles.filter(vehicle => vehicle.type === e.target.value);
      setVehicles(filteredVehicles);
    }
  }

  return (
    <div>
      <Navigation />
    
    <div className="container">
      <div className='row mt-5 bs'>
        <div className='col-md-5'>
          <input type ='text' className='form-control' placeholder='Search vehicle' 
            value={searchkey} onChange={(e) => setSearchKey(e.target.value)} 
            onKeyUp={filterBySearch}
          />
        </div>

        <div className="col-md-4">
          <select value={type} onChange={filterByType}>
            <option value='all'>All</option>
            <option value='Car'>Car</option>
            <option value='Bicycle'>Bicycle</option>
            <option value='Bus'>Bus</option>
            <option value='Van'>Van</option>
            <option value='Threewheel'>Threewheel</option>
          </select>
        </div>
      </div>

      <div className="mt-5">
        {loading ? (<Loader />
        ) : (
          vehicles.map(vehicle => (
            <div className="vehicle-card" key={vehicle.id}>
              <Vehicle vehicle={vehicle} />
            </div>
          ))
        )}
      </div>
    </div>
    </div>
  );
}

export default Homescreen;
