import React, { useState, useEffect } from 'react';
import { db } from "../../firebase";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { faEdit } from '@fortawesome/free-solid-svg-icons'

import { faArrowAltCircleLeft } from '@fortawesome/free-solid-svg-icons';
import {
  Link,
} from 'react-router-dom';




export const MyCards = () => {
  const [cards, setCards] = useState([]);
  const [edit, setEdit] = useState(false);
  const [editFirst, setEditFirst] = useState("");
  const [editSecond, setEditSecond] = useState("");
  const [editThird, setEditThird] = useState("");
  const [errors, setErrors] = useState([]);
  const [success, setSuccess] = useState("")

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
  }, [edit]);


  const handleDelete = (id) => {


    db.collection("gratitude").doc(id).delete().then(() => {
      const deleteCard = cards.filter(card => card.id !== id)
      setCards(deleteCard);
    }).catch((error) => {
      console.error("Error removing document: ", error);
    });

  }


  const handleEdit = (id, firstGratitude, secondGratitude, thirdGratitude) => {
    setEdit(id);
    setEditFirst(firstGratitude);
    setEditSecond(secondGratitude);
    setEditThird(thirdGratitude);
  }

  const handleUpdate = (e) => {
    e.preventDefault()
    const errorArray = [];
    if (editFirst.length > 120 || editFirst.length < 2) {
      errorArray.push("pierwsze pole musi zwierac od 2 do 120 znaków!");

    }
    if (editSecond.length > 120 || editSecond.length < 2) {
      errorArray.push("drugie pole musi zawierać od 2 do 120 znaków!");

    }
    if (editThird.length > 120 || editThird.length < 2) {
      errorArray.push("trzecie pole musi zawierać od 2 do 120 znaków!");

    }
    setErrors(errorArray);


    if (errorArray.length === 0) {
      db.collection("gratitude").doc(edit).update({

        firstGratitude: editFirst,
        secondGratitude: editSecond,
        thirdGratitude: editThird,
      })
        .then((docRef) => {
          setEdit(false)




        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });


    }
  }

  const handleBack = () => {
    setEdit(false)
  }




  return (
    <>
      <div className="myCards__container">
        <Link to="/"><FontAwesomeIcon icon={faArrowAltCircleLeft} className="back__arrow" /></Link>
        <h1 className="myCards__title">Moje wdzięczności</h1>
        <div className="myCrads__area">
          {cards.map(({ date, firstGratitude, secondGratitude, thirdGratitude, id }) => {
            return (
              <div key={id} className="myCards__card animate__zoomIn animate__animated">
                <h2>{date}</h2>
                <p>{`1. ${firstGratitude}`}</p>
                <p>{`2. ${secondGratitude}`}</p>
                <p>{`3. ${thirdGratitude}`}</p>
                <div className="myCards__edit">
                  <button onClick={() => handleDelete(id)} className="myCards__btn" ><FontAwesomeIcon icon={faTrashAlt} /></button>
                  <button onClick={() => handleEdit(id, firstGratitude, secondGratitude, thirdGratitude)} className="myCards__btn"><FontAwesomeIcon icon={faEdit} /></button>
                </div>
              </div>
            )

          })}
        </div>
      </div>
      {
        edit && (
          <div className="edit__container">
            {errors.length > 0 && <div className="edit__error" style={{ background: "red" }}>{errors.map(error => <p>{error}</p>)}</div>}
            <form className="edit__form" onSubmit={handleUpdate}>
              <h2 className="edit__title">edytuj pola</h2>
              <textarea className="edit__textarea" type="text" value={editFirst} onChange={e => setEditFirst(e.target.value)} />
              <textarea className="edit__textarea" type="text" value={editSecond} onChange={e => setEditSecond(e.target.value)} />
              <textarea className="edit__textarea" type="text" value={editThird} onChange={e => setEditThird(e.target.value)} />
              <div className="edit__btnArea">
                <button className="edit__back-btn edit__btn" onClick={handleBack}>cofnij</button>
                <button className="edit__btn" type="submit">zapisz</button>
              </div>

            </form>
          </div>)
      }
    </>
  )

}