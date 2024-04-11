const singleMovieContainer = document.getElementById("movieDetails");

function setF(favoriteArray) {
    localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
}

function fetchSingleMovie(movieId) {
    let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US&append_to_response=credits`;
    
    fetch(url)
    .then((response) => response.json())
    .then((data) => {
        const movieDetails = data;
        const castDetails = movieDetails.credits.cast
        console.log(movieDetails);
        displaySingleMovie(movieDetails);
        fetchSingleMovieCast(castDetails);
    })
    .catch((error) => console.error("Error fetching movie details:", error));
}

function displaySingleMovie(movieDetails) {
    const isLiked = favoriteArray?.includes(movieDetails?.id + '')
    const likedIcon = 'fas fa-heart'
    const unlikeIcon = 'far fa-heart'
    const heartClass = isLiked ? likedIcon : unlikeIcon;

    singleMovieContainer.innerHTML = "";
    
    const posterPath = movieDetails.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetails.poster_path}`
    : "no-image-available.jpg";
    
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    
    movieCard.innerHTML = `
    <img class="movie-poster" src="${posterPath}" alt="${movieDetails.title}">
    <h3>${movieDetails.title}</h3>
    <p>Release Date: ${movieDetails.release_date}</p>
    <h4>Actors Name:</h4>
    <ul id="castList"></ul>
    <i class="${heartClass}" id="${movieDetails.id}" onclick="changeColor(this)" style="color:red"></i>`;
    
    singleMovieContainer.appendChild(movieCard);
}

function fetchSingleMovieCast(castDetails) {
    const castList = document.getElementById("castList");
    castList.innerHTML = '';
    
    castDetails.forEach((actor) => { 
        console.log(actor);
        const listItem = document.createElement('div');
        listItem.classList.add("actorDiv");
        listItem.innerHTML =
        `<p>${actor.name}</p>
        <img id="actorPhoto"src="${actor.profile_path ? "https://image.tmdb.org/t/p/original" + actor.profile_path : "https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"}">`;

        castList.appendChild(listItem);
    });
}    

const searchButton = document.getElementById("searchButton");
const movieIdInput = document.getElementById("movieId");

searchButton.addEventListener("click", () => {
    const movieId = movieIdInput.value;
    if (movieId) {
        fetchSingleMovie(movieId);
    } else {
        alert("Please enter a valid Movie ID.");
    }
});


