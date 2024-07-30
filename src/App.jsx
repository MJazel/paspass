import React, { useState } from 'react';
import './App.css';

function generatePassword(baseWord) {
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';
  const upperCase = baseWord.toUpperCase();
  const lowerCase = baseWord.toLowerCase();

  let password = '';

  for (let i = 0; i < baseWord.length; i++) {
    if (baseWord[i] !== ' ') {
      if (Math.random() > 0.5) {
        password += upperCase[i % upperCase.length];
      } else {
        password += lowerCase[i % lowerCase.length];
      }
    }
  }

  for (let i = 0; i < 2; i++) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }

  for (let i = 0; i < 2; i++) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }

  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password;
}

function App() {
  const [inputWord, setInputWord] = useState('');
  const [passwords, setPasswords] = useState([]);

  const handleGenerate = () => {
    const newPasswords = [];
    for (let i = 0; i < 5; i++) {
      newPasswords.push(generatePassword(inputWord.replace(/\s/g, '')));
    }
    setPasswords(newPasswords);
  };

  return (
    <div className="container">
      <h1>Generador de Contraseñas Seguras</h1>
      <input
        type="text"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        placeholder="Escribe una palabra"
      />
      <button onClick={handleGenerate}>Generar Contraseñas</button>
      <ul>
        {passwords.map((password, index) => (
          <li key={index}>{password}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;