import React from 'react';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { toast } from 'react-toastify';
import axios from '../../services/axios';
import { Container } from '../../styles/global';
import Loading from '../../components/loading';
import history from '../../services/index';
import { Form } from './styled';
import * as actions from '../../store/modules/auth/actions';

export default function Fotos({ match }) {
  const id = get(match, 'params.id', '');
  const dispatch = useDispatch();

  const [foto, setFoto] = React.useState('');
  const [isloading, setIsloading] = React.useState('');

  React.useEffect(() => {
    const getData = async () => {
      try {
        setIsloading(true);
        const { data } = await axios.get(`/alunos/${id}`);
        setFoto(get(data, 'Midia[0].url', ''));
        setIsloading(false);
      } catch (e) {
        setIsloading(false);
        toast.error('Foto não encontrada');
        history.push('/');
      }
    };
    getData();
  }, [id]);

  const handleOnChange = async (e) => {
    const file = e.target.files[0];
    const fotoURL = URL.createObjectURL(file);

    setFoto(fotoURL);

    const formData = new FormData();
    formData.append('aluno_id', id);
    formData.append('midia', file);

    try {
      setIsloading(true);
      await axios.post('/midias/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      toast.success('Foto carregada com sucesso');
      setIsloading(false);
    } catch (err) {
      setIsloading(false);
      const { status } = get(err, 'response', '');
      toast.error('Erro ao processar a foto');
      if (status === 401) dispatch(actions.loginFailure());
    }
  };

  return (
    <Container>
      <Loading isloading={isloading} />
      <h1>Fotos</h1>
      <Form>
        <label htmlFor="Midia">
          {foto ? <img src={foto} alt="Foto" /> : 'Selecionar'}
          <input type="file" id="Midia" onChange={handleOnChange} />
        </label>
      </Form>
    </Container>
  );
}

Fotos.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
