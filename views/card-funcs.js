export { createCardElement, userFavorites, fetchUserFavorites };


async function handleFavoriteButtonClick(card, favoriteButton, id, title) {
  card.isFavorite = !card.isFavorite;
  favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";

  try {
    const response = await fetch(`/api/favorites/${userId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ movieId: id, isFavorite: card.isFavorite })
    });

    if (response.ok) {
      console.log(`The movie ${title} has a favorite status of ${card.isFavorite}`);
    } else {
      console.error('Error updating user favorites');
    }
  } catch (error) {
    console.error('Error making request to update user favorites:', error);
  }
}
function createCardElement(title, posterUrl, rating, overview, id, isFavorite) {
    const movieIsFavorite = userFavorites.includes(id.toString());

    const card = document.createElement("div");
    card.className = "card";
    card.isFavorite = movieIsFavorite;//uses the db info to check if the movie is already favorited

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

    const knowMoreButton = document.createElement("button");
    knowMoreButton.textContent = "Know More";
    knowMoreButton.className = "know-more";
    knowMoreButton.id = id;
    knowMoreButton.onclick = () => makeUrl(title);
    cardBody.appendChild(knowMoreButton);

    const favoriteButton = document.createElement("button");
    favoriteButton.textContent = card.isFavorite ? "Remove from Favorites" : "Add to Favorites";
    favoriteButton.className = "favorite";
    favoriteButton.id = id;
    favoriteButton.onclick = () => {
      handleFavoriteButtonClick(card, favoriteButton, id, title);
    };
    cardBody.appendChild(favoriteButton);

    return card;
  }

let userFavorites = [];
async function fetchUserFavorites(userId) {
  try {
    const response = await fetch(`/api/favorites/${userId}`);
    const data = await response.json();
    userFavorites = data.favoriteMovies;
  } catch (error) {
    console.error('Error fetching user favorites:', error);
  }
}
fetchUserFavorites();
