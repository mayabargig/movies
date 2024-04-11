document.addEventListener("DOMContentLoaded", ()=>{   
    if (!favoriteArray || favoriteArray.length === 0) {
        moviesContainer.innerHTML = "<p>You haven't added any favorite movies yet.</p>";
    } else {
        favoriteArray.forEach((movie) => {
            fetchFavoriteMovies(movie);
        });
    };
    
    function fetchFavoriteMovies(movieId) {
        let url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
        
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            const movieDetails = data;
            console.log(movieDetails);
            displayFavoriteMovies(movieDetails);
        })
        .catch((error) => console.error("Error fetching movie details:", error));
    };
    
    function displayFavoriteMovies(movie) {
        const isLiked = favoriteArray.includes(movie.id + '');
        const heartClass = isLiked ? "fas fa-heart" : "far fa-heart";
        
        const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "no-image-available.jpg";
        
        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        
        movieCard.innerHTML += `
        <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <i class="${heartClass}" id="${movie.id}" onclick="changeColor(this)" style="color:red"></i>`;
        
        moviesContainer.appendChild(movieCard);
    };    
})