import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import { db } from "../../firebase"

export const Form = () => {

  const [form, setForm] = useState({ firstArea: "", secondArea: "", thirdArea: "" });
  const [startDate, setStartDate] = useState(new Date());
  const [errors, setError] = useState([]);

  const handleAddToJar = (e) => {
    const { name, value } = e.target;
    setForm(prev => {
      return {
        ...prev,
        [name]: value
      }
    })
  };



  const handleSubmit = (e) => {
    e.preventDefault();
    const errorArray = [];
    if (form.firstArea.length > 120 || form.firstArea.length < 2) {
      errorArray.push("pierwsze pole musi zwierac od 2 do 120 znaków");

    }
    if (form.secondArea.length > 120 || form.secondArea.length < 2) {
      errorArray.push("drugie pole musi zawierać od 2 do 120 znaków");

    }
    if (form.thirdArea.length > 120 || form.thirdArea.length < 2) {
      errorArray.push("trzecie pole musi zawierać od 2 do 120 znaków");

    }
    setError(errorArray);

    if (errors.length === 0) {
      db.collection("gratitude").add({
        date: startDate.toLocaleDateString(),
        firtsGratitude: form.firstArea,
        secondGratitude: form.secondArea,
        thirdGratitude: form.thirdArea
      })
        .then((docRef) => {
          console.log("Document written with ID: ", docRef.id);
        })
        .catch((error) => {
          console.error("Error adding document: ", error);
        });
    }
    setForm({ firstArea: "", secondArea: "", thirdArea: "", })
  };


  return (
    <div className="form__container">
      <h1 className="form__title">Za co jesteś dziś wdzięczny?</h1>
      <div className="form__calendar"><p className="calendar__text">wybierz datę:</p><DatePicker selected={startDate} onChange={date => setStartDate(date)} /></div>

      <div className="form__area">
        <div className="form__errors">{errors.length > 0 && errors.map((error, key) => <p key={key} style={{ color: "red" }}>{error}</p>)}</div>
        <form className="form__form" onSubmit={handleSubmit}>

          <div className="form__inputArea">
            <textarea rows="5" className="form__textarea" type="text" placeholder="1.wpisz pierwszą wdzięczność" value={form.firstArea} onChange={handleAddToJar} name="firstArea" />
          </div>
          <div className="form__inputArea">
            <textarea rows="5" className="form__textarea" type="text" placeholder="2.wpisz drugą wdzięczność" value={form.secondArea} onChange={handleAddToJar} name="secondArea" />
          </div>
          <div className="form__inputArea">
            <textarea rows="5" className="form__textarea" type="text" placeholder="3.wpisz trzecią wdzięczność" value={form.thirdtArea} onChange={handleAddToJar} name="thirdArea" />
          </div>
          <button type="submit" className="form__btn">zapisz swoje wdzięczności</button>
        </form>
      </div>
    </div>

  )
}