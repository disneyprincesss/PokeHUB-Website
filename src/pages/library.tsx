import BookPage from "../components/book-page";
import PokemonCard from "../components/card";
import Navbar from "../components/navbar";
import { useEffect, useRef, useState } from "react";

interface PokemonListItem {
  name: string;
  url: string;
}

export default function LibraryPage() {
  const ITEMS_PER_PAGE = 12;

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
  // const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  // const currentItems = filteredList.slice(
  //   startIndex,
  //   startIndex + ITEMS_PER_PAGE
  // );
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentItems = filteredList.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const carouselRef = useRef<HTMLDivElement>(null);

  const scrollNext = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: carouselRef.current.clientWidth, // move 1 page width
        behavior: "smooth",
      });
    }
  };

  const scrollPrev = () => {
    if (carouselRef.current) {
      carouselRef.current.scrollBy({
        left: -carouselRef.current.clientWidth, // move back 1 page width
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <main className="relative w-full">
        <Navbar />
        <div className="bg-[url('/image/library-bg.gif')] h-screen bg-cover bg-center flex justify-center items-center overflow-auto">
          <div className="w-4xl text-center mt-35 flex flex-col gap-6 justify-center items-center">
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
                <img
                  src="/image/search-icon.png"
                  alt="Search"
                  className="w-6"
                />
              </button>
            </div>

            {loading && <p>Loading Pokémons…</p>}

            {/* <button
                    className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md absolute left-7 top-1/3 hover:translate-y-0.5 transition-all duration-100"
                    disabled={currentPage === 1}
                    onClick={() => setCurrentPage((p) => p - 1)}
                    onClickCapture={() => prevPage()}
                  >
                    ◀
                  </button>

                  <button
                    className="bg-[#bb4d00] hover:bg-[#914007] text-zinc-200 font-pixelify text-xl py-2 px-4 rounded-xl shadow-md absolute right-7 top-1/3 hover:translate-y-0.5 transition-all duration-100"
                    disabled={currentPage === totalPages}
                    onClick={() => setCurrentPage((p) => p + 1)}
                    onClickCapture={() => nextPage()}
                  >
                    ▶
                  </button> */}

            <div className="container w-full mt-5">
              <div className="sprite-wrapper">
                <div className="book">
                  <div className="carousel" ref={carouselRef}>
                    <div className="sprite"></div>
                    <BookPage
                      filteredList={filteredList}
                      ITEMS_PER_PAGE={ITEMS_PER_PAGE}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
