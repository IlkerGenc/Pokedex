const baseURL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonBatch(offset, limit) {
  const url = `${baseURL}?limit=${limit}&offset=${offset}`;
  const response = await fetch(url);
  const data = await response.json();

  const detailedData = await Promise.all(
    data.results.map(item => fetch(item.url).then(res => res.json()))
  );

  return detailedData;
}

export async function fetchPokemonByName(name) {
  const response = await fetch(`${baseURL}/${name.toLowerCase()}`);
  if (!response.ok) throw new Error('Not found');
  return await response.json();
}