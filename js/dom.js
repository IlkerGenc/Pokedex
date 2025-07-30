import { typeColors } from './colors.js';
import { capitalize } from './utils.js';
import { allPokemon } from './state.js';
import { showOverlay } from './overlay.js';


export function renderPokemonCards(pokemonList = allPokemon) {
  const container = document.getElementById('main_content');
  if (!container) {
    console.error('❌ #main_content wurde nicht im DOM gefunden!');
  }

  container.innerHTML = '';

  pokemonList.forEach((pokemon, index) => {
    const id = String(pokemon.id).padStart(3, '0');
    const name = capitalize(pokemon.name);
    const image = pokemon.sprites.other['official-artwork'].front_default;

    const typesHtml = pokemon.types
      .map(t => `<span class="ability-box">${t.type.name}</span>`) // Jede Type in eigenem span
      .join(''); // Ohne Komma, direkt hintereinander, CSS sorgt für Abstand

    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    const primaryType = pokemon.types[0].type.name;
    card.style.backgroundColor = typeColors[primaryType] || '#f8f8f8';

    card.innerHTML = `
      <div class="pokemon-id">#${id}</div>
      <div class="pokemon-name">${name}</div>
      <div class="pokemon-img"><img src="${image}" alt="${name}" width="120"></div>
      <div class="pokemon-types">${typesHtml}</div>
    `;

    card.addEventListener('click', () => showOverlay(index));

    container.appendChild(card);
  });
}
