import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { format } from 'date-fns';
import { Heart } from 'lucide-react';
import axios from 'axios';
import avatarImg from '../assets/ph.svg';

const Card = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
`;

const Author = styled.span`
  font-weight: bold;
  color: #B31616;
  margin-bottom: 0.2rem;
`;

const Bubble = styled.div`
  background-color: #111;
  color: white;
  padding: 1rem;
  border-radius: 12px;
  max-width: 400px;
  word-wrap: break-word;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.2);
`;

const Timestamp = styled.span`
  margin-top: 0.4rem;
  font-size: 0.8rem;
  color: gray;
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.2); }
  100% { transform: scale(1); }
`;

const ReactionWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-top: 0.5rem;
  gap: 0.4rem;
`;

const ReactionButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  color: ${({ reacted }) => (reacted ? '#ff4d6d' : '#888')};
  display: flex;
  align-items: center;
  transition: all 0.2s ease;
  font-size: 1rem;

  &:hover {
    color: #ff4d6d;
    transform: scale(1.1);
  }

  svg {
    width: 20px;
    height: 20px;
    margin-right: 0.3rem;
    animation: ${({ reacted }) => (reacted ? pulse : 'none')} 0.3s ease;
  }
`;

export const MessageCard = ({ author, message, date, _id, likes: initialLikes }) => {
  const [likes, setLikes] = useState(initialLikes || 0);
  const [reacted, setReacted] = useState(false);

  let formattedDate = '';
  try {
    const parsed = new Date(date);
    if (!isNaN(parsed)) {
      formattedDate = format(parsed, 'HH:mm - dd/MM/yy');
    }
  } catch (err) {
    console.warn('Data inválida:', date);
  }

  const handleLike = async () => {
    if (reacted) return; // previne múltiplos likes
    try {
      const res = await axios.put(`https://cdmo.onrender.com/messages/${_id}/like`);
      setLikes(res.data.likes);
      setReacted(true);
    } catch (err) {
      console.error('Erro ao curtir:', err);
    }
  };

  return (
    <Card>
      <Avatar src={avatarImg} alt="Avatar" />
      <Content>
        <Author>{author}</Author>
        <Bubble>{message}</Bubble>
        {formattedDate && <Timestamp>{formattedDate}</Timestamp>}
        <ReactionWrapper>
          <ReactionButton onClick={handleLike} reacted={reacted}>
            <Heart fill={reacted ? '#ff4d6d' : 'none'} />
            {likes > 0 ? likes : 'Curtir'}
          </ReactionButton>
        </ReactionWrapper>
      </Content>
    </Card>
  );
};
