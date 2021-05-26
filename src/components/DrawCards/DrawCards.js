import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';

import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Link,
} from 'react-router-dom';
import Flipcard from "@kennethormandy/react-flipcard";
import "@kennethormandy/react-flipcard/dist/Flipcard.css";
import Flippy, { FrontSide, BackSide } from "react-flippy";

export const DrawCards = () => {
  const [flipped, setFlipped] = useState(false);


  function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;
    // While there remain elements to shuffle...
    while (0 !== currentIndex) {
      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      // And swap it with the current element.
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  const [cards, setCards] = useState([]);


  useEffect(() => {
    db.collection("gratitude").get()
      .then((querySnapshot) => {
        const allGratitudes = [];
        querySnapshot.forEach((doc) => {
          allGratitudes.push({
            ...doc.data(),
            id: doc.id,
          });
        });
        setCards(shuffle(allGratitudes))
      });
  }, []);


  return (
    <div className="draw__container">
      <Link to="/"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="back__arrow" /></Link>
      <h1 className="draw__title">Wybierz kartę</h1>
      <div className="draw__cards">
        {cards.map(({ date, firstGratitude, secondGratitude, thirdGratitude, id }) => {
          return (
            <Flippy
              flipOnHover={false} // default false
              flipOnClick={true} // default false
              flipDirection="horizontal" // horizontal or vertical
              isFlipped={false}
              style={{ width: "150px", height: "200px" }} /// these are optional style, it is not necessary
            >
              <FrontSide className="animate__zoomIn animate__animated" style={{ backgroundColor: "#c7e2ed" }}></FrontSide>
              <BackSide ><div onClick={(e) => setFlipped(!flipped)} key={id} className="myCards__card myCards__back">
                <h2>{date}</h2>
                <p>{`1:${firstGratitude}`}</p>
                <p>{`2:${secondGratitude}`}</p>
                <p>{`3:${thirdGratitude}`}</p>
              </div></BackSide>
            </Flippy>

          )
        })}
      </div>
    </div>
  )
}