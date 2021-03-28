import React, { useRef } from "react";
import "./Tags.css";

export const Tags = () => {
  const alpha = {
    A: useRef(null),
    B: useRef(null),
    C: useRef(null),
    D: useRef(null),
    E: useRef(null),
    F: useRef(null),
    G: useRef(null),
    H: useRef(null),
    I: useRef(null),
    J: useRef(null),
    K: useRef(null),
    L: useRef(null),
    M: useRef(null),
    N: useRef(null),
    O: useRef(null),
    P: useRef(null),
    Q: useRef(null),
    R: useRef(null),
    S: useRef(null),
    T: useRef(null),
    U: useRef(null),
    V: useRef(null),
    W: useRef(null),
    X: useRef(null),
    Y: useRef(null),
    Z: useRef(null),
  };

  const handlePan = (e) => {
    const X = e.touches && e.touches.length ? e.touches[0].clientX : e.clientX;
    const Y = e.touches && e.touches.length ? e.touches[0].clientY : e.clientY;
    const realTarget = document.elementFromPoint(X, Y);
    const letter = realTarget.innerHTML.toString();

    if (alpha[letter] !== undefined && alpha[letter].current !== null) {
      alpha[letter].current.scrollIntoView();
    }
  };

  return (
    <>
      <div className="wrapper">
        <div className="container js-abc">
          <div style={{ touchAction: "none" }}>
            <ul onTouchMove={handlePan} className="abc js-abc-nav">
              <li>A</li>
              <li>B</li>
              <li>C</li>
              <li>D</li>
              <li>E</li>
              <li>F</li>
              <li>G</li>
              <li>H</li>
              <li>I</li>
              <li>J</li>
              <li>K</li>
              <li>L</li>
              <li>M</li>
              <li>N</li>
              <li>O</li>
              <li>P</li>
              <li>Q</li>
              <li>R</li>
              <li>S</li>
              <li>T</li>
              <li>U</li>
              <li>V</li>
              <li>W</li>
              <li>X</li>
              <li>Y</li>
              <li>Z</li>
            </ul>
          </div>

          <div className="content js-abc-content">
            <div className="text" ref={alpha["A"]}>
              A
            </div>
            <ul className="list">
              <li>ABC</li>
              <li>ABC</li>
              <li>ABC</li>
              <li>ABC</li>
              <li>ABC</li>
              <li>ABC</li>
              <li>ABC</li>
            </ul>

            <div className="text" ref={alpha["B"]}>
              B
            </div>
            <ul className="list">
              <li>BCD</li>
              <li>BCD</li>
              <li>BCD</li>
              <li>BCD</li>
              <li>BCD</li>
              <li>BCD</li>
            </ul>

            <div className="text" ref={alpha["C"]}>
              C
            </div>
            <ul className="list">
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
              <li>CDE</li>
            </ul>

            <div className="text" ref={alpha["D"]}>
              D
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["E"]}>
              E
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["F"]}>
              F
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["H"]}>
              H
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["G"]}>
              G
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["J"]}>
              J
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>

            <div className="text" ref={alpha["U"]}>
              U
            </div>
            <ul className="list">
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
              <li>DEF</li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};
