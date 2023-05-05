import { UserContext } from '@/contexts/user.context';
import { IProducts } from '@/interfaces/products.interfaces';
import { StyledHome } from '@/styles/home.styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const [products, setProducts] = React.useState<IProducts[]>([]);

  React.useEffect(() => {
    const filter = () => {
      const list = userContext.products.filter((el) => el.stock > 0);

      setProducts(list);
    };

    filter();
  }, [userContext.products]);

  return (
    <StyledHome>
      <ul>
        {products.map((el) => (
          <li
            key={el.id}
            onClick={() => {
              router.push(`/product/${el.id}`);
            }}
          >
            <h2>{el.name}</h2>
            <Image src={el.image} alt={el.name} width={180} height={180} />
          </li>
        ))}
      </ul>
    </StyledHome>
  );
};

export default HomePage;
