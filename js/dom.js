import { capitalize } from './utils.js';
import { allPokemon } from './state.js';
import { showOverlay } from './overlay.js';

export function renderPokemonCards(pokemonList = allPokemon) {
  const container = document.getElementById('main_content');
  container.innerHTML = '';

  pokemonList.forEach((pokemon, index) => {
    const id = String(pokemon.id).padStart(3, '0');
    const name = capitalize(pokemon.name);
    const image = pokemon.sprites.other['official-artwork'].front_default;
    const types = pokemon.types.map(t => t.type.name).join(', ');

    const card = document.createElement('div');
    card.classList.add('pokemon-card');

    // Setze die Inhalte der Card
    card.innerHTML = `
      <div class="pokemon-id">#${id}</div>
      <div class="pokemon-name">${name}</div>
      <div class="pokemon-img"><img src="${image}" alt="${name}" width="120"></div>
      <div class="pokemon-types">${types}</div>
    `;

    // Füge den Click-Eventlistener hinzu
    card.addEventListener('click', () => showOverlay(index));

    container.appendChild(card);
  });
}
