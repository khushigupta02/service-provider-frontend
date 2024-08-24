import React, { useState, useEffect } from "react";
import axios from "axios";
import '../../../style/allService.css'; // Import CSS file

const AllService = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const result = await axios.get("http://localhost:8080/viewAllService");
      setData(result.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="container service-page py-5">
        <h3 className="all-service-heading pt-1 pb-1">
       Let Us Handle the Mess While You Enjoy Your Time
        </h3>
        <p className="py-2 service-paragraph">Busy life? Our professional household chores service frees you. In the hustle and bustle of daily life, finding time for what 
            truly matters can be a challenge. That's where our professional household chores service steps in, offering you valuable time 
            back in your day. Our expert team diligently tackles cleaning, organizing, laundry, and errands, ensuring your home remains a 
            sanctuary of calm and relaxation. Reclaim your precious moments with loved ones and simplify 
            your life today with our trusted household chores service.</p>
            <h3 className="all-home-heading service-page-head pt-5 pb-2 mb-3" style={{float:"right" }}>
            Expert Chores Services      </h3>
      <table className="py-2 ">
        <thead>
          <tr className="table-heading">
            <th className="column-id">Id</th>
            <th className="column-service">Service Name</th>
            <th className="column-description">Description</th>
            <th className="column-service-type">Service Type</th>
            <th className="column-hourly-rate">Hourly Rate</th>
          </tr>
        </thead>
        <tbody >
          {data.map((row, index) => (
            <tr
              key={index} className="table-body"
            >
              <td className="cell-id">{row.id}</td>
              <td className="cell-serviceName">{row.serviceName}</td>
              <td className="cell-description">{row.description}</td>
              <td className="cell-iserviceType">{row.serviceType.name}</td>
              <td className="cell-hourlyRate">$ {row.hourlyRate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllService;
