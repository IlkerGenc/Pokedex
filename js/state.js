export let allPokemon = [];
export let currentIndex = 0;

export function addPokemonBatch(batch) {
  allPokemon = allPokemon.concat(batch);
}

export function resetAllPokemon() {
  allPokemon = [];
}

export function setCurrentIndex(index) {
  currentIndex = index;
}