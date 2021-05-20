import React from 'react';
import {
  Link,
} from 'react-router-dom';

export const Navigation = () => {

  return (
    <nav className="main__nav">
      <ul className="main__items">
        <li className="main__item"><Link to='/form' className="main__link">Dodaj wdzięczność</Link></li>
        <li className="main__item"><Link to="/myCarts" className="main__link">Moje karty</Link></li>
        <li className="main__item"><Link to="drawCarts" className="main__link">Losuj kartę</Link></li>
      </ul>
    </nav>
  )
}