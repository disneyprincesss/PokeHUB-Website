import { Link } from "react-router-dom";
import "../index.css";

export default function Navbar() {
  return (
    <nav className="w-full absolute top-0 px-10 pr-20 py-3 flex items-center justify-between">
      <div>
        <Link to="/">
          <img src="/image/logo.png" alt="PokeHUB" className="h-18 logo" />
        </Link>
      </div>
      <div className="flex gap-15 text-neutral-100">
        <Link
          to="/library"
          className="cursor-pointer hover:text-amber-600 font-jersey text-3xl hover:text-shadow-glow"
        >
          LIBRARY
        </Link>
        <Link
          to="/battle"
          className="cursor-pointer hover:text-amber-600 font-jersey text-3xl hover:text-shadow-glow"
        >
          BATTLE
        </Link>
      </div>
    </nav>
  );
}
