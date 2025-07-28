function onloadFunc() {
  loadPokemonNames();
}

let offset = 0;
const limit = 20;
const baseURL = 'https://pokeapi.co/api/v2/pokemon';

async function loadPokemonNames() {
  const url = `${baseURL}?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();

  const container = document.getElementById('main_content');

  data.results.forEach(item => {
    const cardHTML = `
      <div class="pokemon-card" onclick="showOverlay('${item.name}')">
      <div class="pokemon-name">${item.name}</div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

function showOverlay(pokemonName) {
  const overlay = document.getElementById('pokemon-overlay');
  const nameContainer = document.getElementById('overlay-pokemon-name');
  nameContainer.textContent = pokemonName;
  overlay.classList.remove('hidden');
}

function closeOverlay() {
  document.getElementById('pokemon-overlay').classList.add('hidden');
}

function loadMorePokemon() {
  offset += limit;
  loadPokemonNames();
}





