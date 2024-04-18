// WeatherCard.js
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTint, faWind } from '@fortawesome/free-solid-svg-icons';

const WeatherCard = ({ weatherData }) => {
    const { location, current } = weatherData;
    return (
        <div className="p-4 bg-gray-100 rounded-md shadow-md">
            <h2 className="text-xl font-bold">Current Weather in {location.name}</h2>
            <p className="text-lg"><FontAwesomeIcon icon={faThermometerHalf} /> Temperature: {current.temp_c}°C</p>
            <p className="text-lg"><FontAwesomeIcon icon={faTint} /> Humidity: {current.humidity}%</p>
            <p className="text-lg"><FontAwesomeIcon icon={faWind} /> Wind Speed: {current.wind_kph} km/h</p>
            {/* Add more weather information here with appropriate icons */}
        </div>
    );
};

export default WeatherCard;
