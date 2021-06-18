import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form, FormControl, Row, Button } from "react-bootstrap";
import InputMask from "react-input-mask";

import './forms.css'

const MasterForm = () => {

  const [master, setMaster] = useState({
    name: "",
    telephone: ""
  })

  const [masters, setMasters] = useState([])

  useEffect(() => {
    axios.get('/master')
      .then(response => {
        console.log(response.data.data)
        setMasters(response.data.data);
      })
      .catch(err => console.log(err))
  }, [masters.length])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setMaster({ ...master, [name]: value });
  }

  const addMaster = (e) => {
    e.preventDefault();
    const csrfToken = document.querySelector("[name=csrf-token]").content;
    axios.defaults.headers.common["X-CSRF-TOKEN"] = csrfToken;

    axios.post('/master', master).then(respnse => {
      axios.get('/master')
        .then(response => {
          console.log(response.data.data)
          setMasters(response.data.data);
        })
        .catch(err => console.log(err))
    })
      .catch(err => console.log(err))
  }

  return (
    <>
      <Form onSubmit={addMaster} className="master-form">
        <h1>Добавьте нового мастера</h1>
        <Row>
          <Form.Group>
            <Form.Label>ФИО мастера</Form.Label>
            <FormControl
              value={master.name}
              name="name"
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Контактный номер</Form.Label>
            <InputMask
              className="form-control"
              mask="+375 (99) 999-99-99"
              value={master.telephone}
              name="telephone"
              placeholder="+375 (99) 99-99-99"
              onChange={handleChange}
            />
          </Form.Group>
        </Row>
        <Button onClick={addMaster}>Добавить</Button>
      </Form>
      <h1>Мастера</h1>
      <ul className="masters-list">
        {
          masters === undefined ? null :
            masters.map(el => (
              <li>
                <Card>
                  <Card.Header>
                    {el.attributes.name}
                    <h6 className="card-subtitle mb-2 text-muted">
                      {el.attributes.telephone}
                    </h6>
                  </Card.Header>
                </Card>
              </li>
            ))
        }
      </ul>
    </>
  )
}

export default MasterForm;