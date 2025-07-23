import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled, { ThemeProvider } from 'styled-components';
import { MessageForm } from '../components/MessageForm';
import { MessageContainer } from '../components/MessageContainer';
import { Header } from '../components/Header';
import { theme } from '../styles/theme';
import { GlobalStyle } from '../styles/globalStyle';
import { isAdmin, getCurrentUser } from '../config';

const Page = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  text-align: center;
  margin: 4rem 0 2rem 0;
  color: #000;
`;

function Home() {
  const [messages, setMessages] = useState([]);

  const fetchMessages = async () => {
    try {
     const res = await axios.get('https://cdmo.onrender.com/messages');
      setMessages(res.data);
    } catch (err) {
      console.error('Erro ao buscar mensagens:', err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const user = getCurrentUser();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Page>
        {isAdmin() && (
          <MessageForm author={user.name} onMessageSent={fetchMessages} />
        )}
        <Title>bate-papo do amor heh</Title>
        <MessageContainer messages={messages} />
      </Page>
    </ThemeProvider>
  );
}

export default Home;
