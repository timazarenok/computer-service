import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageItem from "./storage-item";

import "./storage.css";

const Storage = () => {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    axios
      .get("/applications")
      .then((response) => {
        setApplications(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [applications.length]);

  return (
    <ul className="storage-list">
      {applications.map((el) => (
        <li key={el.attributes.id}>
          <StorageItem
            {...el.attributes}
            service_id={el.relationships.service.data.id}
          />
        </li>
      ))}
    </ul>
  );
};

export default Storage;
