import * as types from '../types';

export function clickBtnRequest() {
  return {
    type: types.BOTAO_CLICADO_REQUEST,
  };
}
export function clickBtnFailure() {
  return {
    type: types.BOTAO_CLICADO_FAILURE,
  };
}
export function clickBtnSuccess() {
  return {
    type: types.BOTAO_CLICADO_SUCCESS,
  };
}
