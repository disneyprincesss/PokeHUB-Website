import type { BattleUIProps, SkillButtonProps } from "../../types/pokemon";
import BattleLog from "./BattleLog";
import SkillButton from "./SkillButton";

export default function BattleUI({ battle }: { battle: BattleUIProps }) {
  const skillButtons: SkillButtonProps[] = battle.playerPokemon.skills.map(
    (skill, idx) => ({
      skill,
      index: idx,
      canUse: battle.currentMana >= skill.manaCost,
      onClick: () => battle.onSkillSelect(skill),
    })
  );

  return (
    <div className="absolute bottom-10 right-3 sm:right-5 md:right-10 bg-[#fff8dcf2] border-3 border-[#8B4513] rounded-lg p-4 min-w-[220px] max-w-[275px] sm:min-w-[320px] sm:max-w-[400px] shadow-lg">
      {/* Turn Status */}
      <div className="mb-2 font-bold text-[#2c5234] text-center text-lg border-b-2 border-[#8B4513] pb-2 capitalize">
        {battle.winner
          ? `🏆 Winner: ${battle.winner}!`
          : battle.turn === 0
          ? "Your turn"
          : "Opponent's turn"}
      </div>

      {/* Skills Section */}
      {!battle.winner && battle.turn === 0 && (
        <div className="mb-2">
          <div className="mb-2 text-sm text-[#2c5234] font-bold">
            Choose a skill:
          </div>

          <div className="mb-2 grid grid-cols-2 gap-1 sm:gap-1.5 justify-center">
            {battle.playerPokemon.skills.map((_, idx) => (
              <SkillButton key={idx} skillButton={skillButtons[idx]} />
            ))}
          </div>

          <button
            className="w-full bg-[#deb887] border-2 border-[#8B4513] rounded-lg p-2 text-sm font-bold text-[#2c5234] cursor-pointer transition-all duration-200 hover:bg-[#d2b48c]"
            onClick={battle.onSkipTurn}
          >
            Skip a turn
          </button>
        </div>
      )}

      <BattleLog battleLog={battle.battleLog} />

      {/* Restart Button */}
      {battle.winner && (
        <button
          className="w-full mt-3 bg-[#90EE90] border-2 border-[#8B4513] rounded-lg p-2 text-sm font-bold text-[#2c5234] cursor-pointer transition-all duration-200 hover:bg-[#77dd77]"
          onClick={battle.onRestart}
        >
          Next Battle
        </button>
      )}
    </div>
  );
}
