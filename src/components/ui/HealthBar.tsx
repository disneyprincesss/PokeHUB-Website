interface HealthBarProps {
  current: number;
  max: number;
  type: 'health' | 'mana';
  width?: string;
}

export default function HealthBar({health}: {health: HealthBarProps}) {
  const { current, max, type, width = '160px' } = health;

  const getBarColor = () => {
    if (type === 'mana') return '#2196F3';
    
    const percentage = current / max;
    if (percentage > 0.5) return '#4CAF50';
    if (percentage > 0.2) return '#FF9800';
    return '#F44336';
  };

  return (
    <div style={{
      width,
      height: '8px',
      background: '#333',
      borderRadius: '4px',
      overflow: 'hidden',
      border: '1px solid #000'
    }}>
      <div style={{
        width: `${Math.max(0, (current / max) * 100)}%`,
        height: '100%',
        background: getBarColor(),
        transition: 'width 0.5s, background-color 0.3s'
      }} />
    </div>
  );
};
