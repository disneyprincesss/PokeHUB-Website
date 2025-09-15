import PokemonCard from "../components/card";
import Navbar from "../components/navbar";
import { useEffect, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

export default function LibraryPage() {
  const ITEMS_PER_PAGE = 6;

  const [pokemonList, setPokemonList] = useState<PokemonListItem[]>([]);
  const [filteredList, setFilteredList] = useState<PokemonListItem[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  const [loading, setLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    setLoading(true);
    fetch("https://pokeapi.co/api/v2/pokemon?limit=151") // fetch first-gen
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
    }
    setCurrentPage(1); // reset to first page on search
  }, [searchTerm, pokemonList]);

  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <>
      <main className="relative w-full h-full">
        <Navbar />
        <div className="bg-[url('/image/library-bg.gif')] h-screen bg-cover bg-center flex items-center justify-center text-zinc-200">
          <div className="w-4xl h-11/12 bg-[url('/image/map.png')] bg-cover bg-center text-center p-20 flex flex-col gap-6">
            <h1 className="text-3xl font-revalia text-amber-700">
              Pokémon Library
            </h1>

            <div className="relative w-3/8 justify-self-center mx-auto shadow-lg">
              <input
                type="text"
                placeholder="Search Pokémon..."
                className="w-full h-8 p-1.5 rounded-lg text-black outline-2 outline-amber-700 font-jersey text-2xl"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />

              <button className="h-8 absolute right-0 bg-amber-700 text-white px-3 py-1 rounded-r-lg hover:bg-[#914007] transition-colors">
                <img
                  src="/image/search-icon.png"
                  alt="Search"
                  className="w-6"
                />
              </button>
            </div>

            {loading && <p>Loading Pokémons…</p>}

            <div className="text-3xl h-11/12 flex flex-wrap gap-12 px-6 py-2 justify-center relative">
              {currentItems.map((pokemon) => (
                <PokemonCard key={pokemon.name} pokemon={pokemon} />
              ))}

              <button
                className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md absolute left-7 top-1/3 hover:translate-y-0.5 transition-all duration-100"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => p - 1)}
              >
                ◀
              </button>

              <button
                className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md absolute right-7 top-1/3 hover:translate-y-0.5 transition-all duration-100"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage((p) => p + 1)}
              >
                ▶
              </button>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
