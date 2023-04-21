 // move this function elsewhere
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

    let searchButton = document.querySelector("input[type='submit']");
    searchButton.addEventListener("click", (event) => { //searchButton.addEventListener("submit", async (event) => {
    event.preventDefault();
    let searchInput = document.querySelector("#usrinput");
    const query = searchInput.value;
    const SEARCH_URL = "https://api.themoviedb.org/3/search/movie?api_key=b9ab825c6c7df22351f2927746188d59&query=$%7Bquery%7D"
    const API_KEY = "b9ab825c6c7df22351f2927746188d59"
    const resultsList = document.querySelector(".result");
    console.log(API_KEY)
    console.log(SEARCH_URL)
    const url = `${SEARCH_URL}?api_key=${API_KEY}&query=${query}`;
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
    resultsList.innerHTML = "";

    data.results.slice(0, 8).forEach((result) => {
    const card = createCardElement(
    result.title,
    `https://image.tmdb.org/t/p/w200${result.poster_path}`,
    result.vote_average,
    result.overview
    );
    resultsList.appendChild(card);
});
    /*resultsList.style.display = "flex";
    resultsList.style.flexDirection = "row";
    resultsList.style.listStyle = "none";
    resultsList.style.margin = "0";
    resultsList.style.padding = "0";
    const liItems = document.querySelectorAll(".result li");
    liItems.forEach((li) => {
        li.style.width = "220px";
        li.style.height = "350px";
        li.style.marginRight = "20px";
    })*/
})
    .catch((error) => console.error(error));
});
