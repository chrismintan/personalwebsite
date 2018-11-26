const POKEMONS = ["Bulbasaur","Ivysaur","Venusaur","Charmander","Charmeleon","Charizard","Squirtle","Wartortle","Blastoise","Caterpie","Metapod","Butterfree","Weedle","Kakuna","Beedrill","Pidgey","Pidgeotto","Pidgeot","Rattata","Raticate","Spearow","Fearow","Ekans","Arbok","Pikachu","Raichu","Sandshrew","Sandslash","Nidoran","Nidorina","Nidoqueen","Nidoran","Nidorino","Nidoking","Clefairy","Clefable","Vulpix","Ninetales","Jigglypuff","Wigglytuff","Zubat","Golbat","Oddish","Gloom","Vileplume","Paras","Parasect","Venonat","Venomoth","Diglett","Dugtrio","Meowth","Persian","Psyduck","Golduck","Mankey","Primeape","Growlithe","Arcanine","Poliwag","Poliwhirl","Poliwrath","Abra","Kadabra","Alakazam","Machop","Machoke","Machamp","Bellsprout","Weepinbell","Victreebel","Tentacool","Tentacruel","Geodude","Graveler","Golem","Ponyta","Rapidash","Slowpoke","Slowbro","Magnemite","Magneton","Farfetchd","Doduo","Dodrio","Seel","Dewgong","Grimer","Muk","Shellder","Cloyster","Gastly","Haunter","Gengar","Onix","Drowzee","Hypno","Krabby","Kingler","Voltorb","Electrode","Exeggcute","Exeggutor","Cubone","Marowak","Hitmonlee","Hitmonchan","Lickitung","Koffing","Weezing","Rhyhorn","Rhydon","Chansey","Tangela","Kangaskhan","Horsea","Seadra","Goldeen","Seaking","Staryu","Starmie","Mr Mime","Scyther","Jynx","Electabuzz","Magmar","Pinsir","Tauros","Magikarp","Gyarados","Lapras","Ditto","Eevee","Vaporeon","Jolteon","Flareon","Porygon","Omanyte","Omastar","Kabuto","Kabutops","Aerodactyl","Snorlax","Articuno","Zapdos","Moltres","Dratini","Dragonair","Dragonite","Mewtwo","Mew"];

var order = [];

const input = $("#project1-input");

// Shuffle array
function shuffle() {
  let oneTo151 = [];
  for ( let i = 1; i < 152; i++ ) {
    oneTo151.push(i);
  }
  for ( let i = 150; i > -1; i-- ) {
    rNum = Math.floor(Math.random()*i);
    order.push(oneTo151[rNum]);
    oneTo151.splice(rNum,1);
  }
};

shuffle();

function initShadow() {
  let interval = setInterval(function(){
    drawShadow();
  }, 5)
  setTimeout(function(){
    clearInterval(interval)
  }, 2000)
}

function drawShadow() {
  clearCanvas();
  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  shownImage = new Image();
  shownImage.src = `img/projects/sprites/${order[0]}.png`;
  shownImage.setAttribute("crossorigin", "Anonymous");

  ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
  var baseImage = ctx.getImageData(0, 0, canvas.width, canvas.height);
  for ( let i = 0; i < baseImage.data.length; i+=4 ) {
    if( baseImage.data[i] >= 1 || baseImage.data[i+1] >= 1 || baseImage.data[i+2] >= 1)  {
      baseImage.data[i] = 0;
      baseImage.data[i+1] = 0;
      baseImage.data[i+2] = 0;
    };
  }
  ctx.putImageData( baseImage, 0, 0 );
}

function revealPokemon() {
  var canvas = document.getElementById("myCanvas");
  ctx = canvas.getContext("2d");
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  shownImage = new Image();
  shownImage.src = `img/projects/sprites/${order[0]}.png`;
  ctx.drawImage(shownImage, 0, 0, canvas.width, canvas.height);
}

function clearCanvas() {
  var canvas = document.getElementById("myCanvas");
  var ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function nameCheck() {
  let input = $("#project1-input").val().toLowerCase();
  if ( input == POKEMONS[order[0] - 1].toLowerCase() ) {
    revealPokemon();
    order = order.slice(1);
    setTimeout(function() {
      clearCanvas();
      initShadow();
      $("#project1-input").val("");
    }, 1000)
  }
}

function skipPokemon() {
  $("#project1-input").val(POKEMONS[order[0] - 1]);
  nameCheck();
}

$("#project1-tryme").click(function() {
    initShadow()
  }
);

$("#project1-skip").click(skipPokemon)

