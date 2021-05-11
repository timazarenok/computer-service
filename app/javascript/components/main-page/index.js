import React, { useEffect, useState } from "react";
import axios from "axios";
import { Table } from "react-bootstrap";
import ServiceItem from "./service-item";
import "./main-page.css";
import MyCarousel from "../my-carousel";

const Main = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    axios
      .get("/service")
      .then((response) => {
        setServices(response.data.data);
      })
      .catch((err) => console.log(err));
  }, [services.length]);

  return (
    <>
      <MyCarousel/>
      <h1 className="header-main">Услуги</h1>
      {services === undefined ? (
        <div>Undefined</div>
      ) : (
        <>
          <div className="table-responsive">
            <Table bordered hover>
              <thead>
                <tr>
                  <th width="70px">Номер</th>
                  <th width="300px">Наименование</th>
                  <th width="300px">Описание</th>
                  <th width="70px">Цена</th>
                </tr>
              </thead>
              <tbody>
                {services.map((el) => (
                  <ServiceItem {...el.attributes} />
                ))}
              </tbody>
            </Table>
          </div>
        </>
      )}
    </>
  );
};

export default Main;
