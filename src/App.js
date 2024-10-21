import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [weight, setWeight] = useState("");
  const [feet, setFeet] = useState("");
  const [inches, setInches] = useState("");
  const [result, setResult] = useState("");

  // Function to calculate BMI
  const calculateBMI = () => {
    const weightNum = parseFloat(weight);
    const heightFeetNum = parseFloat(feet);
    const heightInchesNum = parseFloat(inches);

    if (!weightNum || !heightFeetNum || heightInchesNum === null) {
      setResult("Please fill out all fields.");
      return;
    }

    // Convert height to meters
    const totalHeightInInches = heightFeetNum * 12 + heightInchesNum;
    const heightInMeters = totalHeightInInches * 0.0254;

    // Calculate BMI
    const bmi = weightNum / (heightInMeters * heightInMeters);

    // Determine BMI category
    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else if (bmi >= 30 && bmi < 34.9) {
      category = "Obesity Class I";
    } else if (bmi >= 35 && bmi < 39.9) {
      category = "Obesity Class II";
    } else {
      category = "Obesity Class III";
    }

    const resultText = `Your BMI is ${bmi.toFixed(
      2
    )}. You are classified as: ${category}.`;
    setResult(resultText);
    localStorage.setItem("bmiResult", resultText);
  };

  // Load the stored BMI result on page load
  useEffect(() => {
    const storedResult = localStorage.getItem("bmiResult");
    if (storedResult) {
      setResult(storedResult);
    }
  }, []);

  return (
    <div className="App">
      <h2 className="text-center text-white my-5">BMI Calculator</h2>

      <div className="d-flex justify-content-center">
        <div className="form-container">
          <form className="col-sm">
            <div className="mb-4 position-relative">
              <input
                type="number"
                className="form-control"
                id="weight"
                placeholder=" "
                min="1"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
              <label htmlFor="weight" className="form-label">
                Enter Your Weight in kg
              </label>
            </div>
            <div className="mb-4 position-relative">
              <input
                type="number"
                className="form-control"
                id="feet"
                placeholder=" "
                min="1"
                value={feet}
                onChange={(e) => setFeet(e.target.value)}
                required
              />
              <label htmlFor="feet" className="form-label">
                Enter Your Height in feet
              </label>
            </div>
            <div className="mb-4 position-relative">
              <input
                type="number"
                className="form-control"
                id="inch"
                placeholder=" "
                min="0"
                value={inches}
                onChange={(e) => setInches(e.target.value)}
                required
              />
              <label htmlFor="inch" className="form-label">
                Enter Your Height in inches (remaining)
              </label>
            </div>
            <div className="d-flex justify-content-center">
              <button
                type="button"
                className="btn btn-secondary grad-button w-100"
                onClick={calculateBMI}
              >
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>

      <h2 className="text-center text-white my-5" id="result">
        {result}
      </h2>
    </div>
  );
}

export default App;
