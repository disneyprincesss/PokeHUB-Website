import Navbar from "../components/navbar";
import LibraryPage from "./library";

export default function HomePage() {

  return (
    <>
      <main className="relative w-full h-full">
        {/* <Navbar /> */}
        <div className="bg-[url('/image/pokemonbg.gif')] h-screen bg-cover bg-center flex flex-col items-center justify-center text-zinc-200">
          {/* <h1 className="font-jersey text-9xl text-shadow-dropshadow">
            Welcome to PokeHUB!
          </h1>
          <p className="font-revalia text-xl text-center">
              All the Pokémon Knowledge in One Place.
            </p>
            <div className="flex gap-8 mt-6">
              <button className="bg-[#DE4040] hover:bg-[#CC4242] text-zinc-200 font-pixelify text-2xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100">
                <a href="#">Library</a>
              </button>
              <button className="hover:bg-[#CC4242] text-[#DE4040] hover:text-zinc-200 font-pixelify text-2xl py-2 px-4 rounded-xl outline-2 outline-[#CC4242] hover:translate-y-0.5 transition-all duration-100">
                <a href="#">Battle</a>
              </button>
            </div> */}

          <div className="w-full h-screen flex flex-col items-center justify-center bg-emerald-950/40">
            <h1 className="font-jersey text-9xl text-shadow-dropshadow w-md text-center">
              WELCOME TO
            </h1>
            <img
              src="/image/nameLogo.png"
              alt="PokeHUB"
              className="h-48 logo -mt-6 hover:scale-105 transition-transform ease-in-out duration-900"
            />
            <p className="font-revalia text-xl text-center">
              All the Pokémon Knowledge in One Place.
            </p>
            <div className="flex gap-8 mt-6">
              <button className="bg-[#DE4040] hover:bg-[#CC4242] text-zinc-200 font-pixelify text-2xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100">
                <a href="/library">Library</a>
              </button>
              <button className="hover:bg-[#CC4242] text-[#DE4040] hover:text-zinc-200 font-pixelify text-2xl py-2 px-4 rounded-xl outline-2 outline-[#CC4242] hover:translate-y-0.5 transition-all duration-100">
                <a href="#">Battle</a>
              </button>
              {/* <button className="bg-[#DE4040] hover:bg-[#CC4242] text-zinc-200 font-pixelify text-2xl py-2 px-4 rounded-xl shadow-md hover:translate-y-0.5 transition-all duration-100">
                <a href="#">Explore</a>
              </button> */}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
