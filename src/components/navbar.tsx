import "../index.css";

function Navbar() {
  return (
    <nav className="w-full backdrop-blur-md absolute top-0 bg-[#D3DFDF]/50 px-10 pr-15 py-3 flex items-center justify-between">
      <div>
        <img src="/image/logo.png" alt="PokeHUB" className="h-18 logo" />
      </div>
      <div className="flex gap-15 text-zinc-900">
        <a
          href="#"
          className="cursor-pointer hover:text-amber-700 font-jersey text-4xl hover:text-shadow-glow"
        >
          HOME
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-amber-700 font-jersey text-4xl hover:text-shadow-glow"
        >
          LIBRARY
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-amber-700 font-jersey text-4xl hover:text-shadow-glow"
        >
          BATTLE
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
