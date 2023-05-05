import { LoadingContext } from '@/contexts/loading.context';
import { IProducts } from '@/interfaces/products.interfaces';
import { StyledInput } from '@/styles/input.styles';
import { StyledLabel } from '@/styles/label.styles';
import { StyledProduct } from '@/styles/pageProduct.styles';
import axios from 'axios';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React from 'react';
import { toast } from 'react-toastify';

const ProductPage = () => {
  const loadingContext = React.useContext(LoadingContext);

  const [product, setProduct] = React.useState<IProducts | null>(null);

  const [count, setCount] = React.useState(0);

  const router = useRouter();

  const id = router.query.id;

  React.useEffect(() => {
    if (id) {
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
  }, [id]);

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
            {Number(product?.price).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </h2>
          <form>
            <div>
              {
                <>
                  <StyledInput
                    type="text"
                    id="email"
                    name="email"
                    placeholder=" "
                  />

                  <StyledLabel>Nome do personagem</StyledLabel>
                </>
              }

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
