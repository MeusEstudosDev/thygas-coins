import styled from 'styled-components';

export const StyledHome = styled.main`
  > ul {
    margin: 0 auto;
    max-width: 110rem;
    padding: 4rem 0;
    display: flex;
    gap: 2rem;

    > li {
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;

      > img {
        background-color: transparent;
        padding: 3px;
        border-radius: 0.6rem;

        :hover {
          background-color: var(--color-primary);
          filter: brightness(1.1);
        }
      }
    }
  }
`;
