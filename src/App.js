import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import { hidden } from "chalk";

function App() {
  const [percent, setPercent] = useState(0);
  const [fname, setFname] = useState("");
  const [sname, setSname] = useState("");
  const [des, setDes] = useState("");

  function onFnameChange(e) {
    setFname(e.target.value);
  }
  function onSnameChange(e) {
    setSname(e.target.value);
  }
  function onCloseModal() {
    setPercent(0);
  }

  function loveCal() {
    if (!fname || !sname) return;
    fetch(
      `https://love-calculator.p.rapidapi.com/getPercentage?fname=${fname}&sname=${sname}`,
      {
        method: "GET",
        headers: {
          "x-rapidapi-key":
            "fcdd82257fmsh1a387dcc188a102p101fd3jsn8212af17f7f2",
          "x-rapidapi-host": "love-calculator.p.rapidapi.com",
        },
      }
    )
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(data);
        setPercent(data.percentage);
        setDes(data.result);
      })
      .catch((err) => {
        console.error(err);
      });
  }
  return (
    <div>
      <div class="container">
        <div class="main">
          <h1>Love Calculator</h1>
          <img
            src="/image/l.png"
            alt="Love potion Disproportionate Illustrations
            "
            class="love-potion"
          />
        </div>
        <div class="input" id="myForm">
          <div class="line" />
          <label for="#name1">Your Name</label>
          <input
            type="text"
            id="name1"
            value={fname}
            required
            onChange={onFnameChange}
          />
          <label for="#name1">Your Crush</label>
          <input
            type="text"
            id="name2"
            value={sname}
            required
            onChange={onSnameChange}
          />
          <button type="submit" id="submit" onClick={loveCal}>
            Submit
          </button>
        </div>
      </div>
      <div class={`modal ${!percent ? "hidden" : ""}`}>
        <button
          class={`close-modal ${!percent ? "hidden" : ""}`}
          onClick={onCloseModal}
        >
          &times;
        </button>
        <p>
          ❤ <span class="percent">{percent}</span>% MATCH!!
        </p>
        <p>{des}</p>
      </div>
      <div
        class={`overlay ${!percent ? "hidden" : ""}`}
        onClick={onCloseModal}
      ></div>
    </div>
  );
}

export default App;
