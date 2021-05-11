import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Row, Button } from "react-bootstrap";

import "./forms.css";

const ServiceForm = () => {
  const [service, setService] = useState({
    name: "",
    description: "",
    price: 0,
  });

  useEffect(() => {}, []);

  const handleChange = (e) => {
    e.preventDefault();
    setService({ ...service, [e.target.name]: e.target.value });
  };

  const addService = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    axios
      .post("/service", { service })
      .then((response) => {
        setService({ name: "", description: "", price: 0 });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="back-img2">
      <Form onSubmit={addService}>
        <h1>Добавление услуги</h1>
        <Row>
          <Form.Group>
            <Form.Label>Наименование услуги</Form.Label>
            <FormControl
              value={service.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Цена</Form.Label>
            <FormControl
              value={service.price}
              name="price"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Описание услуги</Form.Label>
            <FormControl
              as="textarea"
              rows={3}
              value={service.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" onClick={addService}>
          Добавить
        </Button>
      </Form>
    </div>
  );
};

export default ServiceForm;
