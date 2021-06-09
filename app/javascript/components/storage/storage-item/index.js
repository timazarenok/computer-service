import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import axios from "axios";

import './storage-item.css'

const StorageItem = ({
  id,
  name,
  description,
  firstname,
  date,
  phone,
  status,
  services,
  included,
  updateData
}) => {

  const [serviceItems, setServiceItems] = useState([])

  useEffect(() => {
    common(included, services)
  }, [services.length, included.length])

  const updateStatus = () => {
    const application = {
      status: true,
    }

    axios.put("/applications/" + id, application)
      .then(response => {
        updateData();
      })
      .catch(err => console.log(err))
  }

  const common = (arr1, arr2) => {
    let newArr = [];
    arr2.map(ser => {
      arr1.filter(el => el.id === ser.id).map(el => newArr.push(el.attributes.name))
    })
    setServiceItems(newArr);
  }

  return (
    <>
      {services === undefined ? (
        <div>
          <h1>Loading...</h1>
        </div>
      ) : (
        <Card>
          <Card.Header>
            <h1>{name}</h1>
            <ul>
              {
                serviceItems.map(el => (
                  <h5 key={el}>{el}</h5>
                ))  
              }
            </ul>
            <h5>Номер: {id}</h5>
          </Card.Header>
          <Card.Body>
            <Card.Title>{firstname}</Card.Title>
            <Card.Text>{description}</Card.Text>
            <Card.Text>{phone}</Card.Text>
            <Card.Text>{date}</Card.Text>
            <Card.Text>{status ? "Обработан" : "Не обработан"}</Card.Text>
            {
              status ? null : <Button className="storage-button" onClick={updateStatus}>Передать на ремонт</Button>
            }
          </Card.Body>
        </Card>
      )}
    </>
  );
};

export default StorageItem;
