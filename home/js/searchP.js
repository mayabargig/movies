// const apiKey = "be93d2314b628d913609d274fc1bdf70";
const moviesContainer = document.getElementById("moviesContainer");
const popularitySelect = document.getElementById("popularitySelect");
const pagination = document.getElementById("pagination");
const movieName = document.getElementById("movieName");

function setF(favoriteArray) {
    localStorage.setItem("favoriteArray", JSON.stringify(favoriteArray));
}

movieName.addEventListener("input", fetchMovies);
pagination.addEventListener("click", handlePaginationClick);

let currentPage = 1;

function fetchMovies() {
    const name = movieName.value;
    console.log(name);
    const url = `https://api.themoviedb.org/3/search/movie??api_key=${apiKey}&language=en-US&query=${name}&page=${currentPage}&include_adult=false`;

    const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJiZTkzZDIzMTRiNjI4ZDkxMzYwOWQyNzRmYzFiZGY3MCIsInN1YiI6IjY1MTVlOTcwZDQ2NTM3MDEwMDFiMWI4ZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.daVbJcMAi-EU2ISKujKA40QMjBgEFsZvC26VPRDCBu0'
        }
      };
   
      fetch(url, options)
        .then(response => response.json())
        .then((data) =>{
            console.log(data)
            const movies = data.results;
            console.log(movies);
            displayMovies(movies);
        })
        .catch(err => console.error("Error fetching movies:", err));
    }

function displayMovies(movies) {
    moviesContainer.innerHTML = "";
    
    movies.forEach((movie) => {
        const isLiked = favoriteArray?.includes(movie?.id + '')
        const likedIcon = 'fas fa-heart'
        const unlikeIcon = 'far fa-heart'
        const heartClass = isLiked ? likedIcon : unlikeIcon;

        const movieCard = document.createElement("div");
        movieCard.classList.add("movie-card");
        
        const posterPath = movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : "no-image-available.jpg"; 
        
        movieCard.innerHTML = `
        <img class="movie-poster" src="${posterPath}" alt="${movie.title}">
        <h3>${movie.title}</h3>
        <p>Release Date: ${movie.release_date}</p>
        <i class="${heartClass}" id="${movie.id}" onclick="changeColor(this)" style="color:red"></i>`;

        moviesContainer.appendChild(movieCard);
        createPagination();
    });
}

function createPagination() {
    pagination.innerHTML ="";
    for (let i = 1; i <= 5; i++){
        const button = document.createElement("button");
        button.textContent = i;
        
        if(i === currentPage){
            button.classList.add("selected")
        }
        button.addEventListener("click", () => {
            currentPage = i;
            fetchMovies();
        });
        pagination.appendChild(button);
    }
}

function handlePaginationClick(event) {
    if (event.target.tagName === "BUTTON") {
        fetchMovies();
    }
}

fetchMovies();