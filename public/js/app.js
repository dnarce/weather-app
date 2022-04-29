console.log('app.js running');

const weatherForm = document.getElementById('weather-form');
const restartButton = document.getElementById('restartButton');
const address = document.getElementById('address');
const loadingBar = document.getElementById('loading');
const resultsContainer = document.getElementById('results');
const mainContent = document.getElementById('mainContent');
const resultsData = document.getElementById('resultData');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  mainContent.classList.add('hidden');
  loadingBar.classList.remove('hidden');

  fetch(`/weather?address=${address.value}`).then((response) => {
    response.json().then((data) => {
      console.log(data);

      resultsData.innerHTML = `<div class="stats shadow bg-primary text-primary-content">
                        <div class="stat">
                            <div class="stat-figure">
                                <img src="${data.forecast.weather.iconURL}" alt="">
                            </div>
                            <div class="stat-title">${data.location}</div>
                            <div class="stat-value">${data.forecast.main.temp} °C</div>
                            <div class="stat-desc capitalize">${data.forecast.weather.description}</div>
                        </div>
                    </div>`;

      loadingBar.classList.add('hidden');
      resultsContainer.classList.remove('hidden');
    });
  });
});

restartButton.addEventListener('click', (e) => {
  e.preventDefault();
  resultsContainer.classList.add('hidden');
  mainContent.classList.remove('hidden');
  address.value = '';
});
