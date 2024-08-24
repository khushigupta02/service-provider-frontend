import React from 'react'
import { Link  } from "react-router-dom";
import '../../style/sidebar.css'
const AdminSideBar = () => {
    return (
        <div className='admin-sidebar'>
        <nav >    
          <ul className="list-unstyled components">
            <li>
              <Link to="/adminAllUserDashboard" style={{textDecoration:"none" , color:"white"}}>All User</Link>
            </li>
            <li>
              <Link to="/adminAllServiceDashboard" style={{textDecoration:"none" , color:"white"}}>All Services</Link>
            </li>
            <li>
              <Link to="/adminAllCustomerDashboard" style={{textDecoration:"none" ,  color:"white"}}>All Customer</Link>
            </li>
            <li>
              <Link to="/adminAllServiceProviderDashboard" style={{textDecoration:"none", color:"white"}}>All Service Provider</Link>
            </li>
            <li>
              <Link to="/adminAllServiceTypeDashboard" style={{textDecoration:"none" ,  color:"white"}}>All Service Type</Link>
            </li>
          </ul>
        </nav>
        </div>
      );
}

export default AdminSideBar
