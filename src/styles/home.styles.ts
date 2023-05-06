import styled from 'styled-components';

export const StyledHome = styled.main`
  min-height: calc(100vh - (285px + 335px));

  @media (min-width: 1024px) {
    min-height: calc(100vh - (150px + 175px));
  }

  > div {
    margin: 0 auto;
    max-width: 110rem;
    padding: 4rem 0 0 0;
    display: flex;
    gap: 2rem;
  }

  > ul {
    margin: 0 auto;
    max-width: 110rem;
    padding: 4rem 0;
    display: flex;
    gap: 2rem;

    > li {
      cursor: pointer;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      > h2 {
        font-size: 1.4rem;
        text-transform: uppercase;
      }

      > img {
        background-color: transparent;
        padding: 3px;
        border-radius: 0.6rem;

        :hover {
          background-color: var(--color-primary);
          filter: brightness(1.1);
        }
      }

      > p {
        font-size: 1.4rem;
      }
    }
  }
`;
