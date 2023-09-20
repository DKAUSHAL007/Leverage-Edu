import React, { useState, useEffect } from "react";
import "./index.css"; // Import your CSS file
import { evaluate } from 'mathjs';

const Calculator = () => {
  const [input, setInput] = useState("");
  const [result, setResult] = useState("");
  const [isScientific, setIsScientific] = useState(false);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyboardInput);
    return () => {
      document.removeEventListener("keydown", handleKeyboardInput);
    };
  }, []);

  const handleKeyboardInput = (e) => {
    const key = e.key;
    if (/[0-9]/.test(key)) {
      handleInput(key);
    } else if (key === "+" || key === "-" || key === "*" || key === "/") {
      handleInput(key);
    } else if (key === "Enter") {
      calculate();
    } else if (key === "c" || key === "C") {
      clearInput();
    } else if (isScientific && (key === "s" || key === "S")) {
      toggleScientific();
    } else if (key === "(") {
      handleInput("(");
    } else if (key === ")") {
      handleInput(")");
    }
  };

  const handleInput = (value) => {
    setInput(input + value);
  };

  const clearInput = () => {
    setInput("");
    setResult("");
  };
  const calculate = () => {
    try {
      const result = evaluate(input);
      setResult(result);
    } catch (error) {
      setResult("Error");
    }
  };
  

  const toggleScientific = () => {
    setIsScientific(!isScientific);
  };

  // Function to handle scientific functions when in scientific mode
  const handleScientificFunction = (func) => {
    if (isScientific) {
      setInput(input + func + "(");
    }
  };

  return (
    <div className="calculator">
      <center id="center">
        <h1>Calculator</h1>
        {!isScientific ? (
          <button onClick={toggleScientific} className="toggle-button">
            Scientific
          </button>
        ) : (
          <button onClick={toggleScientific} className="toggle-button">
            Regular
          </button>
        )}
      </center>
      <input type="text" className="text-box" value={input} readOnly />
      <div className="buttons">
        <button onClick={() => handleInput("1")}>1</button>
        <button onClick={() => handleInput("2")}>2</button>
        <button onClick={() => handleInput("3")}>3</button>
        <button onClick={() => handleInput("4")}>4</button>
        <button onClick={() => handleInput("5")}>5</button>
        <button onClick={() => handleInput("6")}>6</button>
        <button onClick={() => handleInput("7")}>7</button>
        <button onClick={() => handleInput("8")}>8</button>
        <button onClick={() => handleInput("9")}>9</button>
        <button onClick={() => handleInput("0")}>0</button>
        <button onClick={() => handleInput("+")}>+</button>
        <button onClick={() => handleInput("-")}>-</button>
        <button onClick={() => handleInput("*")}>*</button>
        <button onClick={() => handleInput("/")}>/</button>
        <button onClick={() => handleInput("(")}>(</button>{" "}
        {/* Add button for opening parenthesis */}
        <button onClick={() => handleInput(")")}>)</button>{" "}
        {/* Add button for closing parenthesis */}
        {isScientific && (
          <>
            <button onClick={() => handleScientificFunction("Math.sin")}>
              sin
            </button>
            <button onClick={() => handleScientificFunction("Math.cos")}>
              cos
            </button>
            <button onClick={() => handleScientificFunction("Math.tan")}>
              tan
            </button>
            <button onClick={() => handleScientificFunction("Math.sqrt")}>
              sqrt
            </button>
          </>
        )}
        <button onClick={clearInput}>C</button>
        {/* Shift equal button to the last and make it span multiple columns */}
        <button
          onClick={calculate}
          style={{ gridColumn: "span 2" }}
          className="equal-button">
          =
        </button>
      </div>
      <div className="result">OUTPUT = {result}</div>
    </div>
  );
};

export default Calculator;
