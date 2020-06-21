import styled from "@emotion/styled";
const { preFlop } = GameTurns;

export const BoardContainer = styled('div')
`
    height: 4.25rem;
    position: absolute;
    top: 13.75rem;
    left: 17rem;
`;

export const FlopElem = styled('span')
`
    opacity: ${p => p.gameTurn === preFlop ? "0" : "1"};
    transition: 0s all;
    transition-delay: 0.5s;
`;

export const BoardCard1 = styled('span')
`
    position: relative;
    right: ${p => p.gameTurn === preFlop ? "3.25rem" : "0"};
    transition: 0.5s ease all;
    transition-delay: 0.5s;
`;

export const BoardCard2 = styled('span')
`
    position: relative;
    right: ${p => p.gameTurn === preFlop ? "6.5rem" : "0"};
    transition: 0.5s ease all;
    transition-delay: 0.5s;
`;

export const River = styled('span')
`
    position: relative;
    left: 0.125rem;
`;
