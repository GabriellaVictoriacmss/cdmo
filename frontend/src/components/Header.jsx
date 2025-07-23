import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import sasa from "../assets/sasa.svg";
import ph from "../assets/ph.svg";
import { getCurrentUser } from '../config';
import { Profile } from '../pages/Profile';

const HeaderContainer = styled.header`
  width: 100%;
  height: 76px;
  background-color: ${({ theme }) => theme.colors.headerBg};
  padding: 1rem 2rem;
  color: white;
  font-size: 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-weight: bold;
`;

const DivProfile = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;

  img {
    height: 50px;
    width: 50px;
    border-radius: 50%;
    cursor: pointer;
  }
`;

export const Header = () => {
  const [user, setUser] = useState(null);
  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const stored = sessionStorage.getItem("currentUser");
    if (stored) {
      setUser(JSON.parse(stored));
    }
  }, []);

  const handleToggleProfile = () => {
    setShowProfile((prev) => !prev);
  };

  return (
    <>
      <HeaderContainer>
        <div>xiamo.</div>
        {user && (
          <DivProfile>
            <p>{user.name}</p>
            <img
              src={user.username === 'admin' ? ph : sasa}
              alt="Perfil"
              onClick={handleToggleProfile}
            />
          </DivProfile>
        )}
      </HeaderContainer>

      {showProfile && <Profile onClose={() => setShowProfile(false)} />}
    </>
  );
};
