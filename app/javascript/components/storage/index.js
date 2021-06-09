import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageItem from "./storage-item";

import "./storage.css";

const Storage = () => {
  const [applications, setApplications] = useState([]);
  const [included, setIncluded] = useState([]);

  useEffect(() => {
    updateData();
  }, [applications.length, included.length]);
  
  const updateData = () => {
    axios
      .get("/applications")
      .then((response) => {
        setApplications(response.data.data);
        setIncluded(response.data.included)
      })
      .catch((err) => console.log(err));
  }

  return (
    <ul className="storage-list">
      {applications.map((el) => (
        <li key={el.attributes.id}>
          <StorageItem
            {...el.attributes}
            services={el.relationships.services.data}
            included={included}
            updateData={updateData}
          />
        </li>
      ))}
    </ul>
  );
};

export default Storage;
