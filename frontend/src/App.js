import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/home';
import Signin from './pages/Signin';
import SignUp from './pages/SignUp';
import Home2 from './pages/home2';
import Admin from './pages/admin/adminPanale'
import EmployeeManage from './component/HR/EmployeeManage'
import PayrollForm from './component/HR/PayrollForm';
import CalculateSalary from './component/HR/CalculateSalary';
import AllPayrolls from './component/HR/AllPayrolls';
import UpdatePayroll from './component/HR/UpdatePayroll';
import AddEmployee from './component/HR/AddEmlpoyee';
import AllEmployees from './component/HR/AllEmployees';
import UpdateEmployee from './component/HR/UpdateEmployee';
import AddLoans from './component/HR/AddLoans';
import GetAllLoans from './component/HR/GetAllLoans';
import UpdateLoans from './component/HR/UpdateLoans';

import TourPackage from './pages/TourPackage/tourPackage';
import Adventure from './pages/TourPackage/adventure';
import Family from './pages/TourPackage/family';
import Sailing from './pages/TourPackage/Sailing';
import Wildlife from './pages/TourPackage/WildLife';
import Historical from './pages/TourPackage/Historical';
import Map from './pages/TourPackage/map';
import PackageManage from './pages/TourPackage/PackageManage';
import UpdatePackage from './pages/TourPackage/UpdatePackage';

import BookingPackage from './pages/TourPackage/bookingpackage';

import PaymentForm from './pages/Payment/PaymentForm';
import OnlinePayment from './pages/Payment/OnlinePayment';
import OfflinePayament from './pages/Payment/OfflinePayament';
import PaymentManage from './pages/Payment/PaymentManage';
import AllCoustomer from './pages/Payment/AllCoustomer';
import AllonlinePay from './pages/Payment/AllOnlinePay';
import AllOfflinePay from './pages/Payment/AllOfflinePay';
import UpdateCustomer from './pages/Payment/UpdateCoustomer';
import UpdateOfflinePay from './pages/Payment/UpdateOfflinePay';
import UpdateOnlinePay from './pages/Payment/UpdateOnlinePay';

import Homescreen from './pages/Transport/Homescreen';
import Bookingscreen from './pages/Transport/Bookingscreen';
import Details from './pages/Transport/Details';
import Adminscreen from './pages/Transport/Adminscreen';
import VehicleUpdate from './pages/Transport/VehicleUpdate';


import Support from "./pages/Support/Support";
import AddContact from "./pages/Support/AddContact";
import AllContacts from "./pages/Support/AllContacts";
import AddArticle from "./pages/Support/AddArticle";
import AllArticles from "./pages/Support/AllArticles";
import ViewAllArticles from "./pages/Support/ViewAllArticles";
import AdminSupport from "./pages/Support/AdminSupport";
import MessageUser from "./pages/Support/MessageUser";
import Message from "./pages/Support/Message";
import UserViewMessage from "./pages/Support/UserViewMessage";
import AdminMessage from "./pages/Support/AdminMessage";
import ComposeReply from "./pages/Support/ComposeReply";

import AdduserReview from './pages/Review/AdduserReview'; 
import AlluserReview from './pages/Review/AlluserReview'; 
import AdminReview from './pages/Review/AdminReview'; 
import AboutUS from './pages/Review/AboutUS';
import CustomerReview from './pages/Review/CustomerReview';
import MyReview from './pages/Review/MyReview';
import UpdateReview from './pages/Review/UpdateuserReview';


import './App.css'; 

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      
      <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/SignUp" element={<SignUp />} />
      <Route path="/Home2" element={<Home2 />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/EmployeeManage" element={<EmployeeManage />} />
      <Route path="/addpayroll" element={<PayrollForm/>} />
      <Route path="/calculate/:Employee_Name/:Status/:Working_Hours" element={<CalculateSalary/>} />
      <Route path="/allpayroll" element={<AllPayrolls/>} />
      <Route path="/update/:id" element={<UpdatePayroll/>} />
      <Route path="/addpayroll/:employee_Name/:status/:working_Hours/:monthlySalary/:EPF/:NetSalary" element={<PayrollForm/>} />
      <Route path="/addemp" element={<AddEmployee/>} />
      <Route path="/getemp" element={<AllEmployees/>} />
      <Route path="/updateEmp/:id" element={<UpdateEmployee/>} />
      <Route path="/accept" element={<AddLoans/>} />
      <Route path="/getloans" element={<GetAllLoans/>} />
      <Route path="/updateloan/:id" element={<UpdateLoans/>} />
      <Route path="/TourPackage" element={<TourPackage/>} />
      <Route path="/Adventure" element={<Adventure/>} />
      <Route path="/Family" element={<Family/>} />
      <Route path="/Sailing" element={<Sailing/>} />
      <Route path="/Wildlife" element={<Wildlife/>} />
      <Route path="/Historical" element={<Historical/>} />
      <Route path="/Map" element={<Map/>} />
      <Route path="/PackageManage" element={<PackageManage/>} />
      <Route path="/updatePackage/:id" element={<UpdatePackage/>} />
      <Route path="/BookingPackage" element={<BookingPackage/>} />

      <Route path="/PaymentForm" element={<PaymentForm />} />
      <Route path="/OfflinePayament" element={<OfflinePayament />} />
      <Route path="/PaymentManage" element={<PaymentManage />} />
      <Route path="/AllCoustomer" element={<AllCoustomer />} />
      <Route path="/AllonlinePay" element={<AllonlinePay />} />
      <Route path="/AllOfflinePay" element={<AllOfflinePay />} />
      <Route path="/updateCustomer/:id" element={<UpdateCustomer/>} />
      <Route path="/UpdateOfflinePay/:id" element={<UpdateOfflinePay/>} />
      <Route path="/UpdateOnlinePay/:id" element={<UpdateOnlinePay/>} />
      <Route path="/OnlinePayment/:First_Name/:Last_name/:Amount/:Service" element={<OnlinePayment/>} />

      <Route path="/book/:vehicleid" exact element={<Bookingscreen />} />
      <Route path ="/booking" exact element = {  <Details/>} />
      <Route path = "/TransportManage" exact element={<Adminscreen/>} />
      <Route path="/vehicleupdate/:id" element={<VehicleUpdate/>} />
      <Route path="/Transport" exact element={<Homescreen />} />

      <Route path="/add" element={<AddContact />} />
      <Route path="/all" element={<AllContacts />} />
      <Route path="/add_article" element={<AddArticle />} />
      <Route path="/all_article" element={<AllArticles />} />
      <Route path="/view" element={<ViewAllArticles />} />
      <Route path="/Support" element={<Support />} />
      <Route path="/AdminSupport" element={<AdminSupport />} />
      <Route path="/MessageUser" element={<MessageUser />} />
      <Route path="/Message" element={<Message />} />
      <Route path="/UserViewMessage" element={<UserViewMessage />} />
      <Route path="/AdminMessage" element={<AdminMessage />} />
      <Route path="/ComposeReply" element={<ComposeReply />} />

      <Route path="/AlluserReview" exact element={<AlluserReview />} /> 
      <Route path="/addfeedback" exact element={<AdduserReview />} /> 
      <Route path="/aboutus" exact element={<AboutUS />} /> 
      <Route path="/cusreview" exact element={<CustomerReview />} /> 
      <Route path="/AdminReview" exact element={<AdminReview />} /> 
      <Route path="/MyReview" exact element={<MyReview />} /> 
      <Route path="/UpdateReview/:id" element={<UpdateReview/>} />
      


      </Routes>
       </BrowserRouter>
 </div>
  );
}

export default App;
