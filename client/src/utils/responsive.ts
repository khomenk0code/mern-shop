import { css } from "styled-components";

type MobileProps = Record<string, string | number>;

export const mobile = (props: MobileProps) => {
    return css`
        @media only screen and (max-width: 400px) {
            ${props}
        }
    `;
};
