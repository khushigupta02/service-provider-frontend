import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import { toast } from "react-toastify";
import "../../../style/feedback.css";
import api from "../../instance/Api";

const FeedbackFormModal = ({ show, onClose, bookingId }) => {
 const [star, setStar] = useState(0);
 const [feedback, setFeedback] = useState("");
 const [submitted, setSubmitted] = useState(false);

 const handleStarHover = (index) => {
    if (index > 0) {
      setStar(index);
    } else {
      setStar(prevStar => prevStar || 0);
    }
  };
  

 const handleStarClick = (index) => {
   console.log("Clicked star:", index);
   setStar(index);
 };

 const handleSubmit = async (e) => {
   e.preventDefault();
   const formData = {
     star,
     feedback,
   };

   try {
     await api.post(`http://localhost:8080/giveFeedback/${bookingId}`, formData);
     console.log("Feedback submitted:", formData);
     setSubmitted(true);
     toast.success("Feedback submitted successfully!");
   } catch (error) {
     console.error("Error submitting feedback:", error);
   }
 };

 const handleChange = (e) => {
   setFeedback(e.target.value);
 };

 return (
   <Modal show={show} onHide={onClose} contentLabel="Simple Modal">
     <Modal.Header closeButton className="feedbackmodel">
       <Modal.Title className="feedback-model-title">
         Enter your Feedback{" "}
       </Modal.Title>
     </Modal.Header>
     <Modal.Body>
       {!submitted ? (
         <form onSubmit={handleSubmit} className="px-4 py-2">
           <div className="mb-3">
             <label className="form-label">Rating</label>
             <br></br>
             {[...Array(5)].map((_, index) => (
               <span
                 key={index}
                 onMouseEnter={() => handleStarHover(index + 1)}
                 onMouseLeave={() => handleStarHover(0)}
                 onClick={() => handleStarClick(index + 1)}
                 style={{
                   cursor: "pointer",
                   color: index < star ? "#FDBA01" : "black",
                   marginRight: "4px",
                 }}
               >
                 ★
               </span>
             ))}
           </div>
           <div className="mb-3">
             <label className="form-label">Feedback</label>
             <textarea
               className="form-textarea"
               value={feedback}
               onChange={handleChange}
               rows={5}
               autoComplete="off"
               required
             />
           </div>
           <button type="submit" className="btn btn-feedback-submit mb-1 mx-1 px-4">Submit</button>
         </form>
       ) : (
         <div className="py-2 px-3">
           <h2 className="thanks-response">Thank you for your feedback!</h2>
           <p className=" mt-2">We appreciate your input.</p>
         </div>
       )}
     </Modal.Body>
   </Modal>
 );
};

export default FeedbackFormModal;