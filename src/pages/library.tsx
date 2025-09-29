import Navbar from "../components/navbar";
import { useEffect, useMemo, useState } from "react";
import PokemonCard from "../components/card";
import PokemonInfo from "../components/pokemon-info";
import { Search } from "lucide-react";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PageData {
  right: PokemonListItem[];
  left: PokemonListItem[];
}

interface EvolutionPokemon {
  id: number;
  name: string;
  image: string;
  types: { slot: number; type: { name: string } }[];
}

interface PokemonDetails {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: { slot: number; type: { name: string } }[];
  stats: { base_stat: number; stat: { name: string } }[];
  abilities: { is_hidden: boolean; ability: { name: string } }[];
  description?: string;
  image?: string;
  evolutionChain?: EvolutionPokemon[];
}

export default function LibraryPage() {
  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [filteredList, setFilteredList] = useState<PokemonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [isCardOpen, setIsCardOpen] = useState<boolean>(false);
  const [selectedPokemon, setSelectedPokemon] = useState<PokemonDetails | null>(
    null
  );

  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=650") // fetch first-gen
      .then((res) => res.json())
      .then((data) => {
        setPokemonList(data.results);
        setFilteredList(data.results);
      })
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredList(pokemonList);
    } else {
      setFilteredList(
        pokemonList.filter((p) =>
          p.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    } // reset to first page on search
  }, [searchTerm, pokemonList]);

  const fetchPokemonDetails = async (url: string) => {
    const res = await fetch(url);
    const data = await res.json();

    const speciesRes = await fetch(data.species.url);
    const speciesData = await speciesRes.json();
    const flavorText =
      speciesData.flavor_text_entries
        .find((e: any) => e.language.name === "en")
        ?.flavor_text?.replace(/\f|\n|\r/g, " ") || "No description available.";

    const image =
      data.sprites.other["official-artwork"].front_default || // clean official art
      data.sprites.other["dream_world"].front_default || // SVG fallback
      data.sprites.other["home"].front_default || // 3D model
      data.sprites.front_default;

    let evolutionChain: EvolutionPokemon[] = [];
    if (speciesData.evolution_chain?.url) {
      const evolutionRes = await fetch(speciesData.evolution_chain.url);
      const evolutionData = await evolutionRes.json();

      // Get all Pokemon names in the evolution chain
      function getEvolutionNames(chain: any, acc: string[]): string[] {
        acc.push(chain.species.name);
        if (chain.evolves_to && chain.evolves_to.length) {
          chain.evolves_to.forEach((c: any) => getEvolutionNames(c, acc));
        }
        return acc;
      }

      const evolutionNames = getEvolutionNames(evolutionData.chain, []);

      // Fetch detailed data for each Pokemon in the evolution chain
      const evolutionPromises = evolutionNames.map(async (name: string) => {
        try {
          const pokemonRes = await fetch(
            `https://pokeapi.co/api/v2/pokemon/${name}`
          );
          const pokemonData = await pokemonRes.json();

          const evolutionImage =
            pokemonData.sprites.other["official-artwork"].front_default ||
            pokemonData.sprites.other["dream_world"].front_default ||
            pokemonData.sprites.other["home"].front_default ||
            pokemonData.sprites.front_default;

          return {
            id: pokemonData.id,
            name: pokemonData.name,
            image: evolutionImage,
            types: pokemonData.types,
          };
        } catch (error) {
          console.error(`Failed to fetch evolution data for ${name}:`, error);
          return null;
        }
      });

      const evolutionResults = await Promise.all(evolutionPromises);
      evolutionChain = evolutionResults.filter(Boolean) as EvolutionPokemon[];
    }

    console.log("Evolution Chain:", evolutionChain);

    setSelectedPokemon({
      ...data,
      description: flavorText,
      image,
      evolutionChain,
    });
  };

  const [currentPage, setCurrentPage] = useState(1);

  // Build { right, left } pairs
  const pages: PageData[] = useMemo(() => {
    const spreads: PageData[] = [];

    // Each spread = 6 pokémon on the right, 6 pokémon on the left
    for (let i = 0; i < filteredList.length; i += 12) {
      spreads.push({
        left: filteredList.slice(i, i + 6),
        right: filteredList.slice(i + 6, i + 12),
      });
    }

    return spreads;
  }, [filteredList]);

  const totalPages = pages.length;

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  const nextPage = () => {
    if (currentPage < totalPages) setCurrentPage((p) => p + 1);
  };

  return (
    <>
      <main className="relative w-full">
        <Navbar />
        <div className="bg-[url('/image/library-bg.gif')] h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-auto">
          <div className="w-4xl text-center flex flex-col gap-6 justify-center items-center mt-18">
            <h1 className="text-3xl font-revalia text-amber-600 text-shadow-glow">
              Pokémon Library
            </h1>

            <div className="relative w-3/8 justify-self-center mx-auto shadow-lg bg-[#f1e2b2] rounded-lg z-1">
              <input
                type="text"
                placeholder="Search Pokémon..."
                className="w-full h-8 p-1.5 rounded-lg text-black outline-3 outline-amber-700 font-jersey text-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="h-8 absolute right-0 bg-amber-700 text-white px-3 py-1 rounded-r-lg hover:bg-[#914007] transition-colors">
                <Search />
              </button>
            </div>

            {loading && <p>Loading Pokémons…</p>}
          </div>

          {/* Book */}
          <div className="h-full flex justify-center items-center">
            {/* Prev Button */}
            <div className="mx-4">
              <button
                className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md transition-all duration-100"
                disabled={currentPage === 1}
                onClick={prevPage}
              >
                ◀
              </button>
            </div>
            <div className="bg-[url('/image/book.png')] bg-cover bg-center w-215 h-145">
              <div className="w-120 h-143 flex justify-center items-center relative translate-x-107">
                {pages.map((pageData, index) => {
                  const pageNumber = index + 1;

                  const isFlipped =
                    pageNumber <= pages.length
                      ? currentPage >= pageNumber
                      : false;

                  let z;
                  if (pageNumber === currentPage) {
                    z = totalPages;
                  } else if (pageNumber < currentPage) {
                    z = pageNumber;
                  } else {
                    z = totalPages - (pageNumber - currentPage);
                  }

                  return (
                    <div
                      key={pageNumber}
                      className={`pages absolute left-0 top-0 w-full h-full transition-transform duration-1000 ${
                        isFlipped ? "flip" : ""
                      }`}
                      style={{ zIndex: z }}
                    >
                      <div className="page-left w-100 h-full absolute left-0 top-0 text-zinc-900 bg-[#f9e5b7] border-l-7 border-[#e7d7a2] rounded-2xl">
                        <div
                          className={`left-content w-full h-full flex flex-wrap justify-center items-center ${
                            currentPage === pageNumber || totalPages < 13
                              ? "opacity-100 translate-x-0"
                              : "opacity-50 -translate-x-5"
                          } transition-all duration-800`}
                        >
                          {pageData.left.map((pokemon) => (
                            <button
                              key={pokemon.name}
                              onClick={() => {
                                setIsCardOpen(true);
                                fetchPokemonDetails(pokemon.url);
                              }}
                            >
                              <PokemonCard pokemon={pokemon} />
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="page-right w-100 h-full absolute left-0 top-0 text-zinc-900 bg-[#f9e5b7] rounded-2xl">
                        <div
                          className={` w-full h-full flex flex-wrap justify-center items-center ${
                            currentPage === pageNumber || totalPages < 13
                              ? "opacity-100 translate-x-0"
                              : "opacity-50 -translate-x-5"
                          } transition-all duration-800`}
                        >
                          {pageData.right.map((pokemon) => (
                            <button
                              key={pokemon.name}
                              onClick={() => {
                                setIsCardOpen(true);
                                fetchPokemonDetails(pokemon.url);
                              }}
                            >
                              <PokemonCard pokemon={pokemon} />
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            {/* Next Button */}
            <div className="mx-4">
              <button
                className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md"
                disabled={currentPage === totalPages}
                onClick={nextPage}
              >
                ▶
              </button>
            </div>
          </div>

          {/* Pokémon Info Overlay */}
          <div
            className={`bg-zinc-900/50 w-full h-full absolute z-10 ${
              isCardOpen ? "block" : "hidden"
            }`}
          >
            {selectedPokemon && (
              <PokemonInfo
                pokemon={selectedPokemon}
                setIsCardOpen={setIsCardOpen}
                setSelectedPokemon={setSelectedPokemon}
              />
            )}
          </div>
        </div>
      </main>
    </>
  );
}
