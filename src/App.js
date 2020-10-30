import React, {useState} from "react";
 import {fetchWeather} from './api/fetchWeather'
 import './App.css';


const App=()=>{

    const [query, setQuery] =useState('');
    const [weather, setWeather] =useState({});
    const search = async (e) =>{
        if(e.key === 'Enter'){
            const data = await fetchWeather(query)
                setWeather(data);
                setQuery('');
        }
    }
 return(
 <div className="main-container" >

<input
type="text"
className = "search"
placeholder ="Search Your City"
value={query}
onChange={(e)=> setQuery(e.target.value)}
onKeyPress={search}

>

</input>

{weather.main && (
    <div className="city">
        <h2 className=" city-name"><span>
            {weather.name}
            <sup className="contry">{weather.sys.country}</sup>
        </span></h2>

        <div className="city-temp">

            {Math.round(weather.main.temp)-273.5}
            <sup>&deg;C</sup> 
                   </div>
                   <div className="info">
                       <img className="city-icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={weather.weather[0].description}></img>
                        <p>{weather.weather[0].description}</p>
                 
                   </div>

    </div>
)}
 </div>
 );

}
export default App;