import { StyledHome } from '@/styles/home.styles';
import Image from 'next/image';

const HomePage = () => {
  return (
    <StyledHome>
      <ul>
        <li>
          <Image
            src="/image/tibiacoins.png"
            alt="Tibia Coins"
            width={180}
            height={180}
          />
        </li>

        <li>
          <Image
            src="/image/tibiacoins.png"
            alt="Tibia Coins"
            width={180}
            height={180}
          />
        </li>
      </ul>
    </StyledHome>
  );
};

export default HomePage;
