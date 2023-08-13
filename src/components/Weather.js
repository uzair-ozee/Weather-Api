import React, { useEffect, useState } from 'react'
import WeatherCard from './WeatherCard'
import "./style.css"

const Weather = () => {

    const [weatherVal, setWeatherVal] = useState("karachi")
    const [tempInfo, setTempInfo] = useState({})

    const getWeatherInfo = async () => {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${weatherVal}&units=metric&appid=4b0695e861107bc9b844babdfae3931e`
            const response = await fetch(url);
            const data = await response.json();

            const { temp, humadity, pressure } = data.main;
            const { main: weatherMood } = data.weather[0];
            const { name } = data;
            const { speed } = data.wind;
            const { country, sunset } = data.sys;

            const myNewWeather = {
                temp,
                humadity,
                pressure,
                weatherMood,
                name,
                speed,
                country,
                sunset
            }

            setTempInfo(myNewWeather)

        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getWeatherInfo();
    }, [])


    return (
        <>
            <div className='wrap'>
                <div className="search">
                    <input type="search"
                        placeholder='search..'
                        autoFocus
                        id='search'
                        className='searchTerm'
                        value={weatherVal}
                        onChange={(e) => setWeatherVal(e.target.value)}
                    />
                    <button className="searchButton" type='button' onClick={getWeatherInfo}>Search</button>
                </div>
            </div>

           <WeatherCard tempInfo={tempInfo}/>
        </>
    )
}

export default Weather