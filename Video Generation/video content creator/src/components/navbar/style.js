import styled from "styled-components";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #181818;
  color: #fff;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
`;

export const NavItems = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const NavLink = styled.a`
  text-decoration: none;
  color: #61dafb;
  font-size: 1.6rem;
  transition: color 0.3s ease;

  &:hover {
    color: #21a1f1;
  }
`;
