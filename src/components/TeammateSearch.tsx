import React, { useState } from 'react';

// Моковые данные для поиска тиммейтов
const mockTeammates = [
  { id: 1, name: 'Алексей', skill: 'Снайпер', rank: 'Высокий' },
  { id: 2, name: 'Иван', skill: 'Штурмовик', rank: 'Средний' },
  { id: 3, name: 'Мария', skill: 'Саппорт', rank: 'Высокий' },
  { id: 4, name: 'Денис', skill: 'Лидер', rank: 'Низкий' },
];

// Стили для компонента поиска тиммейтов
const styles = {
  container: {
    padding: '20px',
  },
  input: {
    padding: '10px',
    width: '300px',
    marginBottom: '20px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  card: {
    marginBottom: '10px',
  },
};

/**
 * Компонент для поиска тиммейтов.
 * @returns JSX.Element
 */
const TeammateSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState(mockTeammates);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setQuery(value);
    setResults(
      mockTeammates.filter(
        (t) =>
          t.name.toLowerCase().includes(value.toLowerCase()) ||
          t.skill.toLowerCase().includes(value.toLowerCase()) ||
          t.rank.toLowerCase().includes(value.toLowerCase())
      )
    );
  };

  return (
    <div style={styles.container}>
      <h1>Поиск тиммейтов</h1>
      <input
        type="text"
        value={query}
        onChange={handleSearch}
        placeholder="Введите навык, имя или ранг"
        style={styles.input}
      />
      <div>
        {results.length === 0 ? (
          <p>Ничего не найдено</p>
        ) : (
          results.map((t) => (
            <div key={t.id} style={styles.card}>
              <strong>{t.name}</strong> — {t.skill} ({t.rank})
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TeammateSearch;
