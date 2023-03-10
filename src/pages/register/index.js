import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useSelector, useDispatch } from 'react-redux';

import { Container } from '../../styles/global';
import { Form } from './styled';
import Loading from '../../components/loading';
import * as action from '../../store/modules/auth/actions';

export default function Register() {
  const dispatch = useDispatch();
  const id = useSelector((state) => state.auth.user.id);
  const nomeStored = useSelector((state) => state.auth.user.nome);
  const emailStored = useSelector((state) => state.auth.user.email);
  const isLoading = useSelector((state) => state.auth.isLoading);

  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  React.useEffect(() => {
    if (!id) return;
    setNome(nomeStored);
    setEmail(emailStored);
  }, [emailStored, nomeStored, id]);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 4 || nome.length > 21) {
      formErrors = true;
      toast.error('Nome precisa conter de 4 a 21 caracteres');
    }

    if (!id && (password.length < 4 || password.length > 21)) {
      formErrors = true;
      toast.error('Senha precisa conter de 8 a 21 caracteres');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email precisa ser valido');
    }

    if (formErrors) return;

    dispatch(action.registerRequest({ email, nome, password, id }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar conta' : 'Crie sua conta'}</h1>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="nome">
          Nome:
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
          />
        </label>
        <label htmlFor="email">
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu email"
          />
        </label>
        <label htmlFor="password">
          Senha:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Sua senha"
          />
        </label>
        <button type="submit">Salvar</button>
      </Form>
    </Container>
  );
}
