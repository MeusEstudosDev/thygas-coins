import CreateCategoryModal from '@/components/modal/createCategory.component';
import CreateProductModal from '@/components/modal/createProduct.component';
import DeleteCategoryModal from '@/components/modal/deleteCategory.component';
import DeleteProductModal from '@/components/modal/deleteProduct.component';
import DeleteUserModal from '@/components/modal/deleteUser.component';
import EditCategoryModal from '@/components/modal/editCategory.component';
import EditProductModal from '@/components/modal/editProduct.component';
import EditUserModal from '@/components/modal/editUser.component';
import { UserContext } from '@/contexts/user.context';
import { IProducts } from '@/interfaces/products.interfaces';
import { StyledAdmin } from '@/styles/admin.styles';
import { StyledSelect } from '@/styles/select.styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

  const [filterCategories, setFilterCategories] = useState('all');

  const [filter, setFilter] = useState<IProducts[]>();

  React.useEffect(() => {
    if (filterCategories === 'all') {
      return setFilter(userContext.products);
    }

    const filterProducts = userContext.products.filter(
      (el) => el.categoryId === filterCategories
    );

    setFilter(filterProducts);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filterCategories]);

  React.useEffect(() => {
    if (userContext.user && !userContext.user?.isAdmin) {
      toast.error('Você não tem permissão.');

      router.push('/');
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userContext.user]);

  return (
    <>
      {userContext.modalUserEdit && <EditUserModal />}
      {userContext.modalUserDelete && <DeleteUserModal />}

      {userContext.modalProductCreate && <CreateProductModal />}
      {userContext.modalProductEdit && <EditProductModal />}
      {userContext.modalProductDelete && <DeleteProductModal />}

      {userContext.modalCategoryCreate && <CreateCategoryModal />}
      {userContext.modalCategoryEdit && <EditCategoryModal />}
      {userContext.modalCategoryDelete && <DeleteCategoryModal />}
      <StyledAdmin>
        <section>
          <h2 style={{ width: '100%' }}>Minha conta</h2>
          <div>
            <p>
              <strong>Nome: </strong>
              {userContext.user?.name}
            </p>
            <p>
              <strong>E-mail: </strong>
              {userContext.user?.email}
            </p>
            <p>
              <strong>Cadastro: </strong>
              {userContext.user?.registered_at
                .toString()
                .split('T')[0]
                .split('-')
                .reverse()
                .join('/')}
            </p>
          </div>

          <button
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalUserEdit(true);
            }}
          >
            Editar
          </button>
        </section>

        <section>
          <h2 style={{ width: '100%' }}>Categorias</h2>

          <button
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalCategoryCreate(true);
            }}
          >
            Adicionar
          </button>

          <ul>
            {userContext.categories.map((el) => (
              <li key={el.id}>
                <h2>{el.name}</h2>

                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      userContext.setCategoryInfo(el);
                      userContext.setModalCategoryEdit(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      userContext.setCategoryInfo(el);
                      userContext.setModalCategoryDelete(true);
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>

        <section>
          <h2 style={{ width: '100%' }}>Produtos</h2>

          <button
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalProductCreate(true);
            }}
          >
            Adicionar
          </button>

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
              <li key={el.id}>
                <h2>{el.name}</h2>
                <p>
                  <strong>Preço: </strong>
                  {Number(el.price).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </p>
                <p>
                  <strong>Estoque: </strong>
                  {el.stock}
                </p>
                <Image src={el.image} alt={el.name} width={180} height={180} />
                <p>
                  <strong>Descrição: </strong>
                  {el.description}
                </p>
                <div>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      userContext.setProductInfo(el);
                      userContext.setModalProductEdit(true);
                    }}
                  >
                    Editar
                  </button>
                  <button
                    onClick={(event) => {
                      event.preventDefault();
                      userContext.setProductInfo(el);
                      userContext.setModalProductDelete(true);
                    }}
                  >
                    Deletar
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </section>
      </StyledAdmin>
    </>
  );
};

export default AdminPage;
