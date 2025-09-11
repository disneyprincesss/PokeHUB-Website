import Navbar from "../components/navbar";

function HomePage() {

  return (
    <>
        <main className="relative w-full">
              <Navbar />
        <div className="bg-[url('/image/pokemonbg.gif')] h-screen bg-cover bg-center">
          {/* <h1>Welcome to PokeHUB</h1>
          <p>Your one-stop solution for all Pokémon-related information!</p> */}
        </div>
      </main>
    </>
  );
}

export default HomePage;
