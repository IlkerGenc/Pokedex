function onloadFunc() {
  loadPokemonNames();
}

let allPokemon = []; // globale Liste speichern
let currentIndex = 0;

let offset = 0;
const limit = 20;
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

async function loadPokemonNames() {
  const url = `${baseURL}?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();

  allPokemon = allPokemon.concat(data.results); // Liste erweitern

  const container = document.getElementById('main_content');

  data.results.forEach((item, index) => {
    const cardHTML = `
      <div class="pokemon-card" onclick="showOverlay(${offset + index})">
      <div class="pokemon-name">${item.name}</div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function showOverlay(index) {
  currentIndex = index;
  const pokemonName = allPokemon[index].name;
  // const overlay = document.getElementById('pokemon-overlay');
  const nameContainer = document.getElementById('overlay-pokemon-name');
  nameContainer.textContent = pokemonName;


  document.getElementById('left-arrow').style.display = index === 0 ? 'none' : 'inline';
  document.getElementById('right-arrow').style.display = index === allPokemon.length - 1 ? 'none' : 'inline';
  document.getElementById('pokemon-overlay').classList.remove('hidden');
}

function closeOverlay() {
  document.getElementById('pokemon-overlay').classList.add('hidden');
}

function showNextPokemon() {
  if (currentIndex < allPokemon.length - 1) {
    showOverlay(currentIndex + 1);
  }
}

function showPreviousPokemon() {
  if (currentIndex > 0) {
    showOverlay(currentIndex - 1);
  }
}

function loadMorePokemon() {
  offset += limit;
  loadPokemonNames();
}





