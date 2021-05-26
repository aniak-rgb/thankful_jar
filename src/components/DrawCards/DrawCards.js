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
            <Flipcard flipped={flipped}>
              <div className="animate__animated animate__zoomIn myCards__card myCards__front " onClick={(e) => setFlipped(!flipped)}>
                {/* Ostylować przód */}
            Przód
          </div>
              <div onClick={(e) => setFlipped(!flipped)} key={id} className="myCards__card myCards__back">
                <h2>{date}</h2>
                <p>{`1:${firstGratitude}`}</p>
                <p>{`2:${secondGratitude}`}</p>
                <p>{`3:${thirdGratitude}`}</p>
              </div>
            </Flipcard>
          )
        })}
      </div>
    </div>
  )
}