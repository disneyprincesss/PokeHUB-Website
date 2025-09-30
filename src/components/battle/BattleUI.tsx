import type { Pokemon, Skill } from '../../types/pokemon';
import BattleLog from './BattleLog';
import SkillButton from './SkillButton';
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

interface SkillButtonProps {
  skill: Skill;
  index: number;
  canUse: boolean;
  onClick: () => void;
}

export default function BattleUI({ battle }: { battle: BattleUIProps }) {
  const skillButtons: SkillButtonProps[] = battle.playerPokemon.skills.map((skill, idx) => ({
    skill,
    index: idx,
    canUse: battle.currentMana >= skill.manaCost,
    onClick: () => battle.onSkillSelect(skill),
  }));

  return (
    <div style={{
      position: 'absolute',
      bottom: '20px',
      right: '20px',
      background: 'rgba(255, 248, 220, 0.95)',
      border: '3px solid #8B4513',
      borderRadius: '12px',
      padding: '16px',
      minWidth: '320px',
      maxWidth: '400px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.4)'
    }}>
      {/* Turn Status */}
      <div style={{
        textAlign: 'center',
        fontWeight: 'bold',
        color: '#2c5234',
        fontSize: '16px',
        marginBottom: '12px',
        borderBottom: '2px solid #8B4513',
        paddingBottom: '8px'
      }}>
        {battle.winner
          ? `🏆 Winner: ${battle.winner}!`
          : battle.turn === 0
            ? 'Your turn'
            : "Opponent's turn"}
      </div>

      {/* Skills Section */}
      {!battle.winner && battle.turn === 0 && (
        <div style={{ marginBottom: '12px' }}>
          <div style={{
            fontWeight: 'bold',
            color: '#2c5234',
            marginBottom: '8px',
            fontSize: '14px'
          }}>
            Choose a skill:
          </div>
        
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '8px',
            marginBottom: '12px'
          }}>
            {battle.playerPokemon.skills.map((_, idx) => (
              <SkillButton key={idx} skillButton={skillButtons[idx]} />
            ))}
          </div>
        
          <button
            onClick={battle.onSkipTurn}
            style={{
              width: '100%',
              background: '#deb887',
              border: '2px solid #8B4513',
              borderRadius: '8px',
              padding: '8px',
              fontSize: '12px',
              fontWeight: 'bold',
              color: '#2c5234',
              cursor: 'pointer'
            }}
          >
            Skip a turn
          </button>
        </div>
      )}

      <BattleLog battleLog={battle.battleLog} />

      {/* Restart Button */}
      {battle.winner && (
        <button
          onClick={battle.onRestart}
          style={{
            width: '100%',
            marginTop: '12px',
            background: '#90EE90',
            border: '2px solid #8B4513',
            borderRadius: '8px',
            padding: '10px',
            fontSize: '14px',
            fontWeight: 'bold',
            color: '#2c5234',
            cursor: 'pointer'
          }}
        >
          Next Battle
        </button>
      )}
    </div>
  );
}
