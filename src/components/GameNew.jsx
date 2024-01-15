// src/App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "./GameNew.css";

import CityBackground from "./CityBackground";

const GameNew = () => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCapital, setSelectedCapital] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [points, setPoints] = useState(0);

  const apiKey = "8577528e07e7203b1d79aac1d882be19";

  useEffect(() => {
    // Fetch the list of European countries from the restcountries API
    const fetchCountries = async () => {
      try {
        const response = await axios.get(
          "https://restcountries.com/v3.1/region/europe"
        );
        setCountries(response.data);
      } catch (error) {
        console.error("Error fetching countries:", error);
      }
    };

    fetchCountries();
  }, []);

  const handleCountryChange = async (event) => {
    const newCountryCode = event.target.value;
    const selectedCapital = countries[newCountryCode].capital.toString();
    setSelectedCapital(selectedCapital);

    // Check if the selected country is the same as the previous one
    if (newCountryCode === selectedCountry) {
      alert("You cannot select the same country twice!");
      return;
    }

    try {
      // Fetch the temperature of the capital city from OpenWeatherMap API
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${countries[newCountryCode].capital}&units=metric&appid=${apiKey}`
      );

      const newTemperature = response.data.main.temp;
      setTemperature(Math.trunc(newTemperature));

      // Compare temperatures and update points
      if (temperature === null || newTemperature > temperature) {
        setPoints((prevPoints) => prevPoints + 100);
      } else {
        alert("Game over! You got a colder country.");
        setPoints(0);
      }

      // Update the selected country
      setSelectedCountry(newCountryCode);
    } catch (error) {
      console.error("Error fetching temperature:", error);
    }
  };


  return (
    <>
      <div className="main-container">
        <div className="background">
          <CityBackground cityName={selectedCapital} />
        </div>
        <div className="container">
          <div className="wrapper">
            <h2 className="title">Countries Capital Temperature Game</h2>
            <div className="capital">
              <p>🌎 Capital</p>
              <h3>{selectedCapital}</h3>
            </div>
            <div className="temperature">
              <p>🌡️ Current Temperature</p>
              <div>{temperature !== null && <h3>{temperature}°C</h3>}</div>
            </div>
            <p className="rule">
              🔰 <span>RULE :</span> If it's warmer, you get 100 points, otherwise the game
              is over!
            </p>
            <div className="select">
              <p>📌 Select a Country</p>
              <div className="custom-select">
                <select
                  onChange={handleCountryChange}
                  value={selectedCountry || ""}
                >
                  <option value="" disabled>
                    What's your choice?
                  </option>
                  {countries.map((country, index) => (
                    <option key={index} value={index}>
                      {country.name.common}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="points">
              <p>💯 Your Points</p>
              <h2>{points}</h2>
            </div>
          </div>
        </div>
        <div className="footer">
          <p>
            © All rights reserved by Mojtaba Mohseni | 📧 dev.mohseni@gmail.com
          </p>
        </div>
      </div>
    </>
  );
};

export default GameNew;
