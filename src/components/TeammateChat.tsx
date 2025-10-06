import React, { useState } from 'react';

// Стили для компонента чата
const styles = {
  container: {
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
  },
  chatBox: {
    border: '1px solid #ccc',
    borderRadius: '10px',
    padding: '10px',
    height: '300px',
    overflowY: 'scroll' as const,
    marginBottom: '10px',
  },
  message: {
    marginBottom: '5px',
  },
  inputWrapper: {
    display: 'flex',
    gap: '10px',
  },
  input: {
    flex: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
  },
  button: {
    padding: '10px 20px',
    borderRadius: '5px',
    backgroundColor: '#007BFF',
    color: 'white',
    border: 'none',
    cursor: 'pointer',
  },
};

/**
 * Компонент для чата с товарищами по команде.
 * @returns JSX.Element
 */
const TeammateChat: React.FC = () => {
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>([]);
  const [input, setInput] = useState('');

  const handleSendMessage = () => {
    if (input.trim()) {
      setMessages([...messages, { sender: 'You', text: input }]);
      setInput('');
    }
  };

  return (
    <div style={styles.container}>
      <h2>Teammate Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((message, index) => (
          <div key={index} style={styles.message}>
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
      </div>
      <div style={styles.inputWrapper}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSendMessage} style={styles.button}>
          Send
        </button>
      </div>
    </div>
  );
};

export default TeammateChat;