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

  // allPokemon = allPokemon.concat(data.results); // Liste erweitern

  const container = document.getElementById('main_content');

  const pokemonDataList = await Promise.all(
    data.results.map(async (item) => {
      const res = await fetch(item.url); // Direkt-Link zur Detail-API
      return await res.json();
    })
  );

  allPokemon = allPokemon.concat(pokemonDataList); // vollständige Objekte speichern

  pokemonDataList.forEach((pokemon, index) => {
    const id = String(pokemon.id).padStart(3, '0');
    const name = capitalize(pokemon.name);
    const imageUrl = pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types.map(t => t.type.name).join(', ');
    
const cardHTML = `
      <div class="pokemon-card" onclick="showOverlay(${offset + index})">
        <div class="pokemon-id">#${id}</div>
        <div class="pokemon-name">${name}</div>
        <div class="pokemon-img"><img src="${imageUrl}" alt="${name}" width="120"></div>
        <div class="pokemon-types">${types}</div>
      </div>
    `;
    container.innerHTML += cardHTML;
  });
}

async function showOverlay(index) {
  console.log(index, typeof index);
  currentIndex = index;
  const pokemonName = allPokemon[index].name;

  const nameContainer = document.getElementById('overlay-pokemon-name');
  nameContainer.textContent = pokemonName;


  document.getElementById('left-arrow').style.display = index === 0 ? 'none' : 'inline';
  document.getElementById('right-arrow').style.display = index === allPokemon.length - 1 ? 'none' : 'inline';

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
  const data = await response.json();

  // 🎯 NEU: HTML für Bild & Details erzeugen
  const detailsContainer = document.getElementById('overlay-details');
  detailsContainer.innerHTML = renderPokemonDetails(data); // nutzt separate Funktion

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

function renderPokemonDetails(data) {
  const types = data.types.map(t => t.type.name).join(', ');
  const abilities = data.abilities.map(a => a.ability.name).join(', ');
  const statsHTML = data.stats.map(stat =>
    `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`
  ).join('');

  return `
    <div class="overlay-details-content">
      <img src="${data.sprites.other['official-artwork'].front_default}" alt="${data.name}" width="120">
      <p><strong>ID:</strong> ${data.id}</p>
      <p><strong>Type:</strong> ${types}</p>
      <p><strong>Height:</strong> ${data.height / 10} m</p>
      <p><strong>Weight:</strong> ${data.weight / 10} kg</p>
      <p><strong>Abilities:</strong> ${abilities}</p>
      <p><strong>Stats:</strong></p>
      <ul>${statsHTML}</ul>
    </div>
  `;
}

function capitalize(str) {
 return str.charAt(0).toUpperCase() + str.slice(1);
}




