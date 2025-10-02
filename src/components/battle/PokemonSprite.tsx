import type { PokemonSpriteProps, PokemonStatsBoxProps } from "../../types/pokemon";
import PokemonStatsBox from "../ui/PokemonStatsBox";

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
      ? "bottom-30 left-10 sm:left-35 lg:left-90"
      : "top-45 right-60 sm:right-110";

  const spriteTransform =
    pokemonSprite.position === "player"
      ? "-scale-x-200 scale-200"
      : "scale-150";

  return (
    <div className={`absolute ${containerStyles} text-center`}>
      <img
        src={pokemonSprite.pokemon.sprite}
        alt={pokemonSprite.pokemon.name}
        className={`w-40 h-40 transform ${spriteTransform} filter ${
          pokemonSprite.isFlashing
            ? "brightness-200 drop-shadow-[0_0_20px_#ffff00]"
            : "drop-shadow-[4px_4px_8px_rgba(0,0,0,0.5)]"
        } transition-filter duration-200`}
        style={{
          imageRendering: "pixelated",
        }}
      />

      <PokemonStatsBox pokemonStatus={pokemonStatus} />
    </div>
  );
}
