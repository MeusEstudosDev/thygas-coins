import { UserContext } from '@/contexts/user.context';
import { IProducts } from '@/interfaces/products.interfaces';
import { StyledHome } from '@/styles/home.styles';
import { StyledSelect } from '@/styles/select.styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';

const HomePage = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const [filterCategories, setFilterCategories] = React.useState('all');

  const [filter, setFilter] = React.useState<IProducts[]>();

  React.useEffect(() => {
    const list = userContext.products.filter((el) => el.stock > 0);

    if (filterCategories === 'all') {
      return setFilter(list);
    }

    const filterProducts = list.filter(
      (el) => el.categoryId === filterCategories
    );

    setFilter(filterProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.products, filterCategories]);

  return (
    <StyledHome>
      <div>
        <StyledSelect onChange={(e) => setFilterCategories(e.target.value)}>
          <option value="all">Todas categorias</option>
          {userContext.categories.map((el) => (
            <option key={el.id} value={el.id}>
              {el.name}
            </option>
          ))}
        </StyledSelect>
      </div>
      <ul>
        {filter?.map((el) => (
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
