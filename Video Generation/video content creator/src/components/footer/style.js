import styled from "styled-components";

export const FooterContainer = styled.footer`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  background-color: #282c34;
  color: #fff;
  position: relative;
  bottom: 0;
  width: 100%;
`;

export const FooterName = styled.div`
  font-size: 1.2rem;
`;

export const FooterLinks = styled.div`
  display: flex;
  gap: 1.5rem;
`;

export const FooterLink = styled.a`
  text-decoration: none;
  color: #61dafb;
  font-size: 1rem;
  transition: color 0.3s ease;

  &:hover {
    color: #21a1f1;
  }
`;
