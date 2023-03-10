import { get } from 'lodash';
import { toast } from 'react-toastify';
import { call, put, all, takeLatest } from 'redux-saga/effects';

import axios from '../../../services/axios';
import history from '../../../services/index';
import * as types from '../types';
import * as actions from './actions';

function* loginRequest({ payload }) {
  try {
    const response = yield call(axios.post, '/tokens', payload);
    yield put(actions.loginSuccess({ ...response.data }));
    toast.success('Parabéns, você fez login com sucesso!');

    axios.defaults.headers.Authorization = `Bearer ${response.data.token}`;

    history.push(payload.prevPath);
  } catch (e) {
    toast.error('Usuário ou senha invalidos, não foi possivel fazer login');
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }) {
  const token = get(payload, 'auth.token', '');
  if (!token) return;
  axios.defaults.headers.Authorization = `Bearer ${token}`;
}

function* registerRequest({ payload }) {
  const { email, nome, id, password } = payload;

  try {
    if (id) {
      yield call(axios.put, './users/', {
        email,
        nome,
        password: password || undefined,
      });

      toast.success('Parabéns sua conta foi editada com sucesso');

      yield put(actions.registerSuccess({ email, nome, password }));
    } else {
      yield call(axios.post, './users/', {
        email,
        nome,
        password,
      });

      toast.success('Parabéns sua conta foi criada com sucesso');

      yield put(actions.registerSuccess({ email, nome, password }));
      yield put(actions.loginRequest({ email, nome, password }));
    }
  } catch (e) {
    const errors = get(e, 'response.data.errors', []);
    // const status = get(e, 'response.status', 0);

    if (errors.length > 0) {
      errors.map((error) => toast.error(error));
    } else {
      toast.error('Erro desconhecido');
    }

    yield put(actions.registerFailure());
  }
}

export default all([
  takeLatest(types.LOGIN_REQUEST, loginRequest),
  takeLatest(types.PERSIST_DEHYDRATE, persistRehydrate),
  takeLatest(types.REGISTER_REQUEST, registerRequest),
]);
