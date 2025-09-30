import type { Skill } from '../../types/pokemon';

interface SkillButtonProps {
  skill: Skill;
  index: number;
  canUse: boolean;
  onClick: () => void;
}

export default function SkillButton({ skillButton }: { skillButton: SkillButtonProps }) {
  return (
    <button
      onClick={skillButton.onClick}
      disabled={!skillButton.canUse}
      style={{
        background: skillButton.canUse ? '#f0e68c' : '#ccc',
        border: '2px solid #8B4513',
        borderRadius: '8px',
        padding: '8px',
        fontSize: '12px',
        fontWeight: 'bold',
        color: '#2c5234',
        cursor: skillButton.canUse ? 'pointer' : 'not-allowed',
        transition: 'all 0.2s',
        opacity: skillButton.canUse ? 1 : 0.5
      }}
    >
      Skill {skillButton.index + 1}
      <br />
      <span style={{ fontSize: '10px', fontWeight: 'normal' }}>
        {skillButton.skill.name.replace(/-/g, ' ')}
      </span>
    </button>
  );
}