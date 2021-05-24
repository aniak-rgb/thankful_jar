import React from 'react';
import ReactDOM from 'react-dom';
import { MyCards } from "../MyCards/MyCards"

export const DrawCards = () => {


  return (
    <div className="draw__container">
      <h1 className="draw__title">Wybierz kartę</h1>
      <div className="draw__cards"></div>
    </div>
  )
}