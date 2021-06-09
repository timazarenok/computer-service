import axios from "axios";
import React, { useEffect, useState } from "react";
import { Form, FormControl, Row, Button } from "react-bootstrap";

const ApplicationForm = () => {
  const [application, setApplication] = useState({
    name: "",
    description: "",
    phone: "",
    firstname: "",
    date: "",
  });

  const [services_ids, setServicesIds] = useState([]);
  const [services, setServices] = useState([]);
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    axios
      .get("/service")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [services.length, services_ids.length]);

  const handleChange = (e) => {
    e.preventDefault();
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  const onChangeIds = (e) => {
    const { name, checked } = e.target;
    let newServices = [...services_ids];
    if(checked){
      newServices.push(name);
    }
    else {
      const index = newServices.indexOf(name);
      newServices.splice(index, 1);
    }
    setServicesIds(newServices)
  }

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
          firstname: "",
          date: "",
          status: false
        });
        services_ids.map(el => {
          axios
          .post("/application_services", { 
            service_id: el,
            application_id: response.data.data.attributes.id
           })
          .then((response) => {
    
           })
          .catch((err) => console.log(err));
        })
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
            <Button className="application-button" onClick={() => setClicked(!clicked)}>Выбрать услуги</Button>
            <ul className={`dropdown-menu checkbox-menu ${clicked ? "show" : ""}`}>
              {services.map((el) => (
                <li>
                  <label>
                    <input type="checkbox" onChange={onChangeIds} name={el.attributes.id} />
                    {el.attributes.name}
                  </label>
                </li>
              ))}
            </ul>
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
