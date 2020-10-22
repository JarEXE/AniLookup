$(document).ready(() => {
   $('#searchForm').on('submit', (e) => {
       let searchText = $('#searchText').val();
       getAnimes(searchText);
       e.preventDefault();
   });
});


//Show image upon page load and hide image when button is clicked

// var searchButton = document.getElementById("searchButton");

// searchButton.onclick = function()
// { 
//     var allImages = { madaimg:"mada"};

//     if(document.getElementById("mada").style.visibility == 'visible')
//     {
//         for ( var image in allImages)
//         {
//             document.getElementById(allImages[image]).style.visibility = 'hidden'; 
//         }
//         document.getElementById("searchButton").innerHTML = "Lookup!";
//     }
// }


//Hide the entire image div

var searchButton =document.getElementById("searchButton");

searchButton.onclick = function() {
    var div = document.getElementById('madaimg');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
} 
// Function for searching for Anime, animes, and Hentai. Change 'anime' to anime where needed.

function getAnimes(searchText){
    axios.get('https://api.jikan.moe/v3/search/anime?q='+searchText)
        .then((response) => {
            console.log(response);
            let animes = response.data.results;
            let output = '';
            $.each(animes, (index, anime) =>{
                output += `
                <div class="col-md-3">
                    <div style="margin-bottom:10px; margin-top:10px;" class="well text-center">
                        <div class="boxContainer">
                            <img src="${anime.image_url}">
                            <h5>${anime.title}</h5>
                            <p>'${anime.synopsis}'</p>
                            <a onclick="animeSelected('${anime.mal_id}')" class="btn btn-primary" href="#">Anime details</a>
                        </div>
                    </div>
                </div>
                `;
            });
            
            $('#animes').html(output);
        })   
        .catch((err) => {
            console.log(err);
        });
}

// Function for storing the ID of a anime once the "details" button is clicked

function animeSelected(id){
    sessionStorage.setItem('animeId', id);
    window.location = 'animedetails.html';
    return false;
}

function getAnime(){
    let animeId = sessionStorage.getItem('animeId');


    axios.get('https://api.jikan.moe/v3/anime/'+animeId)
    .then((response) => {
        console.log(response);
        let anime = response.data;

        let output = `
            <div class="row">
                <div class="col-md-4" style="margin-bottom: 20px;">
                    <img src="${anime.image_url}"  style="padding: 2%; display: block; margin-left: auto; margin-right: auto;" class="thumbnail">
                </div>
                <div style="margin-bottom: 15px;" class="col-md-8">
                    <h2>${anime.title}</h2>
                    <ul class="list-group">
                        <li class="list-group-item"><strong>Japanese Title:</strong> ${anime.title_japanese || "-"}</li>
                        <li class="list-group-item"><strong>Genres:</strong> ${anime.genres.map(x=>x.name).join(", ") || "-"}</li>
                        <li class="list-group-item"><strong>Type:</strong> ${anime.type || ""}</li>
                        <li class="list-group-item"><strong>Aired:</strong> ${anime.aired.string || "-"}</li>
                        <li class="list-group-item"><strong>Episodes:</strong> ${anime.episodes || "-"}</li>
                        <li class="list-group-item"><strong>Duration:</strong> ${anime.duration || "-"}</li>
                        <li class="list-group-item"><strong>Rating:</strong> ${anime.rating || "-"}</li>
                        <li class="list-group-item"><strong>Score:</strong> ${anime.score || "-"}</li>
                        <li class="list-group-item"><strong>Source:</strong> ${anime.source || "-"}</li>
                        <li class="list-group-item"><strong>Status:</strong> ${anime.status || "-"}</li>
                        <li class="list-group-item"><strong>Producers:</strong> ${anime.producers.map(x=>x.name).join(", ") || "-"}</li>
                        <li class="list-group-item"><strong>Studios:</strong> ${anime.studios.map(x=>x.name).join(", ") || "-"}</li>
                        <li class="list-group-item"><strong>Where to Watch:</strong>
                    </ul>    
                </div>
            </div>
            <div class="row">
                <div style="margin: 5px;" class="well">
                    <h3>Synopsis</h3>
                    ${anime.synopsis || "-"}
                    </br>
                    </br>
                    <h5>Background</h5>
                    ${anime.background || "No background information available."}
                    <hr>
                    <a id="trailerBtn" href="${anime.trailer_url || "javascript:{}"}" target="_blank" class="btn btn-primary">Watch Trailer* </a>
                    <a id="returnBtn" href="index.html" class="btn btn-default">Return to Search Page</a>
                    <p> *Please be aware that some trailer links may currently be dead, outdated, or unavailable <strong>;-;</strong></p> 
                </div>
            </div>        
        `;
        $('#anime').html(output);
    })   
    .catch((err) => {
        console.log(err);
    });
}

function autoResizeDiv()
        {
            document.getElementById('full-screen-me').style.height = window.innerHeight +'px';
        }
        window.onresize = autoResizeDiv;
        autoResizeDiv();






// Function for searching MANGA. Change all 'anime' to 'manga' accordingly



// Function for retrieving the stored animeID and displaying the details of the anime to the screen after "details" is clicked.



