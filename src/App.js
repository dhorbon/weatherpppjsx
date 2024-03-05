import React, { useState } from "react";
import './App.css';
import axios from "axios";

function App() {
  const [input, setInput] = useState("");
  const [data, setData] = useState({});
  const [error, setError] = useState(null);

  const Query = async (queryString) =>
  {
    const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}&appid=0ccaf311e9c2b9d0dc75f35ccb924a0b&units=metric`;

    try
    {
      const response = await axios.get(url);
      setData(response.data);
      setError("");
    }
    catch (error)
    {
      setError("API returned: " + error.message);
    }
  }

  const inputPress = async (event) =>
  {
    if (event.key === "Enter")
    {
      Query("q="+input);
    }
    setInput("");
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
        {error && <p className="text-red-800 self-center">{error}</p>}
        {data.name && (
          <div className="self-center">
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
  );
}

export default App;
