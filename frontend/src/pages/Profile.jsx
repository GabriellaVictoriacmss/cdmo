// src/pages/Profile.jsx
import React, { useEffect } from 'react';
import styled from 'styled-components';
import { getCurrentUser } from '../config';
import sasa from '../assets/sasa.svg';
import ph from '../assets/ph.svg';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vw;
  background: rgba(0,0,0,0.4);
  z-index: 1000;
`;

const Panel = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  width: 250px;
  height: 100vh;
  background-color: #B31616;
  box-shadow: -2px 0 10px rgba(0,0,0,0.2);
  padding: 2rem;
  z-index: 1001;
  transition: transform 0.3s ease-in-out;
`;

const ProfilePic = styled.img`
  height: 100px;
  width: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const Name = styled.h2`
  margin-bottom: 0.5rem;
`;

const Job = styled.p`
  margin-bottom: 1.2rem;
  font-style: italic;
  color: white;

  i {
    font-weight: bold;
  }
`;

const Button = styled.button`
  background-color: #1a1a1a;
  color: white;
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 8px;
  cursor: pointer;
`;

export const Profile = ({ onClose }) => {
  const user = getCurrentUser();

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (e.target.id === 'overlay') {
        onClose?.();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [onClose]);

  const handleLogout = () => {
    sessionStorage.removeItem('currentUser');
    window.location.reload();
  };

  const isAdmin = user?.isAdmin;

  return (
    <Overlay id="overlay">
      <Panel>
        <ProfilePic src={user.username === 'admin' ? ph : sasa} alt="Perfil" />
        <Name>{user.name}</Name>

        {isAdmin ? (
          <>
            <Job><strong>Cargo: </strong>Namorado lindo da Samara</Job>
            <Job><i>Eu vou casar com você, doidona!</i></Job>
          </>
        ) : (
          <>
            <Job><strong>Cargo:</strong>Namorada linda do Pedro</Job>
            <Job><i>Você vai casar comigo :P</i></Job>
          </>
        )}

        <Button onClick={handleLogout}>Sair</Button>
      </Panel>
    </Overlay>
  );
};

export default Profile;
