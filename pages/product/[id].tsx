import { LoadingContext } from '@/contexts/loading.context';
import { UserContext } from '@/contexts/user.context';
import { IProductBuyReq, IProducts } from '@/interfaces/products.interfaces';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledProduct } from '@/styles/pageProduct.styles';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import * as yup from 'yup';

const ProductPage = () => {
  const loadingContext = React.useContext(LoadingContext);

  const userContext = React.useContext(UserContext);

  const [product, setProduct] = React.useState<IProducts | null>(null);

  const [count, setCount] = React.useState<number>(25);

  const router = useRouter();

  const id = router.query.id;

  const { register, handleSubmit } = useForm<IProductBuyReq>({
    resolver: yupResolver(
      yup.object().shape({
        character: yup.string().optional(),
        count: yup.number().optional(),
      })
    ),
  });

  const handle = async (data: IProductBuyReq) => {
    loadingContext.setLoading(true);

    if (data.character === '') {
      loadingContext.setLoading(false);
      return toast.error('Este char não existe.');
    }

    if (router.pathname === '/product/[id]' && data.character) {
      if (data.count === undefined || data.count <= 0) {
        loadingContext.setLoading(false);
        return toast.error('Você deve comprar 25 ou mais TC.');
      }

      const res = await axios.get(
        `https://api.tibiadata.com/v3/character/${data.character}`
      );

      if (!res.data.characters.character.name) {
        loadingContext.setLoading(false);
        return toast.error('Este char não existe.');
      }

      const newProduct = {
        id: userContext.cart.length,
        name: product?.name!,
        count: Number(data.count),
        price: Number(((product?.price! / 250) * count).toFixed(2)),
        character: data.character,
        image: product?.image!,
      };

      userContext.setCart([newProduct, ...userContext.cart]);

      return loadingContext.setLoading(false);
    }

    for (const key in data) {
      if (data.hasOwnProperty(key) && data[key] === '') {
        delete data[key];
      }
    }

    const newProduct = {
      id: userContext.cart.length,
      name: product?.name!,
      count: 1,
      price: Number(product?.price!),
      image: product?.image!,
    };

    userContext.setCart([newProduct, ...userContext.cart]);

    return loadingContext.setLoading(false);
  };

  React.useEffect(() => {
    if (id && userContext.categories) {
      const getProduct = async () => {
        loadingContext.setLoading(true);

        try {
          const { data } = await axios.get(`/api/products/${id}`);

          setProduct(data);
        } catch (e: any) {
          toast.error(e.response.data.message, {
            autoClose: 5000,
            className: 'my-toast-error',
          });
        } finally {
          loadingContext.setLoading(false);
        }
      };

      getProduct();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, userContext.categories]);

  return (
    <StyledProduct>
      <section>
        <div
          style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
        >
          <Image
            src={product?.image!}
            alt={product?.name!}
            width={280}
            height={280}
          />
        </div>

        <div style={{ width: '100%' }}>
          <h2>
            {product?.name} -{' '}
            {product?.name.toLocaleLowerCase() === 'tibia coins'
              ? ((Number(product?.price) / 250) * count).toLocaleString(
                  'pt-BR',
                  {
                    style: 'currency',
                    currency: 'BRL',
                  }
                )
              : Number(product?.price).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
          </h2>
          <form onSubmit={handleSubmit(handle)}>
            <div>
              {product?.name.toLocaleLowerCase() === 'tibia coins' && (
                <>
                  <StyledInput
                    {...register('character')}
                    type="text"
                    id="character"
                    name="character"
                    placeholder=" "
                  />

                  <StyledLabel>Nome do personagem</StyledLabel>

                  <p>
                    <strong>Quantidade: </strong>
                    {count} {product?.name}
                  </p>

                  <input
                    type="range"
                    step="25"
                    min="25"
                    max={product?.stock}
                    value={count}
                    {...register('count')}
                    onChange={(e) => setCount(Number(e.target.value))}
                  />
                </>
              )}

              <p>
                <strong>Descrição: </strong>
                {product?.description}
              </p>

              <button type="submit">Adicionar no carrinho</button>
            </div>
          </form>
        </div>
      </section>
    </StyledProduct>
  );
};

export default ProductPage;
