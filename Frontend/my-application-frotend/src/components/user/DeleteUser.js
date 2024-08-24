// DeleteUser.js
import React from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../style/viewAllUser.css'
const DeleteUser = ({ user, onClose, onDelete }) => {
    const handleDelete = () => {
      console.log("Deleting user with ID:", user);
      axios
        .delete(`http://localhost:8080/deleteUser/${user}`)
        .then(() => {
          console.log("User deleted successfully");
          toast.dark("User deleted successfully!", {
            className: "custom-toast",
            style: {
              backgroundColor: "rgb(147, 201, 237)", 
              color: "black",
            },
          });
          onDelete();
          onClose();
        })
        .catch((error) => {
          console.error("Error deleting user:", error);
        });
    };

  return (
    <div>
      <h5 className="mb-4">Are you sure you want to delete this user?</h5>

      <button type="submit" onClick={onClose} className="btn btn-dark my-2 ">
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

export default DeleteUser;
