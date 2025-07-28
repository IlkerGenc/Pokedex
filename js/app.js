// app.js
import { fetchPokemonBatch } from './api.js';
import { addPokemonBatch } from './state.js';
import { renderPokemonCards } from './dom.js';
import { handleSearch } from './search.js';
import { showOverlay, closeOverlay, showNextPokemon, showPreviousPokemon } from './overlay.js';

let offset = 0;
const limit = 20;

window.onload = async () => {
  // 1. Initiale Pokémon laden und anzeigen
  const pokemonBatch = await fetchPokemonBatch(offset, limit);
  addPokemonBatch(pokemonBatch);
  renderPokemonCards();

  // 2. Eventlistener für Suche
  document.getElementById('search-input').addEventListener('input', (e) => {
    handleSearch(e.target.value);
  });

  // 3. Zurücksetzen-Button
  document.getElementById('reset-button').addEventListener('click', () => {
    document.getElementById('search-input').value = '';
    handleSearch('');
    document.getElementById('reset-button').classList.add('hidden');
  });

  // 4. Mehr laden
  document.getElementById('load-more').addEventListener('click', async () => {
    offset += limit;
    const nextBatch = await fetchPokemonBatch(offset, limit);
    addPokemonBatch(nextBatch);
    renderPokemonCards();
  });

  // 5. Overlay-Buttons
  document.getElementById('left-arrow').addEventListener('click', showPreviousPokemon);
  document.getElementById('right-arrow').addEventListener('click', showNextPokemon);
  document.getElementById('close-overlay').addEventListener('click', closeOverlay);
};

// Optional: Globale Funktion für die onclick im Card-HTML
// Das brauchst du, weil `onclick="showOverlay(x)"` in deinem `dom.js` generiert wird
window.showOverlay = showOverlay;
