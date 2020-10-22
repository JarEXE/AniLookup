$(document).ready(() => {
    $('#searchForm2').on('submit', (e) => {
        let searchText2 = $('#searchText2').val();
        getMangas(searchText2);
        e.preventDefault();
    });
});


var searchButton =document.getElementById("searchButton");

searchButton.onclick = function() {
    var div = document.getElementById('madaimg');
    if (div.style.display !== 'none') {
        div.style.display = 'none';
    }
} 

function getMangas(searchText2){
    axios.get('https://api.jikan.moe/v3/search/manga?q='+searchText2)
    .then((response) => {
        console.log(response);
        let mangas = response.data.results;
        let output = '';
        $.each(mangas, (index, manga) => {
            output += `
            <div class="col-md-3">
                <div style="margin-bottom:10px; margin-top:10px;" class="well text-center">
                    <div class="boxContainer">
                        <img src="${manga.image_url}">
                        <h5>${manga.title}</h5>
                        <p>'${manga.synopsis}'</p>
                        <a onclick="mangaSelected('${manga.mal_id}')" class="btn btn-primary" href="#">Manga Details</a>
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

function mangaSelected(id){
    sessionStorage.setItem('mangaId', id);
    window.location = 'mangadetails.html';
    return false;
}

function getManga(){
    let mangaId = sessionStorage.getItem('mangaId');

    axios.get('https://api.jikan.moe/v3/manga/'+mangaId)
    .then((response) => {
        console.log(response);
        let manga = response.data;

        let output =`
        <div class="row">
            <div class="col-md-4" style="margin-bottom: 20px;">
                <img src="${manga.image_url}" style="padding: 2%; display: block; margin-left: auto; margin-right: auto;" class="thumbnail">
            </div>
            <div style="margin-bottom: 15px;" class="col-md-8">
                <h2>${manga.title}</h2>
                <ul class="list-group">
                    <li class="list-group-item"><strong>Japanese Title</strong> ${manga.title_japanese || "-"}</li>
                    <li class="list-group-item"><strong>Title Synonyms</strong> ${manga.title_synonyms.join(", ") || "-"}</li>
                    <li class="list-group-item"><strong>Genres</strong> ${manga.genres.map(x=>x.name).join(", ") || "-"}</li>
                    <li class="list-group-item"><strong>Type</strong> ${manga.type || "-"}</li>
                    <li class="list-group-item"><strong>Authors</strong> ${manga.authors.map(x=>x.name).join(", ") || "-"}</li>
                    <li class="list-group-item"><strong>Published</strong> ${manga.published.string || "-"}</li>
                    <li class="list-group-item"><strong>Volumes</strong> ${manga.volumes || "-"}</li>
                    <li class="list-group-item"><strong>Chapters</strong> ${manga.chapters || "-"}</li>
                    <li class="list-group-item"><strong>Score</strong> ${manga.score || "-"}</li>
                    <li class="list-group-item"><strong>Status</strong> ${manga.status || "-"}</li>
                    <li class="list-group-item"><strong>Serializations</strong> ${manga.serializations.map(x=>x.name).join(", ") || "-"}</li>
                </ul>    
            </div>
        </div>
        <div class="row">
            <div style="margin: 5px;" class="well">
                <h3>Synopsis</h3>
                ${manga.synopsis || "-"}
                <br />
                <br />
                <h5>Background</h5>
                ${manga.background || "No background information available."}
                <hr>
                <a href="index.html" class="btn btn-primary">Browse Anime</a>
                <a href="mangalookup.html" class="btn btn-default">Return to Search Page</a>
            </div>
        </div>        
        `;
        $('#manga').html(output);
    })
    .catch((err) => {
        console.log(err);
    });
}

