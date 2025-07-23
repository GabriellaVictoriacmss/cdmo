import React, { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';

const Form = styled.form`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Input = styled.input`
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  background-color: #eee;
  color: #555;
  outline: none;
`;

const Textarea = styled.textarea`
  padding: 0.75rem;
  border-radius: 5px;
  border: none;
  font-size: 1rem;
  resize: vertical;
  outline: none;
  resize: none;
`;

const Button = styled.button`
    background-color: ${({ theme }) => theme.colors.headerBg};
  color: white;
  border: none;
  padding: 0.75rem;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  transition: background 0.3s;

  &:hover {
    background-color: #517aa8;
  }
`;

export const MessageForm = ({ onMessageSent }) => {
  const [message, setMessage] = useState('');
  const author = 'Pedro Mor';

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post('https://cdmo.onrender.com/messages', { author, message });
    setMessage('');
    onMessageSent();
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Input
        type="text"
        value={author}
        readOnly
      />
      <Textarea
        rows="4"
        placeholder="Sua mensagem"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        required
      />
      <Button type="submit">Enviar</Button>
    </Form>
  );
};
