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

    if (filterCategories === 'all' && userContext.homeSearch === '') {
      return setFilter(list);
    }

    const filterProducts = list.filter((el) => {
      if (userContext.homeSearch !== '') {
        if (
          el.name.toLowerCase().includes(userContext.homeSearch.toLowerCase())
        ) {
          return el;
        } else if (
          userContext.categories.some(
            (elem) =>
              elem.id === el.categoryId &&
              elem.name
                .toLowerCase()
                .includes(userContext.homeSearch.toLowerCase())
          )
        ) {
          return el;
        }
      } else {
        if (el.categoryId === filterCategories) return el;
      }
    });

    setFilter(filterProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.products, filterCategories, userContext.homeSearch]);

  return (
    <StyledHome>
      {userContext.homeSearch === '' ? (
        <div>
          <StyledSelect
            onChange={(e) => setFilterCategories(e.target.value)}
            value={filterCategories}
          >
            <option value="all">Todas categorias</option>
            {userContext.categories.map((el) => (
              <option key={el.id} value={el.id}>
                {el.name}
              </option>
            ))}
          </StyledSelect>
        </div>
      ) : (
        <div>
          <button
            onClick={() => {
              setFilterCategories('all');
              userContext.setHomeSearch('');
            }}
          >
            Todas categorias
          </button>
        </div>
      )}

      <ul>
        {filterCategories === 'all' && userContext.homeSearch === ''
          ? userContext.categories.map((el) => (
              <li key={el.id} onClick={() => setFilterCategories(el.id)}>
                <Image src={el.image} alt={el.name} width={180} height={180} />
              </li>
            ))
          : filter?.map((el) => (
              <li
                key={el.id}
                onClick={() => {
                  router.push(`/product/${el.id}`);
                }}
              >
                <h2>{el.name}</h2>
                <Image src={el.image} alt={el.name} width={180} height={180} />
                <h2>
                  {Number(el.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </h2>
              </li>
            ))}
      </ul>
    </StyledHome>
  );
};

export default HomePage;
