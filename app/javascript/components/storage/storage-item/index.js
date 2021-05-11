import React, { useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import axios from "axios";

const StorageItem = ({
  id,
  name,
  description,
  firstname,
  date,
  phone,
  service_id,
}) => {
  const [service, setService] = useState(undefined);

  useEffect(() => {
    axios
      .get("/service/" + service_id)
      .then((response) => {
        setService(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [service != undefined]);

  return (
    <>
      {service === undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <Card>
          <Card.Header>
            <h1>{name}</h1>
            <h5>{service.attributes.name}</h5>
            <h5>{id}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>{firstname}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{phone}</Card.Text>
            <Card.Text>{date}</Card.Text>
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default StorageItem;
