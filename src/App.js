import { useEffect, useState } from "react";
import "./App.css";

import sunnyDayBg from "./images/sunny-day.jpg";
import cloudyDayBg from "./images/HD-wallpaper-foggy-forest-clouds-dark-fog-nature-thumbnail.jpg";
import WeatherDetails from "./Components/WeatherDetails/WeatherDetails";
import { getCurrentWeather } from "./weatherApi";

function App() {
  const [city, setCity] = useState("new york");
  const [weather, setWeather] = useState(null);
  const [units, setUnits] = useState("metric");
  const [background, setBackground] = useState(sunnyDayBg);

  useEffect(() => {
    const currentWeather = async () => {
      const data = await getCurrentWeather(city, units);
      setWeather(data);

      if (data.description === "clear sky") setBackground(sunnyDayBg);
      else setBackground(cloudyDayBg);
    };

    currentWeather();
  }, [units, city]);

  const unitsClick = (e) => {
    const button = e.currentTarget;
    const currentUnit = button.innerText.slice(1);

    const isCelsius = currentUnit === "C";
    button.innerText = isCelsius ? "°F" : "°C";
    setUnits(isCelsius ? "metric" : "imperial");
  };

  const enterEvent = (e) => {
    if (e.keyCode === 13) {
      setCity(e.currentTarget.value);
      e.currentTarget.blur();
    }
  };

  return (
    <div
      className="weather-app"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="overlay">
        <nav className="navbar">
          <div className="logo">
            <a href="*">WeatherTime</a>
          </div>
          <div className=" search-bar">
            <input
              onKeyDown={enterEvent}
              type="text"
              name="city"
              placeholder="Search city"
            />
            <button onClick={(e) => unitsClick(e)}>°F</button>
          </div>
        </nav>
        {weather && (
          <div className="container">
            <section className="container-temperature">
              <div className="icon">
                <h2>{`${weather.name}, ${weather.country}`}</h2>
                <img src={weather.iconURL} alt="weatherIcon" />
                <p>{weather.description}</p>
              </div>
              <div className="temperature">
                <h1>{`${weather.temp.toFixed()} °${
                  units === "metric" ? "C" : "F"
                }`}</h1>
              </div>
            </section>
            <WeatherDetails weather={weather} units={units} />
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
