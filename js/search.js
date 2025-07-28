import { allPokemon } from './state.js';
import { renderPokemonCards } from './dom.js';

export function handleSearch(input) {
  const hint = document.getElementById('search-hint');
  input = input.trim().toLowerCase();

  if (input === '') {
    hint.classList.add('hidden');
    renderPokemonCards();
    return;
  }

  if (input.length < 3) {
    hint.classList.remove('hidden');
    return;
  }

  hint.classList.add('hidden');

  const filtered = allPokemon.filter(p =>
    p.name.toLowerCase().includes(input)
  );

  renderPokemonCards(filtered);
}
