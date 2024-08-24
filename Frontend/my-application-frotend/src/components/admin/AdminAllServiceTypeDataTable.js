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
import AdminAddService from "./adminOperation/AdminAddService";
import DeleteService from "../service/DeleteService";
import EditServiceType from "../service/EditServiceType";

const AdminAllServiceTypeDataTable = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);
  const [showEditServiceTypeModal, setShowEditServiceTypeModal] = useState(false);
  const [editServiceType, setEditServiceType] = useState(null);
  const [showDeleteUserModal, setShowDeleteUserModal] = useState(false);
  const [deleteServiceId, setDeleteServiceId] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:8080/viewAllServiceType")
      .then((response) => {
        setData(response.data);
        $(document).ready(function () {
          $(".myTable").DataTable();
        });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [showEditServiceTypeModal, showDeleteUserModal]);

  const columns = [
    {
      dataField: "id",
      text: "ID",
      headerStyle: {
        backgroundColor: "#91bacf",
      },
    },
    {
      dataField: "name",
      text: "Name",
      headerStyle: {
        backgroundColor: "#91bacf",
      },
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
    // {
    //   text: "Delete",
    //   headerStyle: {
    //     backgroundColor: "#91bacf",
    //   },
    //   formatter: (cell, row) => (
    //     <Button
    //       style={{ background: "black", color: "white" }}
    //       onClick={() => handleShowDeleteServiceModal(row.id)}
    //     >
    //       Delete
    //     </Button>
    //   ),
    // },
  ];
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  const handleEdit = (serviceType) => {
    setEditServiceType(serviceType);
    setShowEditServiceTypeModal(true);
  };

  const handleCloseEditUserModal = () => {
    setEditServiceType(null);
    setShowEditServiceTypeModal(false);
  };

//   const handleShowDeleteServiceModal = (id) => {
//     setDeleteServiceId(id);
//     setShowDeleteUserModal(true);
//   };
  
  const handleCloseDeleteServiceModal = () => {
    setDeleteServiceId(null);
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
          <Modal.Title>Add Service Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <AdminAddService />
        </Modal.Body>
      </Modal>
      <Modal show={showEditServiceTypeModal} onHide={handleCloseEditUserModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Service Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {showEditServiceTypeModal && (
            <EditServiceType serviceType={editServiceType} onClose={handleCloseEditUserModal} />
          )}
        </Modal.Body>
      </Modal>
      <Modal show={showDeleteUserModal} onHide={handleCloseDeleteServiceModal}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          {showDeleteUserModal && (
            <DeleteService
              service={deleteServiceId}
              onClose={handleCloseDeleteServiceModal}
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
            Add Service Type
          </Button>
          <h3 className="text-center">All Service Type</h3>
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

export default AdminAllServiceTypeDataTable;
