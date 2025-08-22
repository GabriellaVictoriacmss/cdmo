// src/pages/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { users } from '../config';

const Background = styled.div`
  height: 100vh;
  background-color: #B31616;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: rgba(255, 255, 255, 0.95);
  padding: 3rem;
  border-radius: 16px;
  max-width: 400px;
  width: 80%;
  box-shadow: 0 0 20px rgba(0,0,0,0.2);
  text-align: center;
`;

const Title = styled.h2`
  margin-bottom: 2rem;
  color: #333;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.8rem;
  margin-bottom: 1rem;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const Button = styled.button`
  width: 100%;
  background-color: #1a1a1a;
  color: white;
  padding: 0.8rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;

  &:hover {
    background-color: #333;
  }
`;

const Error = styled.p`
  color: red;
  margin-top: 1rem;
`;

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = () => {
  const foundUser = users.find(
    (u) => u.username === username && u.password === password
  );

  if (foundUser) {
    sessionStorage.setItem('currentUser', JSON.stringify(foundUser));
    navigate('/');
  } else {
    setError('Usuário ou senha incorretos.');
  }
};

  return (
    <Background>
      <Container>
        <Title>Login</Title>
        <Input
          type="text"
          placeholder="Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Input
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button onClick={handleLogin}>Entrar</Button>
        {error && <Error>{error}</Error>}
      </Container>
    </Background>
  );
};

export default Login;
