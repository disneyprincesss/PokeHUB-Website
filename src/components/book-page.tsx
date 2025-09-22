import PokemonCard from "./card";

interface PokemonListItem {
  name: string;
  url: string;
}

type BookProps = {
  filteredList: PokemonListItem[];
  ITEMS_PER_PAGE: number;
};

export default function BookPage({ filteredList, ITEMS_PER_PAGE }: BookProps) {
  const totalPages = Math.ceil(filteredList.length / ITEMS_PER_PAGE);

  return (
    <>
      {Array.from({ length: totalPages }).map((_, pageIndex) => {
        const startIndex = pageIndex * ITEMS_PER_PAGE;
        const currentItems = filteredList.slice(
          startIndex,
          startIndex + ITEMS_PER_PAGE
        );

        return (
          <div key={pageIndex} className="carousel-item">
            <div className="page-container">
              {/* Left page */}
              <div className="page left-page">
                <div className="h-11/12 flex flex-wrap justify-center items-center">
                  {currentItems.slice(0, 6).map((pokemon) => (
                    <button onClick={() => alert(pokemon.name)} key={pokemon.name} >
                      <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    </button>
                  ))}
                </div>
              </div>

              {/* Right page */}
              <div className="page right-page">
                <div className="h-11/12 flex flex-wrap gap-1 justify-center items-center">
                  {currentItems.slice(6, 12).map((pokemon) => (
                    <button onClick={() => alert(pokemon.name)} key={pokemon.name} >
                      <PokemonCard key={pokemon.name} pokemon={pokemon} />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}
