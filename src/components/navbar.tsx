import "../index.css";

function Navbar() {
  return (
    <nav className="w-full backdrop-blur-md absolute top-0 bg-[#D3DFDF]/50 px-10 pr-15 py-3 flex items-center justify-between">
      <div>
        <img src="/image/logo.png" alt="PokeHUB" className="h-18" />
      </div>
      <div className="flex gap-15 text-gray-700">
        <a
          href="#"
          className="cursor-pointer font-revalia hover:text-shadow-glow"
        >
          Home
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-amber-800 font-revalia"
        >
          Library
        </a>
        <a
          href="#"
          className="cursor-pointer hover:text-amber-800 font-revalia"
        >
          Battle
        </a>
      </div>
    </nav>
  );
}
export default Navbar;
