/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/modules/ui.js":
/*!***************************!*\
  !*** ./src/modules/ui.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ui);


/***/ }),

/***/ "./src/modules/weatherapi.js":
/*!***********************************!*\
  !*** ./src/modules/weatherapi.js ***!
  \***********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (weather);


/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_weatherapi__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/weatherapi */ "./src/modules/weatherapi.js");
/* harmony import */ var _modules_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/ui */ "./src/modules/ui.js");



const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  if (searchBar.value === "") return;
  const data = await _modules_weatherapi__WEBPACK_IMPORTED_MODULE_0__["default"].getWeatherData(searchBar.value);
  _modules_ui__WEBPACK_IMPORTED_MODULE_1__["default"].setView(data);
});

})();

/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUFBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSw4QkFBOEIsb0JBQW9CO0FBQ2xELDZCQUE2QixtQkFBbUI7QUFDaEQsaUNBQWlDLHVCQUF1QjtBQUN4RCwwQkFBMEIsaUJBQWlCO0FBQzNDLCtCQUErQixzQkFBc0I7QUFDckQsOEJBQThCLG9CQUFvQjtBQUNsRCwrQkFBK0Isc0JBQXNCO0FBQ3JEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLENBQUM7O0FBRUQsaUVBQWUsRUFBRSxFQUFDOzs7Ozs7Ozs7Ozs7Ozs7QUMxQmxCO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHVFQUF1RSxXQUFXLGlCQUFpQixPQUFPOztBQUUxRztBQUNBLCtDQUErQyxjQUFjO0FBQzdEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBTTtBQUNOO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWMsV0FBVztBQUN6Qiw4RUFBOEUsSUFBSSxPQUFPLElBQUksU0FBUyxPQUFPLFNBQVMsU0FBUztBQUMvSCwrQ0FBK0MsY0FBYztBQUM3RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQU07QUFDTjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxDQUFDOztBQUVELGlFQUFlLE9BQU8sRUFBQzs7Ozs7OztVQ2pEdkI7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTs7VUFFQTtVQUNBOztVQUVBO1VBQ0E7VUFDQTs7Ozs7V0N0QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7Ozs7Ozs7Ozs7QUNOMkM7QUFDYjs7QUFFOUI7QUFDQTs7QUFFQTtBQUNBO0FBQ0EscUJBQXFCLDBFQUFzQjtBQUMzQyxFQUFFLDJEQUFVO0FBQ1osQ0FBQyIsInNvdXJjZXMiOlsid2VicGFjazovL3dlYXRoZXItYXBwLy4vc3JjL21vZHVsZXMvdWkuanMiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvbW9kdWxlcy93ZWF0aGVyYXBpLmpzIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9kZWZpbmUgcHJvcGVydHkgZ2V0dGVycyIsIndlYnBhY2s6Ly93ZWF0aGVyLWFwcC93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL3dlYXRoZXItYXBwL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vd2VhdGhlci1hcHAvLi9zcmMvaW5kZXguanMiXSwic291cmNlc0NvbnRlbnQiOlsiY29uc3QgdWkgPSAoKCkgPT4ge1xuICBmdW5jdGlvbiBzZXRWaWV3KHdlYXRoZXJPYmopIHtcbiAgICBpZiAoIXdlYXRoZXJPYmopIHJldHVybjtcblxuICAgIGNvbnN0IGNpdHlOYW1lID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jaXR5LW5hbWVcIik7XG4gICAgY29uc3QgY291bnRyeSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuY291bnRyeVwiKTtcbiAgICBjb25zdCB3ZWF0aGVyRGVzYyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIud2VhdGhlci1kZXNjXCIpO1xuICAgIGNvbnN0IHRlbXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnRlbXBcIik7XG4gICAgY29uc3QgZmVlbHNMaWtlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mZWVscy1saWtlXCIpO1xuICAgIGNvbnN0IGh1bWlkaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5odW1pZGl0eVwiKTtcbiAgICBjb25zdCB3aW5kU3BlZWQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLndpbmQtc3BlZWRcIik7XG5cbiAgICBjaXR5TmFtZS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJPYmouY2l0eU5hbWV9YDtcbiAgICBjb3VudHJ5LnRleHRDb250ZW50ID0gYCR7d2VhdGhlck9iai5jb3VudHJ5fWA7XG4gICAgd2VhdGhlckRlc2MudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyT2JqLndlYXRoZXJEZXNjfWA7XG4gICAgdGVtcC50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJPYmoudGVtcH0gwrBDYDtcbiAgICBmZWVsc0xpa2UudGV4dENvbnRlbnQgPSBgJHt3ZWF0aGVyT2JqLmZlZWxzTGlrZX0gwrBDYDtcbiAgICBodW1pZGl0eS50ZXh0Q29udGVudCA9IGAke3dlYXRoZXJPYmouaHVtaWRpdHl9JWA7XG4gICAgd2luZFNwZWVkLnRleHRDb250ZW50ID0gYCR7d2VhdGhlck9iai53aW5kU3BlZWR9IGttL2hgO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBzZXRWaWV3LFxuICB9O1xufSkoKTtcblxuZXhwb3J0IGRlZmF1bHQgdWk7XG4iLCJjb25zdCB3ZWF0aGVyID0gKCgpID0+IHtcbiAgY29uc3QgQVBJS0VZID0gXCI0NzQ1M2JkMjY3OTEzNGYyNjBjYmE4ZTFlYzY0Y2I3MFwiO1xuICBjb25zdCB0ZW1wVW5pdCA9IFwibWV0cmljXCI7XG5cbiAgYXN5bmMgZnVuY3Rpb24gZ2V0R2VvTG9jYXRpb24oY2l0eVNlYXJjaCkge1xuICAgIGNvbnN0IGVuZHBvaW50ID0gYGh0dHA6Ly9hcGkub3BlbndlYXRoZXJtYXAub3JnL2dlby8xLjAvZGlyZWN0P3E9JHtjaXR5U2VhcmNofSZsaW1pdD0xJmFwcGlkPSR7QVBJS0VZfWA7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChlbmRwb2ludCwgeyBtb2RlOiBcImNvcnNcIiB9KTtcbiAgICAgIGlmICghcmVzcG9uc2Uub2spIHRocm93IG5ldyBFcnJvcihcIkNpdHkgbm90IGZvdW5kXCIpO1xuICAgICAgY29uc3QgbG9jYXRpb25EYXRhID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2l0eU5hbWU6IGxvY2F0aW9uRGF0YVswXS5uYW1lLFxuICAgICAgICBsYXQ6IGxvY2F0aW9uRGF0YVswXS5sYXQsXG4gICAgICAgIGxvbjogbG9jYXRpb25EYXRhWzBdLmxvbixcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldFdlYXRoZXJEYXRhKGNpdHkpIHtcbiAgICB0cnkge1xuICAgICAgY29uc3QgbG9jYXRpb24gPSBhd2FpdCBnZXRHZW9Mb2NhdGlvbihjaXR5KTtcbiAgICAgIGlmICghbG9jYXRpb24pIHRocm93IG5ldyBFcnJvcihcIkNvdWxkIG5vdCBmaW5kIGxvY2F0aW9uXCIpO1xuICAgICAgY29uc3QgeyBsYXQsIGxvbiB9ID0gbG9jYXRpb247XG4gICAgICBjb25zdCBlbmRwb2ludCA9IGBodHRwczovL2FwaS5vcGVud2VhdGhlcm1hcC5vcmcvZGF0YS8yLjUvd2VhdGhlcj9sYXQ9JHtsYXR9Jmxvbj0ke2xvbn0mYXBwaWQ9JHtBUElLRVl9JnVuaXRzPSR7dGVtcFVuaXR9YDtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZmV0Y2goZW5kcG9pbnQsIHsgbW9kZTogXCJjb3JzXCIgfSk7XG4gICAgICBjb25zdCB3ZWF0aGVyRGF0YSA9IGF3YWl0IHJlc3BvbnNlLmpzb24oKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNpdHlOYW1lOiBsb2NhdGlvbi5jaXR5TmFtZSxcbiAgICAgICAgY291bnRyeTogd2VhdGhlckRhdGEuc3lzLmNvdW50cnksXG4gICAgICAgIHdlYXRoZXJEZXNjOiB3ZWF0aGVyRGF0YS53ZWF0aGVyWzBdLmRlc2NyaXB0aW9uLFxuICAgICAgICB0ZW1wOiB3ZWF0aGVyRGF0YS5tYWluLnRlbXAsXG4gICAgICAgIGZlZWxzTGlrZTogd2VhdGhlckRhdGEubWFpbi5mZWVsc19saWtlLFxuICAgICAgICBodW1pZGl0eTogd2VhdGhlckRhdGEubWFpbi5odW1pZGl0eSxcbiAgICAgICAgd2luZFNwZWVkOiB3ZWF0aGVyRGF0YS53aW5kLnNwZWVkLFxuICAgICAgfTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgYWxlcnQoZXJyb3IpO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBnZXRXZWF0aGVyRGF0YSxcbiAgfTtcbn0pKCk7XG5cbmV4cG9ydCBkZWZhdWx0IHdlYXRoZXI7XG4iLCIvLyBUaGUgbW9kdWxlIGNhY2hlXG52YXIgX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fID0ge307XG5cbi8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG5mdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuXHR2YXIgY2FjaGVkTW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXTtcblx0aWYgKGNhY2hlZE1vZHVsZSAhPT0gdW5kZWZpbmVkKSB7XG5cdFx0cmV0dXJuIGNhY2hlZE1vZHVsZS5leHBvcnRzO1xuXHR9XG5cdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG5cdHZhciBtb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdID0ge1xuXHRcdC8vIG5vIG1vZHVsZS5pZCBuZWVkZWRcblx0XHQvLyBubyBtb2R1bGUubG9hZGVkIG5lZWRlZFxuXHRcdGV4cG9ydHM6IHt9XG5cdH07XG5cblx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG5cdF9fd2VicGFja19tb2R1bGVzX19bbW9kdWxlSWRdKG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG5cdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG5cdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbn1cblxuIiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsImltcG9ydCB3ZWF0aGVyIGZyb20gXCIuL21vZHVsZXMvd2VhdGhlcmFwaVwiO1xuaW1wb3J0IHVpIGZyb20gXCIuL21vZHVsZXMvdWlcIjtcblxuY29uc3Qgc2VhcmNoQmFyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYmFyXCIpO1xuY29uc3Qgc2VhcmNoQnRuID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzZWFyY2gtYnRuXCIpO1xuXG5zZWFyY2hCdG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGFzeW5jICgpID0+IHtcbiAgaWYgKHNlYXJjaEJhci52YWx1ZSA9PT0gXCJcIikgcmV0dXJuO1xuICBjb25zdCBkYXRhID0gYXdhaXQgd2VhdGhlci5nZXRXZWF0aGVyRGF0YShzZWFyY2hCYXIudmFsdWUpO1xuICB1aS5zZXRWaWV3KGRhdGEpO1xufSk7XG4iXSwibmFtZXMiOltdLCJzb3VyY2VSb290IjoiIn0=