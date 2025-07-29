import { allPokemon, currentIndex, setCurrentIndex } from './state.js';
import { capitalize } from './utils.js';

export async function showOverlay(index) {
  setCurrentIndex(index);
  const pokemon = allPokemon[index];
  document.getElementById('overlay-pokemon-name').textContent = capitalize(pokemon.name);

  document.getElementById('left-arrow').style.display = index === 0 ? 'none' : 'inline';
  document.getElementById('right-arrow').style.display = index === allPokemon.length - 1 ? 'none' : 'inline';

  const detailsContainer = document.getElementById('overlay-details');
  detailsContainer.innerHTML = renderDetails(pokemon);

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
    <div class="overlay-details-content">
      <img src="${pokemon.sprites.other['official-artwork'].front_default}" alt="${pokemon.name}" width="120">
      <p><strong>ID:</strong> ${pokemon.id}</p>
      <p><strong>Type:</strong> ${pokemon.types.map(t => t.type.name).join(', ')}</p>
      <p><strong>Height:</strong> ${pokemon.height / 10} m</p>
      <p><strong>Weight:</strong> ${pokemon.weight / 10} kg</p>
      <p><strong>Abilities:</strong> ${pokemon.abilities.map(a => a.ability.name).join(', ')}</p>
      <p><strong>Stats:</strong></p>
      <ul>${stats}</ul>
    </div>`;
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
