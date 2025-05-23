import React from "react";
import {
  FooterContainer,
  FooterName,
  FooterLinks,
  FooterLink,
} from "./style";

const Footer = () => {
  return (
    <FooterContainer>
      <FooterName>Your Name</FooterName>
      <FooterLinks>
        <FooterLink href="/about">About</FooterLink>
        <FooterLink href="/privacy">Privacy</FooterLink>
        <FooterLink href="/contact">Contact</FooterLink>
      </FooterLinks>
    </FooterContainer>
  );
};

export default Footer;
