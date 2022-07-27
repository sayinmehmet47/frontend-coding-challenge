import { css } from 'styled-components';

export const mobile = (props: any) => {
  return css`
    @media only screen and (max-width: 600px) {
      ${props}
    }
  `;
};

export const tablet = (props: any) => {
  return css`
    @media only screen and (min-width: 601px) and (max-width: 900px) {
      ${props}
    }
  `;
};

export const desktop = (props: any) => {
  return css`
    @media only screen and (min-width: 901px) {
      ${props}
    }
  `;
};
