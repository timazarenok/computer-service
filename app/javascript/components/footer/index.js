import React from 'react'

import './footer.css'

const Footer = () => {
  return (
    <div className="footer">
      <h3>Компания «Hey Dude»</h3>
      <div>
        <span>РЕЖИМ РАБОТЫ:</span>
        <span>09:00-21:00</span>
      </div>
      <h3>ИНФОЦЕНТР:</h3>
      <a href="tel:+375 (17) 388-69-88">+375 (17) 388-69-88</a>
      <h3>РАЗМЕЩЕНИЕ РЕКЛАМЫ:</h3>
      <a href="tel:+375 (17) 309-54-56">+375 (17) 309-54-56</a>
    </div>
  )
}

export default Footer;