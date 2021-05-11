import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Row, Button } from "react-bootstrap";

const ApplicationForm = () => {
  const [application, setApplication] = useState({
    name: "",
    description: "",
    phone: "",
    service_id: 0,
    firstname: "",
    date: "",
  });

  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/service")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((err) => console.log(err));
      console.log(services)
  }, [services.length]);

  const handleChange = (e) => {
    e.preventDefault();
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const addApplication = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    axios
      .post("/applications", { application })
      .then((response) => {
        setApplication({
          name: "",
          description: "",
          phone: "",
          service_id: 0,
          firstname: "",
          date: "",
        });
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="back-img">
      <Form onSubmit={addApplication}>
        <h1>Заполните заявку на ремонт</h1>
        <Row>
          <Form.Group>
            <Form.Label>Наименование телефона</Form.Label>
            <FormControl
              value={application.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Дата</Form.Label>
            <FormControl
              type="date"
              value={application.date}
              name="date"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Контактный номер</Form.Label>
            <FormControl
              value={application.phone}
              name="phone"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Услуга</Form.Label>
            <Form.Control
              as="select"
              value={application.service_id}
              name="service_id"
              onChange={handleChange}
            >
              {services.map((el) => (
                <option key={el.attributes.id} value={el.attributes.id}>
                  {el.attributes.name}
                </option>
              ))}
            </Form.Control>
          </Form.Group>
        </Row>
        <Row>
          <Form.Group>
            <Form.Label>Ваше имя</Form.Label>
            <FormControl
              value={application.firstname}
              name="firstname"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Row>
          <Form.Group className="description-group">
            <Form.Label>Описание поломки</Form.Label>
            <FormControl
              as="textarea"
              rows={3}
              value={application.description}
              name="description"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button type="submit" onClick={addApplication}>
          Отправить
        </Button>
      </Form>
    </div>
  );
};

export default ApplicationForm;
