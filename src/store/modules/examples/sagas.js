import { call, all, put, takeLatest } from 'redux-saga/effects';
import * as types from '../types';
import * as actions from './actions';

const requisition = () =>
  // eslint-disable-next-line
  new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve();
    }, 600);
  });

function* exampleRequest() {
  try {
    yield call(requisition);
    yield put(actions.clickBtnSuccess());
  } catch {
    yield put(actions.clickBtnFailure());
  }
}
export default all([takeLatest(types.BOTAO_CLICADO_REQUEST, exampleRequest)]);
