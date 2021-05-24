import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'


export const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [edit, setEdit] = useState(false);
  const [inputs, setInputs] = useState("")

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


  const handleDelete = (id) => {


    db.collection("gratitude").doc(id).delete().then(() => {
      const deleteCard = cards.filter(card => card.id !== id)
      setCards(deleteCard);
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }


  const handleEdit = (id) => {
    setEdit(id)


  }

  const handleUpdate = (e) => {
    e.preventDefault()
    console.log(edit)
  }




  return (
    <>
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
                  <button onClick={() => handleDelete(id)} className="myCards__btn" ><FontAwesomeIcon icon={faTrashAlt} /></button>
                  <button onClick={() => handleEdit(id)} className="myCards__btn"><FontAwesomeIcon icon={faEdit} /></button>
                </div>
              </div>
            )

          })}
        </div>
      </div>
      {
        edit && (<div className="edit__container">
          <form className="edit__form" onSubmit={handleUpdate}>
            <input className="edit__input" type="text" />
            <input className="edit__input" type="text" />
            <input className="edit__input" type="text" />
            <button className="edit__back-btn edit__btn">cofnij</button>
            <button className="edit__btn" type="submit">zapisz</button>
          </form>
        </div>)
      }
    </>
  )

}