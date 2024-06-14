import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import logo from '../img/logo.png'
import './navigation.css'; 



const Navigation = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userRole, setUserRole] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserRole = async () => {
      try {
        const response = await fetch('http://localhost:8080/auth/validate-token', {
          credentials: 'include',
        });

        if (response.ok) {
          const data = await response.json();
          setUserRole(data.role);
          setIsLoggedIn(true);
        } else {
          setUserRole('');
          setIsLoggedIn(false);
        }
      } catch (error) {
        console.error('Error fetching user role:', error);
        setIsLoggedIn(false);
      }
    };

    fetchUserRole();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:8080/auth/logout', {
        credentials: 'include',
      });

      if (response.ok) {
        Cookies.remove('token'); // Remove the token from cookies
        setIsLoggedIn(false);
        navigate('/'); // Redirect to the home page
      } else {
        console.error('Error logging out');
      }
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  return (
    <nav className='nav'>
      <ul>
      <li> <img src={logo} alt="Logo" className="logo1" /></li>
      <li><Link to="/Home2" className="nav-button">Home</Link></li>
      <li><Link to="/Support" className="nav-button">Support</Link></li>
      <li><Link to="/aboutus" className="nav-button">About Us</Link></li>

        {!isLoggedIn && (
          <>
            <li><Link to="/Signin" className="nav-Sbutton">Sign in</Link></li>
            <li><Link to="/SignUp" className="nav-Sbutton">Sign up</Link></li>
          </>
        )}
        {isLoggedIn && userRole === 'admin' && (
          <>
           <li><Link to="/Hotels" className="nav-button">Hotels</Link></li>
           <li><Link to="/TourPackage" className="nav-button">Tour Packages</Link></li>
           <li><Link to="/Transport" className="nav-button">Transports</Link></li>
           <li><Link to="/Restaurants" className="nav-button">Restaurants</Link></li>
           <li><Link to="/Admin" className="nav-button">Admin Panel</Link></li>
           </>
        )}
        {isLoggedIn && userRole === 'user' && (
          <>
          <li><Link to="/Hotels" className="nav-button">Hotels</Link></li>
          <li><Link to="/TourPackage" className="nav-button">Tour Packages</Link></li>
          <li><Link to="/Transport" className="nav-button">Transports</Link></li>
          <li><Link to="/Restaurants" className="nav-button">Restaurants</Link></li>
          </>
        )}
        {isLoggedIn && (
          <li>
            <button className='nav-lbutton' onClick={handleLogout}>Logout</button>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navigation;


// import React, { useState, useEffect } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import logo from '../img/logo.png'


// const Navigation = () => {
//   const [userRole, setUserRole] = useState('');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchUserRole = async () => {
//       try {
//         const response = await fetch('http://localhost:8080/auth/validate-token', {
//           credentials: 'include',
//         });
    
//         if (response.ok) {
//           const data = await response.json();
//           setUserRole(data.role);
//         } else {
//           setUserRole('');
//         }
//       } catch (error) {
//         console.error('Error fetching user role:', error);
//       }
//     };

//     fetchUserRole();
//   }, []);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch('http://localhost:8080/auth/logout', {
//         credentials: 'include',
//       });

//       if (response.ok) {
//         Cookies.remove('token'); // Remove the token from cookies
//         navigate('/'); // Redirect to the home page
//       } else {
//         console.error('Error logging out');
//       }
//     } catch (error) {
//       console.error('Error logging out:', error);
//     }
//   };

//   return (
//     <nav>
//       <ul>
//        <li> <img src={logo} alt="Logo" className="logo" /></li>
//         <li>
//         <Link to="/" className="nav-button">Home</Link>
          
//         </li>
        
//         <li><Link to="/ContactUs" className="nav-button">Contact Us</Link></li>
//          <li><Link to="/AboutUs" className="nav-button">About Us</Link></li>
        
//         {userRole === 'admin' && (
//           <>
//           <li><Link to="/Hotels" className="nav-button">Hotels</Link></li>
//           <li><Link to="/TourPackages" className="nav-button">Tour Packages</Link></li>
//           <li><Link to="/Transports" className="nav-button">Transports</Link></li>
//           <li><Link to="/Restaurants" className="nav-button">Restaurants</Link></li>
         
//          <li>
//             <Link to="/Admin">Admin Panel</Link>
//           </li>
//           <li>
//           <button onClick={handleLogout}>Logout</button>
//         </li>
//           </>
//         )}
//         {userRole === 'user' && (
//             <>
//           <li><Link to="/Hotels" className="nav-button">Hotels</Link></li>
//           <li><Link to="/TourPackages" className="nav-button">Tour Packages</Link></li>
//           <li><Link to="/Transports" className="nav-button">Transports</Link></li>
//           <li><Link to="/Restaurants" className="nav-button">Restaurants</Link></li>
//           <li>
//           <button onClick={handleLogout}>Logout</button>
//         </li>
//           </>
//         )}
     
       
//       </ul>
//     </nav>
//   );
// };

// export default Navigation;