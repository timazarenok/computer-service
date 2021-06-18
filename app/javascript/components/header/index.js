import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./header.css";

const Header = ({ isLog, user, logout }) => (
  <Nav className="justify-content-end" fixed="top">
    <Navbar>
      <Navbar.Brand>HEY DUDE</Navbar.Brand>
    </Navbar>
    <Nav.Item>
      <Link to="/">Главная</Link>
    </Nav.Item>
    {user.username === "admin" ? (
      <>
        <Nav.Item>
          <Link to="/service-add">Новая услуга</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/storage">Телефоны</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/masters">Мастера</Link>
        </Nav.Item>
      </>
    ) : null}
    {
      user.username !== "admin" && isLog ? (
        <>
          <Nav.Item>
            <Link to="/application-add">Оформление заявки</Link>
          </Nav.Item>
          <Nav.Item>
            <Link to="/user-app">Мои заявки</Link>
          </Nav.Item>
        </>) : null
    }
    {isLog ? (
      <Nav.Item>
        <Link to="/" onClick={logout}>
          Выход
        </Link>
      </Nav.Item>
    ) : (
      <>
        <Nav.Item>
          <Link to="/login">Войти</Link>
        </Nav.Item>
        <Nav.Item>
          <Link to="/reg">Регистрация</Link>
        </Nav.Item>
      </>
    )}
  </Nav>
);

export default Header;
