const search = document.getElementById("search");
const player = document.getElementById("player");
const searchBtn = document.getElementById("search-btn");
const audio = document.getElementById("audio");
const audioSource = document.getElementById("audioSource");
const progressBar = document.getElementById("progress-bar");
const forwardBtn = document.getElementById("forwardBtn");
const backwardBtn = document.getElementById("backwardBtn");
const table = document.querySelector(".table");
const counter = document.getElementById("counter");
searchBtn.addEventListener("click", searchTrack);
///new
const durationInput = document.querySelector("#duration");
const startButton = document.querySelector("#start");
const pauseButton = document.querySelector("#pause");
const circle = document.querySelector("circle");
const play = document.querySelector(".play");
//number for index of data
let number = 0;
let artistOne = "Drake";
forwardBtn.addEventListener("click", function () {
  if (number >= 0 && number < 20) {
    number += 1;
    if (artistOne === "Drake") {
      intialRender();
    } else {
      searchTrack();
    }
  } else {
    number = 0;
  }
});

backwardBtn.addEventListener("click", function () {
  if (number > 0 && number <= 20) {
    number -= 1;
    if (artistOne === "Drake") {
      intialRender();
    } else {
      searchTrack();
    }
  } else {
    number = 0;
  }
});

window.onload = intialRender();

function intialRender() {
  console.log(artistOne);
  const apiCall = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: `${artistOne}` },
    headers: {
      "x-rapidapi-key": "cb5b1f2f44msh3ccf1d2e09978fap1363abjsn0c69cbf92586",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  axios
    .request(apiCall)
    .then(function (response) {
      let tracksOne = response.data.data;

      console.log(tracksOne);
      audio.setAttribute("src", `${tracksOne[number].preview}`);
      let outputOne = ` <h1 class="tracks tracks-main">${tracksOne[number].title}</h1>
             <h2 class="tracks tracks-sub">${tracksOne[number].artist.name}</h2>
                <div class="uk-inline-clip uk-transition-toggle uk-light" tabindex="0">
             <img id="ablum-cover" class="uk-border-rounded uk-margin-large-top uk-margin-large-bottom" data-src="${tracksOne[number].album.cover_medium}" width="auto" height="100%"  uk-img>
             
                <div class="uk-position-center">
                <div class="uk-transition-slide-top-small"><h4 class="uk-margin-remove">${tracksOne[number].album.title}</h4></div>
                <div class="uk-transition-slide-bottom-small"><h4 class="uk-margin-remove">Album</h4></div>
            </div>
            </div>
             `;
      let outputTableOne = "";

      tracksOne.map((track, i) => {
        outputTableOne += `
          <tr>
            <td>${tracksOne[i].artist.name}</td>
            <td>${tracksOne[i].title}</td>
             <td><img class="uk-preserve-width uk-border-circle" src=${tracksOne[i].album.cover_small} width="50" alt=""></td>
            <td><button class="uk-button uk-button-default" type="button"><a href=${tracksOne[i].link}>Source</a></button></td>
        </tr>
         `;
      });

      table.innerHTML = outputTableOne;
      play.innerHTML = outputOne;
    })
    .catch(function (error) {
      console.error(error);
    });
}

/// Run API call after a search
function searchTrack(e) {
  artistOne = "";
  let artist = search.value;
  console.log(artist);
  const apiCall = {
    method: "GET",
    url: "https://deezerdevs-deezer.p.rapidapi.com/search",
    params: { q: `${artist}` },
    headers: {
      "x-rapidapi-key": "cb5b1f2f44msh3ccf1d2e09978fap1363abjsn0c69cbf92586",
      "x-rapidapi-host": "deezerdevs-deezer.p.rapidapi.com",
    },
  };
  axios
    .request(apiCall)
    .then(function (response) {
      let tracks = response.data.data;

      console.log(tracks);
      audio.setAttribute("src", `${tracks[number].preview}`);
      let output = ` <h1 class="tracks tracks-main">${tracks[number].title}</h1>
             <h2 class="tracks tracks-sub">${tracks[number].artist.name}</h2>
                <div class="uk-inline-clip uk-transition-toggle uk-light" tabindex="0">
             <img id="album-cover" class="uk-border-rounded uk-margin-large-top uk-margin-large-bottom" data-src="${tracks[number].album.cover_medium}" width="auto" height="100%"  uk-img>
             
                <div class="uk-position-center">
                <div class="uk-transition-slide-top-small"><h4 class="uk-margin-remove">${tracks[number].album.title}</h4></div>
                <div class="uk-transition-slide-bottom-small"><h4 class="uk-margin-remove">Album</h4></div>
            </div>
            </div>
             `;
      let outputTable = "";

      tracks.map((track, i) => {
        outputTable += `
          <tr>
            <td>${tracks[i].artist.name}</td>
            <td>${tracks[i].title}</td>
             <td><img class="uk-preserve-width uk-border-circle" src=${tracks[i].album.cover_small} width="50" alt=""></td>
            <td><button class="uk-button uk-button-default" type="button"><a href=${tracks[i].link}>Source</a></button></td>
        </tr>
         `;
      });

      table.innerHTML = outputTable;
      play.innerHTML = output;
    })
    .catch(function (error) {
      console.error(error);
    });
  e.preventDefault();
}

// Media Query for SVG Element
const radius = document.getElementsByTagName("circle")[0];
let circa = window.matchMedia("(max-width: 400px)");
function myFunction(circa) {
  if (circa.matches) {
    radius.setAttribute("r", 138);
    radius.setAttribute("cy", 160);
  } else {
    console.log("we good");
  }
}

myFunction(circa); // Call listener function at run time
circa.addEventListener(circa, myFunction);

//Control Audio Volume
window.SetVolume = function (val) {
  let song = document.getElementById("audio");
  console.log("Before: " + song.volume);
  song.volume = val / 100;
  console.log("After: " + song.volume);
};

////SVG and Time Variables
const FULL_DASH_ARRAY = 283;
const RESET_DASH_ARRAY = `-57 ${FULL_DASH_ARRAY}`;
let timer = document.querySelector("#base-timer-path-remaining");
const TIME_LIMIT = 30;
let timePassed = -1;
let timeLeft = TIME_LIMIT;
let timerInterval = null;

function reset() {
  clearInterval(timerInterval);
  resetVars();
  timer.setAttribute("stroke-dasharray", RESET_DASH_ARRAY);
}

startButton.addEventListener("click", function start(withReset = false) {
  if (withReset) {
    resetVars();
  }
  audio.play();
  startTimer();
});

function startTimer() {
  timerInterval = setInterval(() => {
    timePassed = timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    setCircleDasharray();

    if (timeLeft === 0) {
      timeIsUp();
    }
  }, 1000);
}

pauseButton.addEventListener("click", function stop() {
  audio.pause();
  clearInterval(timerInterval);
});

///Time functions
function timeIsUp() {
  clearInterval(timerInterval);
  reset();
}

function resetVars() {
  timePassed = -1;
  timeLeft = TIME_LIMIT;
  console.log(timePassed, timeLeft);
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  console.log("setCircleDashArray: ", circleDasharray);
  timer.setAttribute("stroke-dasharray", circleDasharray);
}
