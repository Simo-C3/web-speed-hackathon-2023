import { css } from '@emotion/css';

export const container = () => css`
  object-fit: cover;
  height: 100%;
`;

export const container__fill = () => css`
  height: 100%;
  inset: 0;
  position: absolute;
  width: 100%;
`;
