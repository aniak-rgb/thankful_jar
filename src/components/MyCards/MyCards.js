import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export const MyCards = () => {
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
        setCards(allGratitudes)
      });
  }, []);

  return (
    <div className="myCards__container">
      <h1 className="myCards__title">Moje wdzięczności</h1>
      <div className="myCrads__area">
        {cards.map(({ date, firstGratitude, secondGratitude, thirdGratitude, id }) => {
          return (
            <div key={id} className="myCards__card">
              <h2>{date}</h2>
              <p>{`1:${firstGratitude}`}</p>
              <p>{`2:${secondGratitude}`}</p>
              <p>{`3:${thirdGratitude}`}</p>
              <div className="myCards__edit">
                <button className="myCards__btn"><FontAwesomeIcon icon={faTrashAlt} /></button>
                <button className="myCards__btn"><FontAwesomeIcon icon={faEdit} /></button>
              </div>
            </div>
          )

        })}
      </div>
    </div>
  )
}