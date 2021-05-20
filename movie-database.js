'use strict';

// Loading function

function downLoad(){
    if (document.all){
        document.all["layer1"].style.visibility="hidden";
        document.all["layer2"].style.visibility="visible";
    } else if (document.getElementById){
        node = document.getElementById("layer1").style.visibility='hidden';
        node = document.getElementById("layer2").style.visibility='visible';
    }
}
$(document).ready(function(){
    $('#loading').toggleClass('hidden');
});


let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
// Ajax request, gives each movie a container, and contains the delete button

function getMovies(){
    document.getElementById('container').innerHTML = '';
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {

            for(let movie of movies){

               let htmlStr = `<div id="moviesContainer" class="d-flex flex-column col-4"><h1 class="d-flex">${movie.title.toUpperCase()}</h1><img class="d-flex" src="${movie.poster}"><p>Rating: ${movie.rating}<i class="fa fa-star"></i></p><p><strong>Cast:</strong> ${movie.actors}</p><p><strong>Plot:</strong> ${movie.plot}</p><p><strong>Director:</strong> ${movie.director}</p><p><strong>Genre:</strong> ${movie.genre}</p><p><strong>Year Released:</strong> ${movie.year}</p><button type="button" id="deleteMovie-${movie.id}" onmouseenter="idFinder(this.id)">Delete</button></div>`;
                $('#container').append(htmlStr);
            }
            dropDown(movies);
        });
}
// Main Display

getMovies();


// Search Bar

$('#sniff').click(function(){
        fetch("https://www.omdbapi.com/?t=" + $('#movieSearch').val() + "&apikey=" + OMDb_API_TOKEN + "")
            .then(resp => resp.json())
            .then(data => movieData.push(data));
    setTimeout(function (){
        getData();
    },2000);
});
var modal = document.getElementById('myModal');
var span = document.getElementsByClassName('close')[0];

$('#selector').on('change', function(){
    modal.style.display = 'block';
    span.onclick = function(){
        modal.style.display = 'none';
    }
    window.onclick = function() {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
    var html = "<div>";
    html += "<form>";
    html += "<label for='newTitle'>Edit/Add Title:</label>"
    html += "<input id='newTitle' type='text' placeholder='Rename that movie'><br>";
    html += "<label for='newRating'>Edit/Add Rating</label>"
    html += "<input id='newRating' type='text' placeholder='1 to 5 Stars'><br>";
    html += "<label for='newRated'>Edit/Add Rating</label>"
    html += "<input id='newRated' type='text' placeholder='R, PG-13, ect... '><br>";
    html += "<label for='newRuntime'>Edit/Add Runtime</label>"
    html += "<input type='text' id='newRuntime' placeholder='Total minutes'><br>";
    html += "<label for='newCast'>Edit/Add Actors</label>"
    html += "<input id='newCast' type='text' placeholder='First and Last Name'><br>";
    html += "<label for='newPlot'>Edit/Add Plot</label>"
    html += "<input type='text' id='newPlot' placeholder='What your take is'><br>";
    html += "<label for='newDirector'>Edit/Add Director</label>"
    html += "<input type='text' id='newDirector' placeholder='First and Last name'><br>";
    html += "<label for='newGenre'>Edit/Add Genre</label>"
    html += "<input type='text' id='newGenre' placeholder='Your Genre'><br>";
    html += "<label for='newYear'>Edit/Add Year</label>"
    html += "<input type='text' id='newYear' placeholder='Enter a Year'>";
    html += "</form>"
    html += "</div>";
    $('#modalHeader').html("Update your Movie")
    $('#addMovie').html(html);

});

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
// Dropdown Menu, edit movie WIP

function dropDown(x) {
    for (var p = 0; p < x.length; p++){
        var HTML;
        HTML += `<option>${x[p].title.toUpperCase()}</option>`;
}
    document.getElementById('selector').innerHTML =  `<label for='movieSelector'></label><select class='d=flex align-items-center ml-3' id='movieSelector'>${HTML}</select>`;
}



 // Delete button request
var buttonID = "";
var number;
function idFinder(x){
    buttonID = x;
    var buttonSplitter = buttonID.split('-');
    number = buttonSplitter[1].toString();

}

// let deleteOptions = {
//     method: 'DELETE',
//     headers: {
//         'Content-Type': 'application/json'
//     }
// }

// $(`#${buttonID}`).click(function() {
//     fetch(`https://https://changeable-cyan-horesradish.glitch.me/movies/${number}, deleteOptions`).then(getMovies)
// });


 $(`#${buttonID}`).click(deleteMovie())
     // fetch(`"https://https://changeable-cyan-horesradish.glitch.me/movies/${number}"`, deleteOptions).then(getMovies)
     // return document.getElementsByTagName("button")
     // return $(this).attr('id')
 // });

     //DELETE MOVIE FUNCTION WIP
     var deleteMovie = id => fetch(`"https://https://changeable-cyan-horesradish.glitch.me/movies/${number}`, {
         method: 'DELETE',
         headers: {
             'Content-type': 'application/json'
         },
     })
         .then(res => res.json())
         .then(() => {
             console.log(`Success: deleted movie with id of ${id}`)
         })
         .catch(console.error)



// ??
