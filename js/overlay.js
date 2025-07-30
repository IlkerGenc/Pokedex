import { allPokemon, currentIndex, setCurrentIndex } from './state.js';
import { capitalize } from './utils.js';
import { typeColors } from './colors.js'; // <--- anpassen, falls dein Pfad anders ist

export async function showOverlay(index) {

  const pokemon = allPokemon[index];
  const primaryType = pokemon.types[0].type.name;
  const overlay = document.getElementById('pokemon-overlay');
  const overlayContent = overlay.querySelector('.overlay-content');

  // Hintergrundfarbe wie bei der Card
  overlayContent.style.backgroundColor = typeColors[primaryType] || '#f8f8f8';

  // Pokéball-Hintergrund setzen
  overlayContent.style.color = "white";
  const darkTypes = ['dark', 'ghost', 'poison', 'dragon'];
  overlayContent.style.color = darkTypes.includes(primaryType) ? 'white' : 'black';

  setCurrentIndex(index);
  document.getElementById('overlay-pokemon-name').textContent = `#${pokemon.id.toString().padStart(3, '0')}`;

  const detailsContainer = document.getElementById('overlay-details');
  detailsContainer.innerHTML = renderDetails(pokemon);

  // Pfeile nachträglich ansprechen, weil sie jetzt im DOM sind
  document.getElementById('left-arrow').disabled = index === 0;
  document.getElementById('right-arrow').disabled = index === allPokemon.length - 1;

  // Event Listener setzen
  document.getElementById('pokemon-overlay').classList.remove('hidden');
}

export function closeOverlay() {
  document.getElementById('pokemon-overlay').classList.add('hidden');
}

export function showNextPokemon() {
  if (currentIndex < allPokemon.length - 1) showOverlay(currentIndex + 1);
}

export function showPreviousPokemon() {
  if (currentIndex > 0) showOverlay(currentIndex - 1);
}

function renderDetails(pokemon) {
  const stats = pokemon.stats.map(stat =>
    `<li><strong>${stat.stat.name}:</strong> ${stat.base_stat}</li>`).join('');

  return `
    <div class="overlay-upper">
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" width="auto">
    </div>
    <div class="overlay-lower">
      <h2 class="pokemon-name-lower">${capitalize(pokemon.name)}</h2>
      <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>

     <div class="abilities-wrapper">
    <span class="abilities-label">Abilities:</span>
    <div class="abilities">
      ${pokemon.abilities.map(a => `<span class="ability-box-overlay">${a.ability.name}</span>`).join('')}
    </div>
    </div>
      <p><strong>Stats:</strong></p>
      <ul>${stats}</ul>

       <div class="arrow-controls">
        <button id="left-arrow" class="arrow-button">←</button>
        <button id="right-arrow" class="arrow-button">→</button>
      </div>
    </div>
  `;
}




const overlay = document.getElementById('pokemon-overlay');
const closeBtn = document.getElementById('close-overlay');

closeBtn.addEventListener('click', () => {
  closeOverlay();
});

overlay.addEventListener('click', (event) => {
  if (event.target === overlay) {
    closeOverlay();
  }
});
