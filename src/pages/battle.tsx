import BattleUI from "@/components/battle/BattleUI";
import PokemonSprite from "@/components/battle/PokemonSprite";
import Navbar from "@/components/navbar";
import Confetti from "@/components/ui/Confetti";
import LoadingScreen from "@/components/ui/LoadingScreen";
import { usePokemonBattle } from "@/hooks/usePokemonBattle";
import type { Pokemon, Skill } from "@/types/pokemon";


interface PokemonSpriteProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  isFlashing: boolean;
  position: "player" | "opponent";
}

interface BattleUIProps {
  playerPokemon: Pokemon;
  currentMana: number;
  turn: number;
  winner: string | null;
  battleLog: string[];
  onSkillSelect: (skill: Skill) => void;
  onSkipTurn: () => void;
  onRestart: () => void;
}

export default function BattlePage({ selectedPokemon }: { selectedPokemon?: Pokemon | null }) {
  const {
    pokemons,
    currentHp,
    maxHp,
    currentMana,
    battleLog,
    winner,
    loading,
    turn,
    flash,
    showConfetti,
    handleSkillSelect,
    handleSkipTurn,
    handleRestart,
  } = usePokemonBattle(); // Pass selected Pokemon to the hook

  const playerPokemon: PokemonSpriteProps = {
    pokemon: pokemons[0],
    currentHp: currentHp[0],
    maxHp: maxHp[0],
    currentMana: currentMana[0],
    isFlashing: flash[0],
    position: "player",
  };

const opponentPokemon: PokemonSpriteProps = {
    pokemon: pokemons[1],
    currentHp: currentHp[1],
    maxHp: maxHp[1],
    currentMana: currentMana[1],
    isFlashing: flash[1],
    position: "opponent",
  };

  const battle: BattleUIProps = {
    playerPokemon: pokemons[0],
    currentMana: currentMana[0],
    turn,
    winner,
    battleLog,
    onSkillSelect: handleSkillSelect,
    onSkipTurn: handleSkipTurn,
    onRestart: handleRestart,
  };

  if (loading || pokemons.length < 2) {
    return <LoadingScreen />;
  }

  console.log('Pokemons in battle:', pokemons);
  console.log('Selected Pokemon:', selectedPokemon?.name);

  return (
    <main>
      <Navbar />
      <div className="w-[100vw] h-[100vh] bg-[url('/image/background.png')] bg-cover bg-center relative overflow-hidden"
      >
        {showConfetti && <Confetti />}

        <PokemonSprite pokemonSprite={playerPokemon} />

        <PokemonSprite pokemonSprite={opponentPokemon} />

        <BattleUI battle={battle} />
      </div>
    </main>
  );
}
