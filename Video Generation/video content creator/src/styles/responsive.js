import { css } from 'styled-components';

// 1536px
export const extraLargeScreen = (props) => {
  return css`
    @media (max-width: 1536px) {
      ${props}
    }
  `;
};

// 1280px (1536px - 256px)
export const largeScreen = (props) => {
  return css`
    @media (max-width: 1280px) {
      ${props}
    }
  `;
};

// 1024px (1280px - 256px)
export const mediumScreen = (props) => {
  return css`
    @media (max-width: 1024px) {
      ${props}
    }
  `;
};

// 768px (1024px - 256px)
export const smallScreen = (props) => {
  return css`
    @media (max-width: 768px) {
      ${props}
    }
  `;
};

// 512px (768px - 256px)
export const mobileScreen = (props) => {
  return css`
    @media (max-width: 512px) {
      ${props}
    }
  `;
};

// 256px (512px - 256px)
export const extraSmallScreen = (props) => {
  return css`
    @media (max-width: 256px) {
      ${props}
    }
  `;
};

// 0px (if necessary, can be a special case)
export const zeroScreen = (props) => {
  return css`
    @media (max-width: 0px) {
      ${props}
    }
  `;
};
