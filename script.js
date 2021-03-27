const apiUrl =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=60dbf41a1c537e450033c2a17a17dddf";

const imgPath = "https://image.tmdb.org/t/p/w1280";

const main = document.getElementById('main');

const searchPath =
  'https://api.themoviedb.org/3/search/movie?&api_key=60dbf41a1c537e450033c2a17a17dddf&query="';
  getMovies(apiUrl);
  const form = document.getElementById('form');
  const search = document.getElementById('search');
  async function getMovies(url){
      const res = await fetch(url);
      const data = await res.json();

      moviesDom(data.results);
    //   console.log(data.results);
  }

function moviesDom(data){
    
    main.innerHTML = '';



    data.forEach((movie) => {
        let movies = document.createElement('div');
        movies.classList.add('movie');

        const {vote_average,title,poster_path,overview} = movie ;
        movies.innerHTML = `
        <img src="${imgPath + poster_path}" alt="${title}" />
        <div class="movie-info">
          <h3>${title}</h3>
          <span class="${rating(vote_average)}">${vote_average}</span>
        </div>

        <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        ` 
        main.appendChild(movies);

    })
}

function rating(rate){
    if (rate >= 8){
        return 'green';
    }else if (rate > 5){
        return 'orange'
    }else if (rate <=5){
        return 'red';
    }
}

  form.addEventListener('submit',(e)=>{
    e.preventDefault();
      let searchText = search.value;
    //   console.log(searchText);
      if (searchText && searchText !== ''){
          getMovies(searchPath + searchText);
          searchText = '';
      }else{
          window.location.reload();
      }
  });