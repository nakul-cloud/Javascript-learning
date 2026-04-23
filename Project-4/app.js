const API_KEY = ""; // 

const input = document.getElementById("cityInput");
const btn = document.getElementById("searchBtn");
const statusText = document.getElementById("status");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");

const celsiusBtn = document.getElementById("celsiusBtn");
const fahrenheitBtn = document.getElementById("fahrenheitBtn");

let currentData = null;
let unit = "C";


// FETCH WEATHER


async function fetchWeather(city) {
  try {
    statusText.textContent = "Loading... ";

    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${city}?key=${API_KEY}`
    );

    if (!response.ok) {
      throw new Error("City not found");
    }

    const data = await response.json();

    currentData = processData(data);
    displayWeather(currentData);

    statusText.textContent = "Done";

  } catch (error) {
    statusText.textContent = "Error";
    console.log(error);
  }
}


// PROCESS DATA


function processData(data) {
  return {
    city: data.address,
    temp: data.currentConditions.temp,
    condition: data.currentConditions.conditions,
    humidity: data.currentConditions.humidity
  };
}


// DISPLAY


function displayWeather(data) {
  cityName.textContent = data.city;
  condition.textContent = `Condition: ${data.condition}`;
  humidity.textContent = `Humidity: ${data.humidity}%`;

  if (unit === "C") {
    temp.textContent = `Temperature: ${((data.temp - 32) * 5/9).toFixed(1)} °C`;
  } else {
    temp.textContent = `Temperature: ${data.temp} °F`;
  }

  changeBackground(data.condition);
}


// BACKGROUND CHANGE


function changeBackground(condition) {
  const body = document.body;

  if (condition.toLowerCase().includes("rain")) {
    body.style.background = "linear-gradient(135deg, #4e54c8, #8f94fb)";
  } else if (condition.toLowerCase().includes("cloud")) {
    body.style.background = "linear-gradient(135deg, #757f9a, #d7dde8)";
  } else {
    body.style.background = "linear-gradient(135deg, #4facfe, #00f2fe)";
  }
}


// EVENTS


btn.addEventListener("click", () => {
  const city = input.value.trim();
  if (!city) {
    statusText.textContent = "Enter city!";
    return;
  }
  fetchWeather(city);
});

input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") btn.click();
});

// toggle buttons
celsiusBtn.addEventListener("click", () => {
  unit = "C";
  if (currentData) displayWeather(currentData);
});

fahrenheitBtn.addEventListener("click", () => {
  unit = "F";
  if (currentData) displayWeather(currentData);
});

// default load
fetchWeather("London");