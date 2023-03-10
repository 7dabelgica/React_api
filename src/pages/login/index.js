import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import { Container } from '../../styles/global';

import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';
import Loading from '../../components/loading';

export default function Login(props) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const prevPath = get(props, 'location.state.prevPath', '/');
  const isLoading = useSelector((state) => state.auth.isLoading);

  async function handleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (password.length < 8 || password.length > 21) {
      formErrors = true;
      toast.error('Senha invalida');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email invalido');
    }

    if (formErrors) return;

    dispatch(actions.loginRequest({ email, password, prevPath }));
  }
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>Faça login</h1>
      <Form onSubmit={handleSubmit}>
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
        <button type="submit">Acessar</button>
      </Form>
    </Container>
  );
}
