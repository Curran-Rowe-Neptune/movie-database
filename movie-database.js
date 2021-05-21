'use strict';

// Loading Function

function downLoad(){
    if (document.all){
        document.all["layer1"].style.visibility="hidden";
        document.all["layer2"].style.visibility="visible";
    } else if (document.getElementById){
        let node;
        node = document.getElementById("layer1").style.visibility='hidden';
        node = document.getElementById("layer2").style.visibility='visible';
    }
}
$(document).ready(function(){
    $('#loading').toggleClass('hidden');
});

// Ajax request,

let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

// gives each movie a container,

function getMovies(){
    movieData = []
    document.getElementById('container').innerHTML = '';
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {

            for(let movie of movies){

               let htmlStr = `<div id="moviesContainer" class="d-flex flex-column col-4"><h1 class="d-flex">${movie.title.toUpperCase()}</h1><img class="d-flex" src="${movie.poster}"><p>Rating: ${movie.rating}<i class="fa fa-star"></i></p><p><strong>Cast:</strong> ${movie.actors}</p><p><strong>Plot:</strong> ${movie.plot}</p><p><strong>Director:</strong> ${movie.director}</p><p><strong>Genre:</strong> ${movie.genre}</p><p><strong>Year Released:</strong> ${movie.year}</p><button type="button" id="please">Update</button><button type="button" class="deleteMovies" data-id="${movie.id}">Delete</button></div>`;

                $('#container').append(htmlStr);
            }
            // $(`#deleteMovie-${number}`).click(function () {
            $(`.deleteMovies`).click(function(e) {
                console.log($(e.target).data("id"))
                let ID = $(e.target).data("id")
                fetch(`https://changeable-cyan-horesradish.glitch.me/movies/${ID}`, deleteOptions).then(getMovies)
            });
            // and contains the delete button^
            let deleteOptions = {
                method: 'DELETE',
                headers: {
                    'Content_Type': 'application/json',
                },
            };
            // dropDown(movies);
        });
    }
// Browser Display

getMovies();

// Search Bar, finds your movie using the api key
var movieData = []
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

