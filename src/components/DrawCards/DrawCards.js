import React, { useState, useEffect } from 'react';
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

    while (0 !== currentIndex) {

      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }
    return array;
  }


  const [cards, setCards] = useState([]);


  useEffect(() => {
    db.collection("gratitude").orderBy("date", "desc").get()
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
              flipOnHover={false} e
              flipOnClick={true}
              flipDirection="horizontal"
              isFlipped={false}
              style={{ width: "45%", minHeight: "30vh" }}
            >
              <FrontSide className="animate__zoomIn animate__animated drawCards__front" style={{ backgroundColor: "#c7e2ed" }}></FrontSide>
              <BackSide className="drawCards__back"><div onClick={(e) => setFlipped(!flipped)} key={id} className="drawCards__card drawCards__back">
                <h2 className="drawCards__title">{new Date(date.seconds * 1000).toLocaleDateString()}</h2>
                <p className="drawCards__text">{`1. ${firstGratitude}`}</p>
                <p className="drawCards__text">{`2. ${secondGratitude}`}</p>
                <p className="drawCards__text">{`3. ${thirdGratitude}`}</p>
              </div></BackSide>
            </Flippy>

          )
        })}
      </div>
    </div>
  )
}