const ui = (() => {
  function setView(weatherObj) {
    if (!weatherObj) return;

    const cityName = document.querySelector(".city-name");
    const country = document.querySelector(".country");
    const weatherDesc = document.querySelector(".weather-desc");
    const temp = document.querySelector(".temp");
    const feelsLike = document.querySelector(".feels-like");
    const humidity = document.querySelector(".humidity");
    const windSpeed = document.querySelector(".wind-speed");

    cityName.textContent = `${weatherObj.cityName}`;
    country.textContent = `${weatherObj.country}`;
    weatherDesc.textContent = `${weatherObj.weatherDesc}`;
    temp.textContent = `${weatherObj.temp} °C`;
    feelsLike.textContent = `${weatherObj.feelsLike} °C`;
    humidity.textContent = `${weatherObj.humidity}%`;
    windSpeed.textContent = `${weatherObj.windSpeed} km/h`;
  }

  return {
    setView,
  };
})();

export default ui;
