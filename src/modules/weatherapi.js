const weather = (() => {
  const APIKEY = "47453bd2679134f260cba8e1ec64cb70";
  const tempUnit = "metric";

  async function getGeoLocation(citySearch) {
    const endpoint = `http://api.openweathermap.org/geo/1.0/direct?q=${citySearch}&limit=1&appid=${APIKEY}`;

    try {
      const response = await fetch(endpoint, { mode: "cors" });
      if (!response.ok) throw new Error("City not found");
      const locationData = await response.json();
      return {
        cityName: locationData[0].name,
        lat: locationData[0].lat,
        lon: locationData[0].lon,
      };
    } catch (error) {
      return null;
    }
  }

  async function getWeatherData(city) {
    try {
      const location = await getGeoLocation(city);
      if (!location) throw new Error("Could not find location");
      const { lat, lon } = location;
      const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${APIKEY}&units=${tempUnit}`;
      const response = await fetch(endpoint, { mode: "cors" });
      const weatherData = await response.json();
      return {
        cityName: location.cityName,
        country: weatherData.sys.country,
        weatherDesc: weatherData.weather[0].description,
        temp: weatherData.main.temp,
        feelsLike: weatherData.main.feels_like,
        humidity: weatherData.main.humidity,
        windSpeed: weatherData.wind.speed,
      };
    } catch (error) {
      alert(error);
      return null;
    }
  }

  return {
    getWeatherData,
  };
})();

export default weather;
