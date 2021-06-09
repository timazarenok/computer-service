import React from "react";
import { Nav } from "react-bootstrap";
import { Link } from "react-router-dom";

import "./header.css";

const Header = ({ isLog, user, logout }) => (
  <Nav className="justify-content-end" fixed="top">
    <Nav.Item>
      <Link to="/">Главная</Link>
    </Nav.Item>
    {
      user.username === "admin" ? (<Nav.Item>
        <Link to="/storage">Товары</Link>
      </Nav.Item>
      ) : null
    }
    {user.username === "admin" ? (
      <Nav.Item>
        <Link to="/service-add">Новая услуга</Link>
      </Nav.Item>
    ) : null}
    {
      user.username !== "admin" ? (
      <Nav.Item>
        <Link to="/application-add">Ремонт</Link>
      </Nav.Item>) : null
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