// Allows you to make edits to a movie in the browser
    function getData(){
    modal.style.display = "block";
    span.onclick = function (){
        modal.style.display = "none";
    }
    window.onclick = function (event){
        if(event.target === modal){
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

        // POST, add new movie

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

 // Post Request Syntax

let postOptions = {
    method: 'POST',
    headers: {
        'Content-type': 'application/json',
    },
    body: JSON.stringify(newMovie)
}

// Ajax

$('#updateDB').click(function(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", postOptions)
        .then(getMovies)
        modal.style.display = 'none';

});

}
// Dropdown Menu
// var HTML;
// var selectedUpdates = [];
// function dropDown(x) {
//     for (var p = 0; p < x.length; p++) {
//         HTML += `<option>${x[p].title.toUpperCase()}</option>`;
//     }
//     document.getElementById('selector').innerHTML = `<label for='movieSelector'>Select a Movie to Edit</label><select class='d=flex align-items-center ml-3' id='movieSelector'>${HTML}</select>`;
// }
    $('#please').click(function() {
        modal.style.display = "block";
        span.onclick = function () {
            modal.style.display = "none";
        }
        window.onclick = function (event) {
            if (event.target === modal) {
                modal.style.display = "none";
            }
        }
        var html = "<div class='d-flex justify-content-between align-item-center' id='updateChecks'>";
        html += "<label for='checkTitle'>Title</label>"
        html += "<input type='checkbox' value='title' id='checkTitle' class='updates'>";
        html += "<label for='checkPoster'>Poster</label>"
        html += "<input id='checkPoster' value='poster' type='checkbox' class='updates'>";
        html += "<label for='checkRated'>MPAA Rating</label>"
        html += "<input id='checkRated' value='rating' type='checkbox' class='updates'>";
        html += "<label for='checkedRun'>Runtime</label>"
        html += "<input id='checkedRun' value='runtime' type='checkbox' class='updates'>";
        html += "<label for='checkedActor'>Actors</label>"
        html += "<input id='checkedActor' value='actors' type='checkbox' class='updates'>";
        html += "<label for='checkedPlot'>Plot</label>"
        html += "<input id='checkedPlot' value='plot' type='checkbox' class='updates'>";
        html += "<label for='checkedDirector'>Director</label>"
        html += "<input id='checkedDirector' value='director' type='checkbox' class='updates'>";
        html += "<label for='checkedGenre'>Genre</label>"
        html += "<input id='checkedGenre' value='genre' type='checkbox' class='updates'>";
        html += "<label for='checkedYear'>Year</label>"
        html += "<input id='checkedYear' value='year' type='checkbox' class='updates'>";
        html += "<button type='button' id='updateMovieBtn'>Select</button>";
        html += "</form>";
        html += "</div>";
        $('#addMovie').html(html);
        $('#modalHeader').html("What would you like to update?")
    });
        $('#updateMovieBtn').click(function () {
            selectedUpdates.push($('.updates:checkbox:checked'));
            modal.style.display = 'none';
        });
// $('#updateMovieBtn').click();


// Add full custom button
$('#addYourMovie').click(function(){
    modal.style.display = 'block';
    span.onclick = function(){
        modal.style.display = 'none';
    }
    window.onclick = function() {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    }
    var html = "<div>";
    html += "<form>";
    html += "<label for='newTitle'>Add Title:</label>"
    html += "<input id='newTitle' type='text' placeholder='Title of movie'><br>";
    html += "<label for='newRating'>Add Rating</label>"
    html += "<input id='newRating' type='text' placeholder='1 to 5 Stars'><br>";
    html += "<label for='newRated'>Add Rating</label>"
    html += "<input id='newRated' type='text' placeholder='R, PG-13, ect... '><br>";
    html += "<label for='newRuntime'>Add Runtime</label>"
    html += "<input type='text' id='newRuntime' placeholder='Total minutes'><br>";
    html += "<label for='newCast'>Add Actors</label>"
    html += "<input id='newCast' type='text' placeholder='First and Last Name'><br>";
    html += "<label for='newPlot'>Add Plot</label>"
    html += "<input type='text' id='newPlot' placeholder='What your take is'><br>";
    html += "<label for='newDirector'>Add Director</label>"
    html += "<input type='text' id='newDirector' placeholder='First and Last name'><br>";
    html += "<label for='newGenre'>Add Genre</label>"
    html += "<input type='text' id='newGenre' placeholder='Your Genre'><br>";
    html += "<label for='newYear'>Add Year</label>"
    html += "<input type='text' id='newYear' placeholder='Enter a Year'>";
    html += "<button type='button' id='addToDb'>Add</button>";
    html += "</form>";
    html += "</div>";
    $('#modalHeader').html("Add Your Movie")
    $('#addMovie').html(html);

    //Add a movie

    $('#updateDB').click(function(){
        var userMovie = {
            'title': $('#newTitle').val(),
            'rating': $('#newRating').val(),
            'rated': $('#newRated').val(),
            'actors': $('#newCast').val(),
            'plot': $('#newPlot').val(),
            'director': $('#newDirector').val(),
            'genre': $('#newGenre').val(),
            'year': $('#newYear').val()
        }
        let postOptions = {
            method: 'POST',
            headers: {
                'Content-type': 'application/json',
            },
            body: JSON.stringify(userMovie)
        }
        fetch("https://changeable-cyan-horesradish.glitch.me/movies", postOptions)
            .then(getMovies)
        modal.style.display = 'none';
    });

});

  //TODO Delete button request idFinder, come back and work on mouseover
//onmouseenter="idFinder(this.id)//
// var buttonID = "";
// var number;
// function idFinder(x){
//     buttonID = x;
//     var buttonSplitter = buttonID.split('-');
//     number = buttonSplitter[1].toString();
//     // console.log(number)
// return(number)


