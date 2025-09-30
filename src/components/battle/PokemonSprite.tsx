import type { Pokemon } from "../../types/pokemon";
import PokemonStatsBox from "../ui/PokemonStatsBox";

interface PokemonSpriteProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  isFlashing: boolean;
  position: "player" | "opponent";
}

interface PokemonStatsBoxProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  position: "top-right" | "bottom-left";
}

export default function PokemonSprite({
  pokemonSprite,
}: {
  pokemonSprite: PokemonSpriteProps;
}) {
  const pokemonStatus: PokemonStatsBoxProps = {
    pokemon: pokemonSprite.pokemon,
    currentHp: pokemonSprite.currentHp,
    maxHp: pokemonSprite.maxHp,
    currentMana: pokemonSprite.currentMana,
    position: pokemonSprite.position === "player" ? "bottom-left" : "top-right",
  };

  const containerStyles =
    pokemonSprite.position === "player"
      ? { bottom: "100px", left: "300px" }
      : { top: "200px", right: "400px" };

  const spriteTransform =
    pokemonSprite.position === "player" ? "scaleX(-1) scale(2)" : "scale(2)";

  return (
    <div
      style={{
        position: "absolute",
        ...containerStyles,
        textAlign: "center",
      }}
    >
      <img
        src={pokemonSprite.pokemon.sprite}
        alt={pokemonSprite.pokemon.name}
        style={{
          width: "160px",
          height: "160px",
          transform: spriteTransform,
          filter: pokemonSprite.isFlashing
            ? "brightness(2) drop-shadow(0 0 20px #ffff00)"
            : "drop-shadow(4px 4px 8px rgba(0,0,0,0.5))",
          transition: "filter 0.2s",
          imageRendering: "pixelated",
        }}
      />

      <PokemonStatsBox pokemonStatus={pokemonStatus} />
    </div>
  );
}
