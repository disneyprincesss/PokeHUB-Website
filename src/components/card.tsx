interface PokemonListItem {
  name: string;
  url: string;
}

export default function PokemonCard({ pokemon }: { pokemon: PokemonListItem }) {
  return (
    // <div className="max-w-1/4 cursor-pointer overflow-hidden rounded-3xl h-48 card shadow-lg bg-white relative">
    //   <div className="h-full rounded-t-3xl img bg-gray-200 flex items-center justify-center">Image</div>
    //   <div className="p-1.5 bg-amber-400 box-border h-10 rounded-b-3xl absolute bottom-0 w-full cardInfo">
    //     <h2 className="font-jersey text-2xl">Pokemon Name</h2>
    //     <p className="text-gray-700 text-sm mt-2">
    //       Some details about the Pokemon go here.
    //     </p>
    //   </div>
    // </div>

    // <div className="card w-1/5 cursor-pointer rounded-2xl h-45 shadow-lg flex flex-col bg-[url('/image/card-bg.png')] bg-cover px-2 py-3 transition-transform transform hover:scale-105 logo">
    //   <div className="w-30 h-25 rounded-2xl flex items-center justify-center ">
    //     <img
    //       src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
    //         .split("/")
    //         .filter(Boolean)
    //         .pop()}.png`}
    //       alt={pokemon.name}
    //       className="h-25 img"
    //     />
    //   </div>
    //   <div className=" rounded-b-2xl my-2 overflow-hidden">
    //     <h2 className="font-jersey text-2xl text-amber-800 uppercase">
    //       {pokemon.name}
    //     </h2>
    //   </div>
    // </div>

    <div>
      <div className="card w-32 cursor-pointer rounded-2xl h-40 flex flex-col px-2 py-3 logo">
        <div className="card-inner w-full h-23 py-2 rounded-2xl flex items-center justify-center bg-amber-200 shadow-md">
          <img
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url
              .split("/")
              .filter(Boolean)
              .pop()}.png`}
            alt={pokemon.name}
            className="h-25 img"
          />
        </div>
        <div className=" rounded-b-2xl my-2 overflow-hidden">
          <h2 className="font-jersey text-2xl text-amber-800 uppercase">
            {pokemon.name}
          </h2>
        </div>
      </div>
    </div>
  );
}
