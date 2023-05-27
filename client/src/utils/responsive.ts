import { css } from "styled-components";

export const mobile = (props:any) => { // TODO: remove any type
    return css`
    @media only screen and (max-width: 400px) {
      ${props}
    }
  `;
};