import Navbar from "../components/navbar";

export default function BattlePage() {
  return (
    <main className="relative w-full min-h-screen">
      <Navbar />
      <div className="bg-[url('/image/library-bg.gif')] min-h-screen bg-cover bg-center flex flex-col justify-center items-center overflow-auto px-4 sm:px-6 lg:px-8 pt-20">
        <div className="text-center">
          <h1 className="font-jersey text-4xl sm:text-6xl lg:text-8xl text-amber-600 text-shadow-glow mb-4">
            BATTLE ARENA
          </h1>
          <p className="font-revalia text-lg sm:text-xl text-amber-200 max-w-2xl">
            Coming Soon! Prepare for epic Pokémon battles.
          </p>
        </div>
      </div>
    </main>
  );
}
