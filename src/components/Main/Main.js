import React from 'react';
import ReactDOM from 'react-dom';
import { Image } from "./Image";
import { Navigation } from "./Navigation";

export const Main = () => {


  return (
    <div className="main__container">
      <Image />
      <Navigation />
    </div>
  )
}