import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageItem from "../storage/storage-item";
import { withRouter } from "react-router-dom";

import "../storage/storage.css";

const UserApplications = (props) => {
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
      {applications.filter(el => el.attributes.user_id === props.user.id).map((el) => (
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
  )
}

export default withRouter(UserApplications);