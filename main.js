/*
  Here is a rough idea for the steps you could take:
*/

// 1. First select and store the elements you'll be working with
// 2. Create your `submit` event for getting the user's search term
// 3. Create your `fetch` request that is called after a submission
// 4. Create a way to append the fetch results to your page
// 5. Create a way to listen for a click that will play the song in the audio play


let url = 'https://itunes.apple.com/search?media=music&term=';
let container = document.querySelector('.container')
let searchInput = document.querySelector('.searchInput');
let searchButton = document.querySelector('.searchButton');
let results = document.querySelector('.results');
let musicPlayerSection = document.querySelector('.player');
let musicPlayer = document.querySelector('.music-player');
let form = document.querySelector('.search-form');

form.addEventListener('submit', function(event) {
  event.preventDefault();
  let searchValue = searchInput.value;
  goFetch(searchValue);
});

function goFetch(searchValue) {
  fetch(url + searchValue)
    .then(function(response) {
      if (response.status !== 200) {
        console.log('There was an issure retrieving the data. Status Code: ' + response.status);
        return;
      }
      response.json().then(function(data) {
        for (var i = 0; i < data.results.length; i++) {
          let image = data.results[i].artworkUrl100;
          let newDiv = document.createElement('div')
          results.appendChild(newDiv)
          newDiv.classList.add('return')
          let audio = data.results[i].previewUrl
          newDiv.addEventListener('click', function() {
            musicPlayer.src = audio;
          });
          let template = `
            <img src="${image}" alt="Album Art">
            <h3>${data.results[i].trackName}</h3>
            `
          newDiv.innerHTML += template;
        }
      });
    });
}
