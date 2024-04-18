import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faThermometerHalf, faTint, faWind, faSun } from '@fortawesome/free-solid-svg-icons';

const API_KEY = 'b0fb4fb0a8f44532b1a201548241804'; // Replace with your actual API key

const Forecast = ({ location }) => {
    const [forecastData, setForecastData] = useState(null);
    const [selectedDate, setSelectedDate] = useState(null);
    const [showForecast, setShowForecast] = useState(false);

    useEffect(() => {
        const fetchForecastData = async () => {
            try {
                const response = await axios.get(`http://api.weatherapi.com/v1/forecast.json?key=${API_KEY}&q=${location.name}&days=3`);
                setForecastData(response.data);
            } catch (error) {
                console.error('Error fetching forecast data:', error);
            }
        };

        fetchForecastData();
    }, [location]);

    const selectDate = (date) => {
        setSelectedDate(date);
    };

    const toggleForecast = () => {
        setShowForecast(!showForecast);
    };

    return (
        <div className="mt-4">
            <h2 className="text-xl font-bold">3-Day Forecast for {location.name}</h2>
            <button className="text-lg font-semibold mb-2 focus:outline-none" onClick={toggleForecast}>
                {showForecast ? "Hide Forecast" : "Show Forecast"}
            </button>
            {showForecast && (
                <div className="p-4 bg-gray-100 rounded-md shadow-md">
                    {forecastData ? (
                        <div className="mt-2 space-y-4">
                            {forecastData.forecast.forecastday.map((day, index) => (
                                <div key={day.date} className={`p-2 bg-white rounded-md shadow-sm ${selectedDate === day.date ? 'bg-blue-200' : 'cursor-pointer'}`} onClick={() => selectDate(day.date)}>
                                    <button
                                        className="text-lg font-semibold focus:outline-none"
                                    >
                                        {day.date}
                                    </button>
                                    {selectedDate === day.date && (
                                        <div className="mt-2">
                                            <p className="text-lg">Weather: <FontAwesomeIcon icon={faSun} /> {day.day.condition.text}</p>
                                            <p className="text-lg">Max Temp: <FontAwesomeIcon icon={faThermometerHalf} /> {day.day.maxtemp_c}°C</p>
                                            <p className="text-lg">Min Temp: <FontAwesomeIcon icon={faThermometerHalf} /> {day.day.mintemp_c}°C</p>
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>Loading forecast data...</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default Forecast;
