import React, { useState, useEffect } from 'react';
import axios from 'axios';
import BootstrapTable from 'react-bootstrap-table-next';  
import paginationFactory from 'react-bootstrap-table2-paginator';  
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-bootstrap-table-next/dist/react-bootstrap-table2.min.css';
import "../../style/viewAllUser.css";

const ViewAllUser = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/viewAllUser')
      .then(response => {
        setData(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []); 

  const columns = [
    {
      dataField: 'id',
      text: 'ID',
      headerStyle: {
        backgroundColor: '#91bacf',
      },
    },
    {
      dataField: 'firstName',
      text: 'First Name',
      headerStyle: {
        backgroundColor: '#91bacf',
      },
    },
    {
        dataField: 'lastName',
        text: 'Last Name',
        headerStyle: {
            backgroundColor: '#91bacf',
          },
      },
    {
      dataField: 'userName',
      text: 'Username',
      headerStyle: {
        backgroundColor: '#91bacf',
      },
    },
    {
        dataField: 'userType.roleName',  
        text: 'Role',
        headerStyle: {
            backgroundColor: '#91bacf',
        },
      },
  ];

  return (
   <div className='container py-5'>
    <h1>dgdgdgg</h1>
    <h3 className='mb-5 text-center'>All Users</h3>
     <BootstrapTable className="my-5"
      keyField="id"
      data={data}
      columns={columns}
      pagination={paginationFactory()}
    />
   </div>
  );
};

export default ViewAllUser;
