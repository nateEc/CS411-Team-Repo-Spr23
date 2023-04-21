const API_KEY = "api_key=b9ab825c6c7df22351f2927746188d59"
const BASE_URL = 'https://api.themoviedb.org/3';
const API_URL = BASE_URL + '/discover/movie?sort_by=popularity.desc&'+API_KEY;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const SEARCH_URL = BASE_URL + '/search/movie?'+API_KEY;

const main = document.getElementById('main');
const form =  document.getElementById('form');
const search = document.getElementById('search');
function createCardElement(title, posterUrl, rating, overview) {
    const card = document.createElement("div");
    card.className = "card";

    const poster = document.createElement("img");
    poster.src = posterUrl;
    poster.alt = `${title} poster`;
    poster.className = "card-img-top";
    card.appendChild(poster);

    const cardBody = document.createElement("div");
    cardBody.className = "card-body";
    card.appendChild(cardBody);

    const cardTitle = document.createElement("h2");
    cardTitle.textContent = title;
    cardTitle.className = "card-title";
    cardBody.appendChild(cardTitle);

    const cardText = document.createElement("p");
    cardText.textContent = `Rating: ${rating}\nSummary: ${overview}`;
    cardText.className = "card-summary";
    cardBody.appendChild(cardText);

    return card;
}
function searchMovies(url) {
    const resultsList = document.querySelector(".result");
    fetch(url)
        .then((response) => response.json())
        .then((data) => {
            /*data.results.slice(0, 8).forEach((result) => {
                const card = createCardElement(
                    result.title,
                    `https://image.tmdb.org/t/p/w200${result.poster_path}`,
                    result.vote_average,
                    result.overview
                );
                resultsList.appendChild(card);
            });*/
            main.innerHTML = '';
            data.results.slice(0, 8).forEach((result) => {
                const {title, poster_path, vote_average, overview, id} = result;
                const resultsList = document.createElement('div');
                resultsList.classList.add('movie');
                resultsList.innerHTML = `
             <img src="${poster_path ? IMG_URL + poster_path : "http://via.placeholder.com/1080x1580"}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3>
                <span class="${getColor(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Overview</h3>
                ${overview}
                <br/> 
                <button class="know-more" id="${id}">Know More</button
            </div>
        `
                main.appendChild(resultsList);
                document.getElementById(id).addEventListener('click', () => {
                    console.log(id)
                })
            })
        })
        .catch((error) => console.error(error));
}

function getColor(vote) {
    if(vote>= 8){
        return 'green'
    }else if(vote >= 5){
        return "orange"
    }else{
        return 'red'
    }
}

    let searchButton = document.querySelector("input[type='submit']");
    searchButton.addEventListener("click", (event) => { //searchButton.addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#usrinput");
    const query = searchInput.value;
    console.log(API_KEY);
    console.log(SEARCH_URL);
    const url = SEARCH_URL+'&query='+query;
    searchMovies(url);
});
