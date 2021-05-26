import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./singup.css";

const Singup = (props) => {
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    password_confirmation: "",
  });
  
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/users", { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.status === "created") {
          props.handleLogin(response.data);
          redirect();
        } else {
          setErrors(response.data.errors);
        }
      })
      .catch((error) => console.log("api errors:", error));
  };

  const redirect = () => {
    props.history.push("/");
  };

  const handleErrors = () => {
    return (
      <div>
        <ul>
          {errors.map((error) => {
            return <li key={error}>{error}</li>;
          })}
        </ul>
      </div>
    );
  };

  return (
    <Form onSubmit={handleSubmit} className="reg-form">
      <Row>
        <Form.Group>
          <Form.Label>Логин</Form.Label>
          <Form.Control
            placeholder="Логин"
            type="text"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            placeholder="email"
            type="text"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Row>
        <Form.Group>
          <Form.Label>Пароль</Form.Label>
          <Form.Control
            placeholder="Пароль"
            type="password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>Подтверждение пароля</Form.Label>
          <Form.Control
            placeholder="Подтвердите пароль"
            type="password"
            name="password_confirmation"
            value={user.password_confirmation}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>
      <Button placeholder="submit" type="submit">
        Регистрация
      </Button>
    </Form>
  );
};

export default withRouter(Singup);
