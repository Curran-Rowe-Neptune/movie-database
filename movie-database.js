let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};
// Ajax request

function getMovies(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {

            for(let movie of movies){

               let htmlStr = `<div id="moviesContainer" class="d-flex flex-column col-4"><h1 class="d-flex">${movie.title.toUpperCase()}</h1><img class="d-flex" src="${movie.poster}"><p>Rating: ${movie.rating}<i class="fa fa-star"></i></p><p><strong>Cast:</strong> ${movie.actors}</p><p><strong>Plot:</strong> ${movie.plot}</p><p><strong>Director:</strong> ${movie.director}</p><p><strong>Genre:</strong> ${movie.genre}</p><p><strong>Year Released:</strong> ${movie.year}</p><button type="button" id="deleteMovie-${movie.id}">Delete</button></div>`;
                $('#container').append(htmlStr);

            }
            let deleteOptions = {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            }
            $(`#deleteMovie-${movie.id}`).click(function () {
                fetch(`https://https://changeable-cyan-horesradish.glitch.me/movies/${movie.id}, deleteOptions`).then(getMovies)
            })
            dropDown(movies);
        });
}
// Main Display

getMovies();


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


// DELETE

//     $('')
// fetch(`https://changeable-cyan-horesradish.glitch.me/books/${movie.id}`, deletedOptions)
//     .then(getMovies);
// $("#makinChanges").click(() => {
//     fetch('https://jungle-enshrined-couch.glitch.me/books')
//         // .then(resp => resp.json())
//         .then(movies => {
//             let uniqueBooks = [];
//             for (let movie of movies){
//                 if (uniqueBooks.length === 0){
//                     uniqueBooks.push(movie);
//                     continue;
//                 }
//                 for (let existingBook of uniqueBooks) {
//                     if (movie.title !== existingBook.title && book.author.firstName !== existingBook.author.firstName && book.author.lastName !== existingBook.author.lastName) {
//                         uniqueBooks.push(book);
//                     } else {
//                         fetch(`https://changeable-cyan-horesradish.glitch.me/books/${movie.id}`, deletedOptions)
//                             .then(getMovies);
//                     }
//                 }
//             }
//         })
// });



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
