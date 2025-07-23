import React from 'react';
import styled from 'styled-components';
import { MessageCard } from './MessageCard';

const Container = styled.div`
  margin-top: 3rem;
  padding: 1.5rem;
  border-radius: 16px;
  background-color: #fff;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-inline: auto;
  gap: 1.2rem;
 
`;

export const MessageContainer = ({ messages }) => {
    return (
        <Container>
            {messages.length > 0 ? (
                messages.map((msg) => (
                    <MessageCard
                        key={msg._id}
                        author={msg.author}
                        message={msg.message}
                        date={msg.data}
                        _id={msg._id}
                        likes={msg.likes}
                    />

                ))
            ) : (
                <p>Nenhuma mensagem ainda.</p>
            )}
        </Container>
    );
};
