console.log('🚀 app.js geladen');

const overlay = document.getElementById('loading-overlay');
console.log('🟡 overlay sichtbar?', getComputedStyle(overlay).display !== 'none');
console.log('🔍 z-index:', getComputedStyle(overlay).zIndex);

// app.js
import { fetchPokemonBatch } from './api.js';
import { addPokemonBatch } from './state.js';
import { renderPokemonCards } from './dom.js';
import { handleSearch } from './search.js';
import { showOverlay, closeOverlay, showNextPokemon, showPreviousPokemon } from './overlay.js';

let offset = 0;
const limit = 20;

window.onload = async () => {
  const loadingOverlay = document.getElementById('loading-overlay');
  loadingOverlay.classList.remove('hidden');  // Overlay anzeigen
  console.log('Loading Overlay shown');

  try {
    const pokemonBatch = await fetchPokemonBatch(offset, limit);
    addPokemonBatch(pokemonBatch);
    renderPokemonCards();
  } catch (error) {
    console.error('Fehler beim initialen Laden:', error);
    // Optional: Zeige Fehlermeldung im UI
  } finally {
    loadingOverlay.classList.add('hidden');
    console.log('Loading Overlay hidden');
  }


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

  document.getElementById('load-more').addEventListener('click', async () => {
    const button = document.getElementById('load-more');
    const label = button.querySelector('.label');
    const spinner = button.querySelector('.spinner');
    const loadingOverlay = document.getElementById('loading-overlay');

    // Overlay anzeigen + Button deaktivieren
    console.log('➡️ Lade neue Pokémon…');
    loadingOverlay.classList.remove('hidden');
    button.disabled = true;
    spinner.style.display = 'inline-block';

    try {
      offset += limit;
      console.log('📦 Hole Batch mit Offset:', offset);
      const nextBatch = await fetchPokemonBatch(offset, limit);
      console.log('✅ Batch geladen:', nextBatch);

      addPokemonBatch(nextBatch);
      renderPokemonCards();
    } catch (error) {
      console.error('Fehler beim Nachladen der Pokémon:', error);
    } finally {
      // Overlay wieder ausblenden + Button reaktivieren
      console.log('🔚 Ladevorgang abgeschlossen – Overlay ausblenden');
      console.log('⬅️ Versuche, Overlay zu verstecken');
      loadingOverlay.classList.add('hidden');
      console.log('✅ class="hidden" hinzugefügt');
      button.disabled = false;
      spinner.style.display = 'none';
    }
  });

  // 5. Overlay-Buttons
    const overlay = document.getElementById('pokemon-overlay');
  overlay.addEventListener('click', (event) => {
    if (event.target.id === 'left-arrow') {
      showPreviousPokemon();
    } else if (event.target.id === 'right-arrow') {
      showNextPokemon();
    } else if (event.target.id === 'close-overlay') {
      closeOverlay();
    }
});
}

// Optional: Globale Funktion für die onclick im Card-HTML
// Das brauchst du, weil `onclick="showOverlay(x)"` in deinem `dom.js` generiert wird
window.showOverlay = showOverlay;
