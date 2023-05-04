import { UserContext } from '@/contexts/user.context';
import { StyledHome } from '@/styles/home.styles';
import Image from 'next/image';
import React from 'react';

const HomePage = () => {
  const userContext = React.useContext(UserContext);

  return (
    <StyledHome>
      <ul>
        {userContext.products.map((el) => (
          <li key={el.id}>
            <h2>{el.name}</h2>
            <Image src={el.image} alt={el.name} width={180} height={180} />
          </li>
        ))}
      </ul>
    </StyledHome>
  );
};

export default HomePage;
