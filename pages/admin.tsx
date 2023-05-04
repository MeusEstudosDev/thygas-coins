import CreateProductModal from '@/components/modal/createProduct.component';
import DeleteUserModal from '@/components/modal/deleteUser.component';
import EditUserModal from '@/components/modal/editUser.component';
import { UserContext } from '@/contexts/user.context';
import { StyledAdmin } from '@/styles/admin.styles';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import { toast } from 'react-toastify';

const AdminPage = () => {
  const userContext = React.useContext(UserContext);

  const router = useRouter();

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
      {userContext.modalProductEdit}
      {userContext.modalProductDelete}
      <StyledAdmin>
        <section>
          <h2 style={{ width: '110px' }}>Minha conta</h2>
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
          <h2 style={{ width: '110px' }}>Produtos</h2>

          <button
            onClick={(event) => {
              event.preventDefault();
              userContext.setModalUserEdit(true);
            }}
          >
            Adicionar
          </button>

          <ul>
            {userContext.products.map((el) => (
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
                      userContext.setModalProductCreate(true);
                    }}
                  >
                    Editar
                  </button>
                  <button>Deletar</button>
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
