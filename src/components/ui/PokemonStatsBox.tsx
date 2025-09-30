import type { Pokemon } from '../../types/pokemon';
import { GAME_CONFIG } from '../../constants/gameConstants';
import HealthBar from './HealthBar';

interface PokemonStatsBoxProps {
  pokemon: Pokemon;
  currentHp: number;
  maxHp: number;
  currentMana: number;
  position: 'top-right' | 'bottom-left';
}

interface HealthBarProps {
  current: number;
  max: number;
  type: "health" | "mana";
  width?: string;
}

export default function PokemonStatsBox({pokemonStatus}: {pokemonStatus: PokemonStatsBoxProps}) {

  const health: HealthBarProps = {
    current: pokemonStatus.currentHp,
    max: pokemonStatus.maxHp,
    type: "health"
  };

  const mana: HealthBarProps = {
    current: pokemonStatus.currentMana,
    max: GAME_CONFIG.INITIAL_MANA,
    type: "mana"
  };

  const isTopRight = pokemonStatus.position === 'top-right';

  const positionStyles = isTopRight
    ? { top: '-80px', right: '-20px' }
    : { bottom: '-80px', left: '-20px' };

  return (
    <div style={{
      position: 'absolute',
      ...positionStyles,
      background: 'rgba(255, 248, 220, 0.95)',
      border: '3px solid #8B4513',
      borderRadius: '12px',
      padding: '8px 12px',
      minWidth: '200px',
      boxShadow: '0 4px 8px rgba(0,0,0,0.3)'
    }}>
      <div style={{
        fontWeight: 'bold',
        color: '#2c5234',
        marginBottom: '4px',
        textTransform: 'capitalize',
        fontSize: '14px'
      }}>
        {pokemonStatus.pokemon.name}
      </div>
      
      <div style={{ 
        fontSize: '12px', 
        color: '#4a5c36', 
        marginBottom: '2px' 
      }}>
        Element type: {pokemonStatus.pokemon.types.join(', ')}
      </div>
      
      <div style={{ marginBottom: '4px' }}>
        <HealthBar health={health} />
      </div>
      
      <div>
        <HealthBar 
          health={mana} 
        />
      </div>
    </div>
  );
}