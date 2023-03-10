import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { isEmail, isInt, isFloat } from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { get } from 'lodash';
import PropTypes from 'prop-types';
import { FaUserCircle, FaEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';

import axios from '../../services/axios';
import history from '../../services';
import { Container } from '../../styles/global';
import { Form, ProfilePicture } from './styled';
import Loading from '../../components/loading';
import * as actions from '../../store/modules/auth/actions';

export default function Aluno({ match }) {
  const dispatch = useDispatch();
  const id = get(match, 'params.id', 0);
  const [email, setEmail] = useState('');
  const [nome, setNome] = useState('');
  const [sobrenome, setSobrenome] = useState('');
  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [idade, setIdade] = useState('');
  const [foto, setFoto] = useState('');
  const isLoading = useSelector((state) => state.auth.isLoading);

  React.useEffect(() => {
    if (!id) return;
    async function getData() {
      try {
        const { data } = await axios.get(`./alunos/${id}/`);
        const Foto = get(data, 'Midia[0].url', '');
        setFoto(Foto);
        setNome(data.nome);
        setSobrenome(data.sobrenome);
        setEmail(data.email);
        setIdade(data.idade);
        setPeso(data.peso);
        setAltura(data.altura);
      } catch (err) {
        const status = get(err, 'response.status', 0);
        const errors = get(err, 'response.data.errors', 0);

        if (status === 400) errors.map((error) => toast.error(error));
        history.push('./');
      }
    }
    getData();
  }, [id]);

  async function HandleSubmit(e) {
    e.preventDefault();
    let formErrors = false;

    if (nome.length < 5 || nome.length > 21) {
      formErrors = true;
      toast.error('Nome precisa conter de 5 a 21 caracteres');
    }

    if (sobrenome.length < 5 || sobrenome.length > 21) {
      formErrors = true;
      toast.error('Sobrenome precisa conter de 4 a 21 caracteres');
    }

    if (!isInt(String(idade))) {
      formErrors = true;
      toast.error('Idade invalida');
    }

    if (!isFloat(String(altura))) {
      formErrors = true;
      toast.error('Altura invalida');
    }

    if (!isFloat(String(peso))) {
      formErrors = true;
      toast.error('Peso invalido');
    }

    if (!isEmail(email)) {
      formErrors = true;
      toast.error('Email invalido');
    }

    if (formErrors) return;

    try {
      if (id) {
        await axios.put(`./alunos/${id}`, {
          nome,
          sobrenome,
          email,
          peso,
          idade,
          altura,
        });

        toast.success('Aluno(a) editado com sucesso');
      } else {
        const { data } = await axios.post('./alunos', {
          nome,
          sobrenome,
          email,
          peso,
          idade,
          altura,
        });

        toast.success('Aluno(a) criado com sucesso');

        history.push(`/aluno/${data.id}/edit`);
      }
    } catch (err) {
      const status = get(err, 'response.status', 0);
      const data = get(err, 'response.data', []);
      const errors = get(data, 'data.errors', 0);

      if (errors.length > 0) {
        errors.map((error) => toast.error(error));
      }
      if (status === 401) {
        dispatch(actions.loginFailure());
      }
    }
  }

  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>{id ? 'Editar aluno' : 'Crie aluno'}</h1>

      <ProfilePicture>
        {foto ? <img src={foto} alt={nome} /> : <FaUserCircle size="120" />}
        <Link to={`/fotos/${id}`}>
          <FaEdit size="18" />
        </Link>
      </ProfilePicture>

      <Form onSubmit={HandleSubmit}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
        />
        <input
          type="text"
          value={sobrenome}
          onChange={(e) => setSobrenome(e.target.value)}
          placeholder="Sobrenome"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
        />
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          placeholder="Idade"
        />
        <input
          type="text"
          value={altura}
          onChange={(e) => setAltura(e.target.value)}
          placeholder="Altura"
        />
        <input
          type="text"
          value={peso}
          onChange={(e) => setPeso(e.target.value)}
          placeholder="Peso"
        />
        <button type="submit">Enviar</button>
      </Form>
    </Container>
  );
}

Aluno.propTypes = {
  match: PropTypes.shape({}).isRequired,
};
