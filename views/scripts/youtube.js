import {YOUTUBE_API} from "../../config/config.js";
const YOUTUBE_API_KEY = YOUTUBE_API;

// Search for a video trailer based on a movie name
async function searchTrailer(movieName) {
  console.log("the function is called");
  try {
    // Encode the movie name for use in the API request
    const encodedMovieName = encodeURIComponent(`${movieName} trailer`);
    
    // Construct the API request URL
    const url = `https://www.googleapis.com/youtube/v3/search?key=${YOUTUBE_API_KEY}&q=${encodedMovieName}&type=video&part=snippet&maxResults=1`;
    
    // Make the API request
    const response = await fetch(url);
    const data = await response.json();
    
    // Extract the video ID from the search results
    const videoId = data.items[0].id.videoId;
    
    // Construct the URL for the trailer video
    const trailerUrl = `https://www.youtube.com/watch?v=${videoId}`;
    return trailerUrl;
  } catch (error) {
    console.error('An error occurred here: ', error);
    const trailerUrl = 'https://www.youtube.com/';
    return trailerUrl;
  }
}

export async function getTrailerUrl(movieName) {
  const trailerUrl = await searchTrailer(movieName);
  return trailerUrl;
}


// console.log("THE TRAILER URL IS" + getTrailerUrl('The Matrix'));