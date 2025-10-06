import React from 'react';

// Моковые данные для рейтинга игроков
const mockRankings = [
  { id: 1, name: 'Алексей', score: 1500 },
  { id: 2, name: 'Мария', score: 1450 },
  { id: 3, name: 'Иван', score: 1400 },
  { id: 4, name: 'Денис', score: 1350 },
];

// Стили для компонента рейтинга игроков
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
  },
  th: {
    border: '1px solid #ddd',
    padding: '8px',
  },
  td: {
    border: '1px solid #ddd',
    padding: '8px',
    textAlign: 'center' as const,
  },
};

/**
 * Компонент для отображения рейтинга игроков.
 * @returns JSX.Element
 */
const PlayerRanking: React.FC = () => {
  return (
    <div style={styles.container}>
      <h1>Рейтинг игроков</h1>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Место</th>
            <th style={styles.th}>Имя</th>
            <th style={styles.th}>Очки</th>
          </tr>
        </thead>
        <tbody>
          {mockRankings.map((player, index) => (
            <tr key={player.id}>
              <td style={styles.td}>{index + 1}</td>
              <td style={styles.td}>{player.name}</td>
              <td style={styles.td}>{player.score}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerRanking;