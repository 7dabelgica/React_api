import * as types from '../types';

const initialState = {
  botaoClicado: false,
};

// eslint-disable-next-line
export default function (state = initialState, action) {
  switch (action.type) {
    case types.BOTAO_CLICADO_SUCCESS: {
      const newState = { ...state };
      newState.botaoClicado = !newState.botaoClicado;
      return newState;
    }
    case types.BOTAO_CLICADO_REQUEST: {
      console.log('requisition');
      return state;
    }
    case types.BOTAO_CLICADO_FAILURE: {
      console.log('error');
      return state;
    }

    default: {
      return state;
    }
  }
}
