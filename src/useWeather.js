import {useState} from 'react'
import axios from "axios";

export const useWeather = () => {
  const [data, setData] = useState({});
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false)


  const Query = async (queryString) =>
  {
    const url = `https://api.openweathermap.org/data/2.5/weather?${queryString}&appid=0ccaf311e9c2b9d0dc75f35ccb924a0b&units=metric`;

    try
    {
      setIsLoading(true)
      const response = await axios.get(url);
      setData(response.data);
      setError("");
    }
    catch (error)
    {
      setError("API returned: " + error.message);
    } 
    finally {
      setIsLoading(false)
    }
  }
 
  return { data, isLoading, setError, error, Query }
}