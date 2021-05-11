import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button, Form, Row } from "react-bootstrap";
import { withRouter } from "react-router-dom";

import "./login.css";

const Login = (props) => {
  const [user, setUser] = useState({ username: "", email: "", password: "" });
  const [errors, setErrors] = useState([]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post("http://localhost:3000/login", { user }, { withCredentials: true })
      .then((response) => {
        if (response.data.logged_in) {
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

  useEffect(() => {
    if (props.isLog) {
      props.history.push("/");
    }
  }, []);

  return (
    <Form onSubmit={handleSubmit} className="login-form">
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
      </Row>
      <Button placeholder="submit" type="submit">
        Войти
      </Button>
      <Button onClick={() => props.history.push("/signup")}>Регистрация</Button>
    </Form>
  );
};

export default withRouter(Login);
