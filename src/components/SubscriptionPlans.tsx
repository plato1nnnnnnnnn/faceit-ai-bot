import React from 'react';

// Стили для компонента подписок
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  plansWrapper: {
    display: 'flex',
    gap: '20px',
  },
  planCard: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '20px',
    width: '200px',
    textAlign: 'center' as const,
  },
  button: {
    padding: '10px 20px',
    backgroundColor: '#007BFF',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

/**
 * Компонент для отображения планов подписки.
 * @returns JSX.Element
 */
const SubscriptionPlans: React.FC = () => {
  const plans = [
    { level: 'Basic', price: 10, features: ['Feature 1', 'Feature 2'] },
    { level: 'Pro', price: 20, features: ['Feature 1', 'Feature 2', 'Feature 3'] },
    { level: 'Premium', price: 30, features: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4'] },
  ];

  return (
    <div style={styles.container}>
      <h1>Подписки</h1>
      <div style={styles.plansWrapper}>
        {plans.map((plan) => (
          <div key={plan.level} style={styles.planCard}>
            <h2>{plan.level}</h2>
            <p>Цена: ${plan.price}/мес</p>
            <ul>
              {plan.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
            <button style={styles.button}>Выбрать</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SubscriptionPlans;