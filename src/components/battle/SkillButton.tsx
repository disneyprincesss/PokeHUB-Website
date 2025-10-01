import type { Skill } from "../../types/pokemon";

interface SkillButtonProps {
  skill: Skill;
  index: number;
  canUse: boolean;
  onClick: () => void;
}

export default function SkillButton({
  skillButton,
}: {
  skillButton: SkillButtonProps;
}) {
  return (
    <button
      onClick={skillButton.onClick}
      disabled={!skillButton.canUse}
      className="bg-[#f0e68c] border-2 border-[#8B4513] rounded-lg sm:p-1.5  m-0.5 sm:m-1 text-xs font-bold text-[#2c5234] cursor-pointer transition-all duration-200 disabled:cursor-not-allowed disabled:opacity-50 hover:bg-[#e6d870]"
    >
      Skill {skillButton.index + 1}
      <br />
      <span className="text-xs font-normal capitalize">
        {skillButton.skill.name.replace(/-/g, " ")}
      </span>
    </button>
  );
}
