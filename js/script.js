// Data

// Declaraties

// ----- Het speelveld

var main = document.querySelector("main");

var spelerEen = document.querySelector("#spelereen");
var spelerTwee = document.querySelector("#spelertwee");
var speelveldEen = document.querySelector("#speelveldeen");
var speelveldTwee = document.querySelector("#speelveldtwee");

var aantalPogingenSpelerEen = document.querySelector(
  "#aantalpogingenspelereen"
);
var aantalPogingenSpelerTwee = document.querySelector(
  "#aantalpogingenspelertwee"
);

// ----- Geluiden effecten

var boemGeluid = document.querySelector("#boemgeluid");
var plonsGeluid = document.querySelector("#plonsgeluid");
var extraPogingGeluid = document.querySelector("#extrapoginggeluid");

// ----- Pogingen

var pogingenEen = 10;
var pogingenTwee = 10;

// Toestand

// ----- Creeëren van het speelveld

for (let i = 0; i < 25; i++) {
  var button = document.createElement("button");
  button.className = "targetGebiedEen";
  speelveldEen.appendChild(button);
  // Bron, creeëren van het element en toevoegen: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
}

for (let j = 0; j < 25; j++) {
  var button = document.createElement("button");
  button.className = "targetGebiedTwee";
  speelveldTwee.appendChild(button);
}

// ----- Het schip plaatsen

var knoppenEen = document.querySelectorAll("button.targetGebiedEen");
var knoppenTwee = document.querySelectorAll("button.targetGebiedTwee");

var min = 0;
var max = knoppenEen.length - 1;
var max = knoppenTwee.length - 1;

var getalSchipEen = Math.floor(Math.random() * (max - min + 1)) + min;
knoppenEen[getalSchipEen].classList.add("schip");
console.log("Schip speler twee " + [getalSchipEen + 1]);

var getalSchipTwee = Math.floor(Math.random() * (max - min + 1)) + min;
knoppenTwee[getalSchipTwee].classList.add("schip");
console.log("Schip speler een " + [getalSchipTwee + 1]);

// ----- De extra pogingen plaatsen

var getalPogingEen = Math.floor(Math.random() * (max - min + 1)) + min;
knoppenEen[getalPogingEen].classList.add("extrapoging");
console.log("Extra poging speler een " + [getalPogingEen + 1]);

var getalPogingTwee = Math.floor(Math.random() * (max - min + 1)) + min;
knoppenTwee[getalPogingTwee].classList.add("extrapoging");
console.log("Extra poging speler twee " + [getalPogingTwee + 1]);

// Eventhandlers

// ----- Checken voor raak en mis

function checkenEen(event) {
  var knopEen = event.target;
  // Bron, herkennen van een click op iedere button (speler één):https://developer.mozilla.org/en-US/docs/Web/API/Event/target en van jou!
  // var deknop = this;
  if (knopEen.classList.contains("schip")) {
    // Bron, checken of een element een bepaalde class heeft: https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON
    geluidUit();
    knopEen.classList.add("boem");
    boemGeluid.play();
    aantalPogingenSpelerEen.textContent =
      "Je hebt het schip vernietigd! Met nog " +
      pogingenEen +
      " pogingen te gaan. De pagina wordt automatisch herstart na 4 seconden.";
    spelerEen.classList.add("stoppen");
    herladen();
  } else if (knopEen.classList.contains("extrapoging")) {
    geluidUit();
    knopEen.classList.add("extra");
    extraPogingGeluid.play();
    pogingenEen += 4;
    aantalPogingenSpelerEen.textContent = "Pogingen: " + pogingenEen;
    displayNone();
  } else if (pogingenEen == 0) {
    aantalPogingenSpelerEen.textContent =
      "Je hebt geen pogingen meer! Speler twee wint. Een nieuw potje wordt gestart in 4 seconden.";
    spelerEen.classList.add("stoppen");
    herladen();
  } else {
    geluidUit();
    knopEen.classList.add("plons");
    plonsGeluid.play();
    pogingenEen--;
    aantalPogingenSpelerEen.textContent = "Pogingen: " + pogingenEen;
    displayNone();
  }
}

function checkenTwee(event) {
  var knopTwee = event.target;
  // var deknop = this;
  if (knopTwee.classList.contains("schip")) {
    geluidUit();
    knopTwee.classList.add("boem");
    boemGeluid.play();
    aantalPogingenSpelerTwee.textContent =
      "Je hebt het schip vernietigd! Met nog " +
      pogingenTwee +
      " pogingen te gaan. De pagina wordt automatisch herstart na 4 seconden.";
    spelerEen.classList.add("stoppen");
    herladen();
  } else if (knopTwee.classList.contains("extrapoging")) {
    geluidUit();
    knopTwee.classList.add("extra");
    extraPogingGeluid.play();
    pogingenTwee += 4;
    aantalPogingenSpelerTwee.textContent = "Pogingen: " + pogingenTwee;
    displayNone();
  } else if (pogingenTwee == 0) {
    aantalPogingenSpelerTwee.textContent =
      "Je hebt geen pogingen meer! Speler één wint. Een nieuw potje wordt gestart in 4 seconden.";
    spelerTwee.classList.add("stoppen");
    herladen();
  } else {
    geluidUit();
    knopTwee.classList.add("plons");
    plonsGeluid.play();
    pogingenTwee--;
    aantalPogingenSpelerTwee.textContent = "Pogingen: " + pogingenTwee;
    displayNone();
  }
}

// ----- Oude geluiden uitzetten

function geluidUit() {
  boemGeluid.pause();
  plonsGeluid.pause();
  extraPogingGeluid.pause();
  boemGeluid.currentTime = 0;
  plonsGeluid.currentTime = 0;
  extraPogingGeluid.currentTime = 0;
}

// ----- Naar andere spelerscherm gaan

function displayNone() {
  spelerEen.classList.toggle("displaynoneeen");
  spelerTwee.classList.toggle("displaynonetwee");
}

// ----- Pagina herladen wanneer het spel is afgelopen

function herladen() {
  window.setTimeout(function() {
    // Bron, timer: https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
    location.reload();
    // Bron, pagina herladen: https://developer.mozilla.org/en-US/docs/Web/API/Location/reload
  }, 4000);
}

// ----- Geheime extra pogingen

function extraPogingenEen() {
  pogingenEen++;
  aantalPogingenSpelerEen.textContent = "Pogingen: " + pogingenEen;
}

function extraPogingenTwee() {
  pogingenTwee++;
  aantalPogingenSpelerTwee.textContent = "Pogingen: " + pogingenTwee;
}

// EventListeners

// ----- Alle knoppen klikbaar maken

for (k = 0; k < knoppenEen.length; k++) {
  knoppenEen[k].addEventListener("click", checkenEen);
}
for (l = 0; l < knoppenTwee.length; l++) {
  knoppenTwee[l].addEventListener("click", checkenTwee);
}

// ----- Pijltjes toetsen uitlezen

document.addEventListener("keydown", function() {
  if (event.keyCode == 39) {
    // Bron, uitlezen van bepaalde toets: https://developer.mozilla.org/en-US/docs/Web/API/Document/keydown_event
    extraPogingenEen();
  } else if (event.keyCode == 37) {
    extraPogingenTwee();
  }
});
