

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
// Ajax request
var movieTitle = [];
function getMovies(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {

            for(let movie of movies){

               let htmlStr = `<div id="moviesContainer" class="d-flex flex-column col-4"><h1 class="d-flex">${movie.title.toUpperCase()}</h1><img class="d-flex" src="${movie.poster}"><p>Rating: ${movie.rating}<i class="fa fa-star"></i></p><p><strong>Cast:</strong> ${movie.actors}</p><p><strong>Plot:</strong> ${movie.plot}</p><p><strong>Director:</strong> ${movie.director}</p><p><strong>Genre:</strong> ${movie.genre}</p><p><strong>Year Released:</strong> ${movie.year}</p><button type="button" id="deleteMovie-${movie.id}">Delete</button></div>`;
                // movieTitle.push(movie.title);
                $('#container').append(htmlStr);

                // $(`#stars${movie.rating}-${movie.id}`).attr('checked', true);
            }
            dropDown(movies);
        });
}
// Main Display

getMovies();
var radioBtn = '';
radioBtn.checked = true;
var movieData = [];


// Search Bar

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
    html += "<h1>"+ movieData[0].Title + "</h1>";
    html += "<img src="+ movieData[0].Poster + ">";
    html += "<p>Rated: " + movieData[0].Rated + "</p>";
    html += "<p>Run time: " + movieData[0].Runtime + "</p>";
    html += "<p>Cast: " + movieData[0].Actors + "</p>";
    html += "<p>Plot: " + movieData[0].Plot + "</p>";
    html += "<p>Director: " + movieData[0].Director + "</p>";
    html += "<p>Genre: " + movieData[0].Genre + "</p>";
    html += "<p>Year Released: " + movieData[0].Year + "</p>";
    html += "</div>";
    $('#addMovie').html(html);
    $('#movieSearch').val('');
    // movieData = [];

        // POST

let newMovie = {
    'title': movieData[0].Title,
    'poster': movieData[0].Poster,
    'rating': movieData[0].Rated,
    'actors': movieData[0].Actors,
    'plot': movieData[0].Plot,
    'director': movieData[0].Director,
    'genre': movieData[0].Genre,
    'year': movieData[0].Year
};

let postOptions = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(newMovie)
}
$('#updateDB').click(function(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies/", postOptions)
        .then(getMovies)
        modal.style.display = 'none';
});

}
// Dropdown Menu, WIP
function dropDown(x) {
    for (var p = 0; p < x.length; p++){
        var HTML;
        HTML += `<option>${x[p].title.toUpperCase()}</option>`;
}
    document.getElementById('selector').innerHTML =  `<label for='movieSelector'></label><select class='d=flex align-items-center ml-3' id='movieSelector'>${HTML}</select>`;
    // document.getElementById('movieSelector').innerHTML = HTML;
}

// Edit Movies

// let editor = {

// }

// let patchOptions = {
//     method: 'PATCH',
//     headers: {
//         'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(patchThis)
// }
//
// fetch("https://jungle-enshrined-couch.glitch.me/books/7", patchOptions).then(getBooks);


// <div id="rate-${movie.id}" className="rate">
//     <input type="radio" id="star5-${movie.id}" name="rate" value="5"/>
//     <label htmlFor="star5" title="text">5 stars</label>
//     <input type="radio" id="star4-${movie.id}" name="rate" value="4"/>
//     <label htmlFor="star4" title="text">4 stars</label>
//     <input type="radio" id="star3-${movie.id}" name="rate" value="3"/>
//     <label htmlFor="star3" title="text">3 stars</label>
//     <input type="radio" id="star2-${movie.id}" name="rate" value="2"/>
//     <label htmlFor="star2" title="text">2 stars</label>
//     <input type="radio" id="star1-${movie.id}" name="rate" value="1"/>
//     <label htmlFor="star1" title="text">1 star</label>
// </div>