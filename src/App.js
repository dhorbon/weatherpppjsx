import React, { useState } from "react";
import './App.css';
import { useWeather } from "./useWeather";

function App() {
  const [input, setInput] = useState("");
  const { Query, data, error, isLoading, setError } = useWeather()

  const inputPress = async (event) =>
  {
    if (event.key === "Enter")
    {
      Query("q="+input);
      setInput("");
    }
    
  };

  const geoloc = async () =>
  {
    console.log("autodetect start\n");
    navigator.geolocation.getCurrentPosition(sucsess, faliure);
  }

  const faliure = (err) =>
  {
    console.log("autodetect faliure\n");
    setError("can't detect Your location");
  } 

  const sucsess = async (pos) =>
  {
    console.log("autodetect sucsess\n");
    let cords = "lat=" + pos.coords.latitude + "&lon=" + pos.coords.longitude;
    Query(cords);
  }

  return (
    <div className="h-dvh w-dvw bg-blue-950 pt-12">
      <div className="h-3/4 w-3/4 m-auto flex align-middle flex-col bg-blue-500 rounded-3xl">
        <h1 className="self-center text-5xl text-slate-300 m-4">Weather</h1>
        <input
          className="w-1/4 self-center"
          onChange={(event) => setInput(event.target.value)}
          onKeyPress={inputPress}
          placeholder="Input a location"
          value={input}
        />
        <button
          className="m-2 bg-slate-200 w-fit p-1 rounded-lg border-black border-2 self-center"
          onClick={geoloc}
        >Auto detect Your location</button>
        <div className="self-center">
        {isLoading && <p>loading...🐇</p>}
        {error && <p className="text-red-800 self-center">{error}</p>}
        {data.name && (
            <div>

            <img
            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}.png`}
            alt={data.weather[0].description}
            />
            <h2>{data.name}</h2>
            <p>Temperature: {(data.main.temp)}°C</p>
            <p>Humidity: {data.main.humidity}%</p>
            <p>Pressure: {data.main.pressure} hPa</p>
            <p>Wind: {data.wind.speed} m/s</p>
            </div>
            )}
            </div>
      </div>
    </div>
  );
}

export default App;
