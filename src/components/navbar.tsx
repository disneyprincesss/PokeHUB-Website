import "../index.css";

function Navbar() {
  return (
    <nav className="w-full absolute top-0 px-10 pr-20 py-3 flex items-center justify-between">
      <div>
        <img src="/image/logo.png" alt="PokeHUB" className="h-18 logo" />
      </div>
      <div className="flex gap-15 text-neutral-100">
        <a
          href="#"
          className="cursor-pointer hover:text-amber-600 font-jersey text-3xl hover:text-shadow-glow"
        >
          LIBRARY
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-amber-600 font-jersey text-3xl hover:text-shadow-glow"
        >
          BATTLE
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
