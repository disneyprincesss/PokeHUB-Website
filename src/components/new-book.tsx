import { useState, useMemo } from "react";
import PokemonCard from "./card";

interface PokemonListItem {
  name: string;
  url: string;
}

interface PageData {
  right: PokemonListItem[];
  left: PokemonListItem[];
}

type BookProps = {
  filteredList: PokemonListItem[];
};

export default function Book({ filteredList }: BookProps) {
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
              pageNumber <= pages.length ? currentPage >= pageNumber : false;

            let z;
            if (pageNumber === currentPage) {
              z = totalPages;
            } else if (pageNumber < currentPage) {
              z = pageNumber;
            } else {
              z = totalPages - (pageNumber - currentPage);
            }

            console.log(pages);
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
                      currentPage === pageNumber
                        ? "opacity-100 translate-x-0"
                        : "opacity-50 -translate-x-5"
                    } transition-all duration-800`}
                  >
                    {pageData.left.map((pokemon) => (
                      <button
                        key={pokemon.name}
                        onClick={() => alert(pokemon.name)}
                      >
                        <PokemonCard pokemon={pokemon} />
                      </button>
                    ))}
                  </div>
                </div>

                <div className="page-right w-100 h-full absolute left-0 top-0 text-zinc-900 bg-[#f9e5b7] rounded-2xl">
                  <div
                    className={` w-full h-full flex flex-wrap justify-center items-center ${
                      currentPage === pageNumber
                        ? "opacity-100 translate-x-0"
                        : "opacity-50 translate-x-5"
                    } transition-all duration-800`}
                  >
                    {pageData.right.map((pokemon) => (
                      <button
                        key={pokemon.name}
                        onClick={() => alert(pokemon.name)}
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
  );
}
