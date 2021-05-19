

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

function getMovies(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            let htmlStr = "";
            for(let movie of movies){

                htmlStr += `<div id="moviesContainer" class="d-flex flex-column col-4"><h1 class="d-flex">${movie.title.toUpperCase()}</h1><img class="d-flex" src="${movie.poster}"><div class="rate">
    <input type="radio" id="star5" name="rate" value="5" />
    <label for="star5" title="text">5 stars</label>
    <input type="radio" id="star4" name="rate" value="4" />
    <label for="star4" title="text">4 stars</label>
    <input type="radio" id="star3" name="rate" value="3" />
    <label for="star3" title="text">3 stars</label>
    <input type="radio" id="star2" name="rate" value="2" />
    <label for="star2" title="text">2 stars</label>
    <input type="radio" id="star1" name="rate" value="1" />
    <label for="star1" title="text">1 star</label>
  </div><p><strong>Cast:</strong> ${movie.actors}</p><p><strong>Plot:</strong> ${movie.plot}</p><p><strong>Director:</strong> ${movie.director}</p><p><strong>Genre:</strong> ${movie.genre}</p><p><strong>Year Released:</strong> ${movie.year}</p></div>`;
                let rating = movie.rating;

                radioBtn = document.getElementById("#star" + rating + "");

            }
            $('#container').html(htmlStr);
        });
}
getMovies();
var radioBtn = '';
radioBtn.checked = true;
var movieData = [];



$('#sniff').click(function(){
    movieData = [];
        fetch("https://www.omdbapi.com/?t=" + $('#movieSearch').val() + "&apikey=" + OMDb_API_TOKEN + "")
            .then(resp => resp.json())
            .then(data => movieData.push(data));
    setTimeout(function (){
        getData();
    },2000);
});
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName('close')[0];
    function getData(){
    modal.style.display = "block";
    span.onclick = function (){
        modal.style.display = "none";
    }
    window.onclick = function (event){
        if(event.target == modal){
            modal.style.display = "none";
        }
    }
    var html = "<div>";
    html += "<h1>"+ movieData[0].Title +"</h1>";
    html += "<img src="+ movieData[0].Poster + ">";
    html += "<p>Rated: " + movieData[0].Rated + "</p>";
    html += "<p>Run time: " + movieData[0].Runtime + "</p>";
    html += "<p>Cast: " + movieData[0].Actors + "</p>";
    html += "<p>Plot: " + movieData[0].Plot + "</p>";
    html += "<p>Director: " + movieData[0].Director +"</p>";
    html += "<p>Year Released: " + movieData[0].Year + "</p>";
    html += "</div>";
    $('#addMovie').html(html);
    $('#movieSearch').val('');
    // movieData = [];
}
