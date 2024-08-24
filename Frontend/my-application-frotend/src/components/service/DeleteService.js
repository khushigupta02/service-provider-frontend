import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../../style/viewAllUser.css";

const DeleteService = ({ service, onClose, onDelete }) => {
  const handleDelete = () => {
    console.log("Deleting service with ID:", service);
    axios
      .delete(`http://localhost:8080/deleteService/${service}`)
      .then(() => {
        console.log("Service deleted successfully");
        toast.dark("Service deleted successfully!");
        onDelete();
        onClose();
      })
      .catch((error) => {
        console.error("Error deleting service:", error);
      });
  };

  return (
    <div>
      <h5 className="mb-4">Are you sure you want to delete this service?</h5>

      <button type="submit" onClick={onClose} className="btn btn-dark my-2">
        Cancel
      </button>
      <button
        type="submit"
        onClick={handleDelete}
        className="btn btn-danger my-2 mx-4"
      >
        Delete
      </button>
    </div>
  );
};

export default DeleteService;
