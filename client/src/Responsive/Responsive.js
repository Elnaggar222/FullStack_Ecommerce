import { css } from "styled-components";

export const Mobile = (style) => {
  return css`
    @media only screen and (max-width: 576px) {
        ${style}
    }
  `;
};
export const Medium = (style) => {
  return css`
    @media only screen and ( min-width: 577px) and  (max-width: 768px) {
        ${style}
    }
  `;
};
export const MedLarge = (style) => {
  return css`
    @media only screen and ( min-width: 769px) and  (max-width: 1043px) {
        ${style}
    }
  `;
};
