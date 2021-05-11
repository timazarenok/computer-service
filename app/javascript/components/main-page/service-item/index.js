import React from 'react'

const ServiceItem = ({id, name, description, price}) => (
  <tr>
    <td>{id}</td>
    <td>{name}</td>
    <td>{description}</td>
    <td>{price}</td>
  </tr>
)

export default ServiceItem;