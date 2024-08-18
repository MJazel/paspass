import React, { useState } from 'react';
import './App.css';

function generatePassword(baseWord) {
  const symbols = '!@#$%^&*()_+[]{}|;:,.<>?';
  const numbers = '0123456789';
  const letters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';

  let password = '';
  let containsLetter = false;
  
  for (let i = 0; i < baseWord.length; i++) {
    if (Math.random() > 0.5) {
      password += baseWord[i].toUpperCase();
    } else {
      password += baseWord[i].toLowerCase();
    }
    if (/[a-zA-Z]/.test(baseWord[i])) {
      containsLetter = true;
    }
  }
  
  if (!/[0-9]/.test(password)) {
    password += numbers[Math.floor(Math.random() * numbers.length)];
  }
  
  if (!/[!@#$%^&*()_+[\]{}|;:,.<>?]/.test(password)) {
    password += symbols[Math.floor(Math.random() * symbols.length)];
  }
  
  if (!containsLetter) {
    password += letters[Math.floor(Math.random() * letters.length)];
  }
  
  while (password.length < 14) {
    const randomIndex = Math.floor(Math.random() * 3);
    if (randomIndex === 0) {
      password += letters[Math.floor(Math.random() * letters.length)];
    } else if (randomIndex === 1) {
      password += numbers[Math.floor(Math.random() * numbers.length)];
    } else {
      password += symbols[Math.floor(Math.random() * symbols.length)];
    }
  }
  
  password = password.split('').sort(() => 0.5 - Math.random()).join('');

  return password.slice(0, 14); 
}


function App() {
  const [inputWord, setInputWord] = useState('');
  const [passwords, setPasswords] = useState([]);

  const handleGenerate = () => {
    if(inputWord === "") return;
    const newPasswords = [];
    for (let i = 0; i < 5; i++) {
      newPasswords.push(generatePassword(inputWord.replace(/\s/g, '')));
    }
    setPasswords(newPasswords);
  };

  const handleCopy = (password) => {
    navigator.clipboard.writeText(password);
    alert(`Contraseña copiada: ${password}`);
  };

  return (
    <div className="container">
      <h1>Generador de Contraseñas Seguras</h1>
      <input
        type="text"
        value={inputWord}
        onChange={(e) => setInputWord(e.target.value)}
        placeholder="Escribe una palabra o frase"
      />
      <button onClick={handleGenerate}>Generar Contraseñas</button>
      <ul>
        {passwords.map((password, index) => (
          <li key={index}>
            {password}
            <button className="copy-button" onClick={() => handleCopy(password)}>Copiar</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;