const baseURL = 'https://pokeapi.co/api/v2/pokemon';

export async function fetchPokemonBatch(offset, limit) {
  const url = `${baseURL}?limit=${limit}&offset=${offset}`;
  console.log('API Request an URL:', url);


  const response = await fetch(url);
  console.log('Response Status:', response.status);

  if (!response.ok) {
    throw new Error(`Fehler beim Abrufen der Pokémon-Liste: ${response.status}`);
  }

  const data = await response.json();
  console.log('Erste Antwort geladen, Anzahl Pokémon:', data.results.length);

  console.log('Details abrufen für Pokémon:', data.results.map(p => p.name));
  const detailedData = await Promise.all(
    data.results.map(async (item) => {
      try {
        const res = await fetch(item.url);
        if (!res.ok) {
          console.warn(`❗️Fehler beim Abrufen von ${item.name}: ${res.status}`);
          return null; // oder ersatzwert
        }
        const detail = await res.json();
        console.log(`✅ Detail geladen: ${item.name}`);
        return detail;
      } catch (err) {
        console.error(`❌ Fehler bei Fetch von ${item.name}:`, err);
        return null;
      }
    })
  );

  // Ungültige Ergebnisse (null) rausfiltern
  return detailedData.filter(p => p !== null);
}