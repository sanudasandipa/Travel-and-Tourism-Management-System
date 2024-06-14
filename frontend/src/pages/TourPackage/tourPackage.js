import React from 'react';
import { Link } from 'react-router-dom';
import './tourPackage.css'; 
import Image1 from '../../img/location image/Adventure.png'; 
import Image2 from '../../img/location image/family.png'; 
import Image3 from '../../img/location image/Sailing.png'; 
import Image4 from '../../img/location image/Wildlife.png'; 
import Image5 from '../../img/location image/Historical.png'; 
import Navigation from '../Navigation';

const TourPackagesPage = () => {
  const packages = [
    { id: 1, name: 'Adventure', image: Image1, description: 'Explore thrilling adventures!', route: '/Adventure' },
    { id: 2, name: 'Family', image: Image2, description: 'Enjoy family-friendly activities!', route: '/Family' },
    { id: 3, name: 'Sailing', image: Image3, description: 'Experience the freedom of sailing!', route: '/Sailing' },
    { id: 4, name: 'Wildlife', image: Image4, description: 'Encounter fascinating wildlife!', route: '/Wildlife' },
    { id: 5, name: 'Historical', image: Image5, description: 'Discover rich historical sites!', route: '/Historical' },
  ];

  return (
    <div className="tour-packages-page">
      <Navigation />
      <section className="description-section">
        <div className="description-box">
          <h2>Tour Packages</h2>
          <p>Welcome to our tour packages page! Explore our exciting offerings below. 
            Whether you're seeking thrilling adventures, family-friendly activities, the freedom of sailing,
             encounters with fascinating wildlife, or a journey through rich historical sites, we have something for everyone. 
             Click on any package to learn more and start planning your next adventure today!
            </p>
        </div>
      </section>

      <section className="packages-section">
        <h3>Packages</h3>
        <div className="package-cards">
          {packages.map((pkg) => (
            <Link key={pkg.id} to={pkg.route} className="package-card">
              <img src={pkg.image} alt={pkg.name} />
              <div className="card-content">
                <h4>{pkg.name}</h4>
                <p>{pkg.description}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};

export default TourPackagesPage;
