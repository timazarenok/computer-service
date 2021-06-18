import React, { useState, useEffect } from "react";
import axios from "axios";
import StorageItem from "./storage-item";
import { Card, Form, Button, Row, FormControl } from 'react-bootstrap'

import "./storage.css";

const Storage = () => {
  const [applications, setApplications] = useState([]);
  const [included, setIncluded] = useState([]);

  const [masters, setMasters] = useState([]);

  const [order, setOrder] = useState({
    application_id: 0,
    master_id: 0,
    days: 0,
    result: 0
  })

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrder({ ...order, [name]: value })
  }

  useEffect(() => {
    updateData();
  }, [applications.length, included.length, masters.length]);

  const updateStatus = () => {
    const application = {
      status: true,
    }

    axios.post('/order', order)
      .then(response => {
        setOrder({
          application_id: 0,
          master_id: 0,
          days: 0,
          result: 0
        })
        axios.put("/applications/" + order.application_id, application)
          .then(response => {
            updateData();
          })
          .catch(err => console.log(err))
      })
      .catch(err => console.log(err))
  }

  const updateData = () => {
    axios
      .get("/applications")
      .then((response) => {
        setApplications(response.data.data);
        console.log(response.data.data)
        setOrder({ ...order, application_id: response.data.data.filter(el => el.attributes.status === false)[0].id })
        setIncluded(response.data.included)
      })
      .catch((err) => console.log(err));
    axios.get('/master')
      .then(response => {
        setMasters(response.data.data)
        setOrder({ ...order, master_id: response.data.data[0].id })
      })
      .catch(err => console.log(err))
  }

  return (
    <>
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
      <Card className="order-card">
        <Form className="order-form" onSubmit={updateStatus}>
          <h1>Форма передачи на ремонт</h1>
          <Row>
            <Form.Group>
              <Form.Label>Номер заявки</Form.Label>
              <FormControl
                as="select"
                value={order.application_id}
                name="application_id"
                onChange={handleChange}
              >
                {applications.filter(el => el.attributes.status === false).map(el => <option value={el.attributes.id}>{el.attributes.id}</option>)}
              </FormControl>
            </Form.Group>
            <Form.Group>
              <Form.Label>Кол-во дней затраченных на ремонт</Form.Label>
              <FormControl
                type="number"
                value={order.days}
                name="days"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Row>
            <Form.Group>
              <Form.Label>Мастер</Form.Label>
              <FormControl
                as="select"
                value={order.master_id}
                name="master_id"
                onChange={handleChange}
              >
                {
                  masters.map(el => <option value={el.id}>{el.attributes.name}</option>)
                }
              </FormControl>
            </Form.Group>
            <Form.Group>
              <Form.Label>Стоимость ремонта</Form.Label>
              <FormControl
                type="number"
                value={order.result}
                name="result"
                onChange={handleChange}
              />
            </Form.Group>
          </Row>
          <Button className="button" onClick={updateStatus}>Передать заявку на ремонт</Button>
        </Form>
      </Card>
    </>
  );
};

export default Storage;
