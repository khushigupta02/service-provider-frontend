import React, { useEffect, useState } from "react";
import axios from "axios";
import $ from "jquery";
import "datatables.net-dt/js/dataTables.dataTables";
import "datatables.net-dt/css/jquery.dataTables.min.css";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import "../../style/adminDashboard.css";
import AdminSideBar from "../sidebar/AdminSideBar";
import Header from "../header/Header";
import AddUser from "../user/AddUser";
import DeleteUser from "../user/DeleteUser";
import EditUserDetails from "../user/EditUserDetails";

const AdminAllCustomerDataTable = () => {
    const [data, setData] = useState([]);
    const [show, setShow] = useState(false);
    const [showEditUserModal, setShowEditUserModal] = useState(false);
    const [editUser, setEditUser] = useState(null);
    const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
    const [deleteUserId, setDeleteUserId] = useState(null);
  
    useEffect(() => {
      axios
        .get("http://localhost:8080/viewAllCustomer/customer")
        .then((response) => {
          setData(response.data);
          $(document).ready(function () {
            $(".myTable").DataTable();
          });
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }, [showEditUserModal, showDeleteUserModal]);
  
    const columns = [
      {
        dataField: "id",
        text: "ID",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
      },
      {
        dataField: "firstName",
        text: "First Name",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
      },
      {
        dataField: "lastName",
        text: "Last Name",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
      },
      {
        dataField: "userName",
        text: "Username",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
      },
      {
        text: "Role",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
        formatter: (cell, row) =>
          row.userType && row.userType.roleName ? row.userType.roleName : "",
      },
      {
        text: "Edit",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
        formatter: (cell, row) => (
          <Button
            className="px-4"
            style={{ background: "#91bacf", color: "black" }}
            onClick={() => handleEdit(row)}
          >
            Edit
          </Button>
        ),
      },
      {
        text: "Delete",
        headerStyle: {
          backgroundColor: "#91bacf",
        },
        formatter: (cell, row) => (
          <Button
            style={{ background: "black", color: "white" }}
            onClick={() => handleShowDeleteUserModal(row.id)}
          >
            Delete
          </Button>
        ),
      },
    ];
    const handleShow = () => setShow(true);
    const handleClose = () => setShow(false);
  
    const handleEdit = (user) => {
      setEditUser(user);
      setShowEditUserModal(true);
    };
  
    const handleCloseEditUserModal = () => {
      setEditUser(null);
      setShowEditUserModal(false);
    };
  
    const handleShowDeleteUserModal = (id) => {
      setDeleteUserId(id);
      setShowDeleteUserModal(true);
    };
  
    const handleCloseDeleteUserModal = () => {
      setDeleteUserId(null);
      setShowDeleteUserModal(false);
    };
    const handleDelete = () => {
      setShowDeleteUserModal(false);
    };
  
    return (
      <div className="container-fluid mx-0 px-0">
        <Header />
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Add Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddUser />
          </Modal.Body>
        </Modal>
        <Modal show={showEditUserModal} onHide={handleCloseEditUserModal}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Customer</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {showEditUserModal && (
              <EditUserDetails user={editUser} onClose={handleCloseEditUserModal} />
            )}
          </Modal.Body>
        </Modal>
        <Modal show={showDeleteUserModal} onHide={handleCloseDeleteUserModal}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {showDeleteUserModal && (
              <DeleteUser
                user={deleteUserId}
                onClose={handleCloseDeleteUserModal}
                onDelete={handleDelete}
              />
            )}
          </Modal.Body>
        </Modal>
        <div className="row ">
          <div className="col-lg-2 col-md-2 col-sm-2 adminSidebar">
            <AdminSideBar />
          </div>
          <div className="col-lg-10 col-md-10 col-sm-10 p-5">
            <Button
              className="mb-3"
              style={{ backgroundColor: "black", color: "rgb(147, 201, 237)" }}
              onClick={handleShow}
            >
              Add Customer
            </Button>
            <h3 className="text-center">All Customer</h3>
            <table className="table myTable">
              <thead>
                <tr>
                  {columns.map((column, index) => (
                    <th key={index} style={column.headerStyle}>
                      {column.text}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr key={item.id}>
                    {columns.map((column, index) => (
                      <td key={index}>
                        {column.formatter
                          ? column.formatter(item[column.dataField], item)
                          : item[column.dataField]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  };
export default AdminAllCustomerDataTable
