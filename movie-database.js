let getOptions = {
    method: 'GET',
    headers: {
        'Content-Type': 'application/json',
    }
};

function getBooks(){
    fetch("https://changeable-cyan-horesradish.glitch.me/movies", getOptions)
        .then(resp => resp.json())
        .then(movies => {
            let htmlStr = "";
            for(let movie of movies){
                htmlStr += `<h1>${movie.title}</h1><p>by: ${movie.director} ${movie.plot} ${movie.id}</p>`;
            }
            $('#container').html(htmlStr);
        });
}
getBooks();



