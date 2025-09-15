import { useState } from "react";

interface PokemonDetails {
  id: number;
  name: string;
  sprites: { front_default: string | null };
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { ability: { name: string } }[];
  species: { url: string };
  description?: string;
}

function PokemonInfo({ pokemon }: { pokemon: PokemonDetails }) {
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );

  const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const flavorText =
      speciesData.flavor_text_entries
        .find((e: any) => e.language.name === "en")
        ?.flavor_text?.replace(/\f|\n|\r/g, " ") || "No description available.";

    setSelectedPokemon({ ...data, description: flavorText });
  };

  return (
    <div>
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <p>{pokemon.description}</p>
      <h3>Stats</h3>
      <ul>
        {pokemon.stats.map((stat) => (
          <li key={stat.stat.name}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h3>Abilities</h3>
      <ul>
        {pokemon.abilities.map((ability) => (
          <li key={ability.ability.name}>{ability.ability.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default PokemonInfo;
