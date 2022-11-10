import weather from "./modules/weatherapi";
import ui from "./modules/ui";

const searchBar = document.getElementById("search-bar");
const searchBtn = document.getElementById("search-btn");

searchBtn.addEventListener("click", async () => {
  if (searchBar.value === "") return;
  const data = await weather.getWeatherData(searchBar.value);
  ui.setView(data);
});
