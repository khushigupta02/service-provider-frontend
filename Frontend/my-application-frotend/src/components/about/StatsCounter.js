import React from "react";
import "../../style/stats-counter.css"; 

const StatsCounter = () => {
  const clientsServed = 100;
  const projectsCompleted = 50;
  const positiveFeedback = 95;
  const serviceProvider = 30;


  return (
    <div className="container-fluid py-5 stats-counter">
        <div className="container py-4">
        <div className="stats-counter">
      <div className="stat">
        <div className="circle">
          <i className="fa fa-users"></i>
        </div>
        <h3>{clientsServed}+</h3>
        <p>Clients Served</p>
      </div>
      <div className="stat">
        <div className="circle">
          <i className="fa fa-tasks"></i>
        </div>
        <h3>{projectsCompleted}+</h3>
        <p>Projects Completed</p>
      </div>
      <div className="stat">
        <div className="circle">
          <i className="fa fa-thumbs-up"></i>
        </div>
        <h3>{positiveFeedback}+</h3>
        <p>Positive Feedback</p>
      </div>
      <div className="stat">
        <div className="circle">
          <i className="fa fa-cog"></i>
        </div>
        <h3>{serviceProvider}+</h3>
        <p>Service Provider</p>
      </div>
    </div>
        </div>
    </div>
  );
};

export default StatsCounter;
