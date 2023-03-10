import React, { useState } from 'react';
import {
  FaEdit,
  FaUserCircle,
  FaWindowClose,
  FaExclamationCircle,
} from 'react-icons/fa';
// import { Link } from 'react-router-dom';
import { get } from 'lodash';

import { toast } from 'react-toastify';
// import { Link } from 'react-router-dom';
import { ContainerAluno, Profilepic, AddAluno } from './styled';
import { Container } from '../../styles/global';
import axios from '../../services/axios';
import Loading from '../../components/loading';

export default function Home() {
  const [alunos, setAlunos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  React.useEffect(() => {
    async function getData() {
      setIsLoading(true);
      const response = await axios.get('/alunos');
      setAlunos(response.data);
      setIsLoading(false);
    }

    getData();
  }, []);

  const handleDelete = async (e, id, index) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      await axios.delete(`./alunos/${id}`);
      const novosAlunos = [...alunos];
      novosAlunos.splice(index, 1);
      setAlunos(novosAlunos);
      setIsLoading(false);
    } catch (err) {
      const status = get(err, 'response.status', 0);
      if (status === 401) {
        toast.error('Você precisa fazer login');
      } else {
        toast.error('Ocorreu um erro ao fazer login');
      }
    }
    setIsLoading(false);
  };

  const handleAsk = (e) => {
    e.preventDefault();
    const exclamation = e.currentTarget.nextSibling;
    exclamation.setAttribute('display', 'block');
    e.currentTarget.remove();
  };
  return (
    <Container>
      <Loading isLoading={isLoading} />
      <h1>
        Alunos
        <AddAluno to="./aluno/">+</AddAluno>
      </h1>

      <ContainerAluno>
        {alunos.map((aluno, index) => (
          <div key={String(aluno.id)}>
            <Profilepic>
              {get(aluno, 'Midia[0].url', false) ? (
                <img src={aluno.Midia[0].url} alt="" />
              ) : (
                <FaUserCircle size={60} />
              )}
            </Profilepic>
            <span>{aluno.nome} </span>
            <span>{aluno.email} </span>
            <div>
              <AddAluno to={`/aluno/${aluno.id}/edit`}>
                <FaEdit size={16} />
              </AddAluno>

              <AddAluno onClick={handleAsk} to="/">
                <FaWindowClose size={16} />
              </AddAluno>
              <FaExclamationCircle
                size={16}
                cursor="pointer"
                display="none"
                onClick={(e) => handleDelete(e, aluno.id, index)}
              />
            </div>
          </div>
        ))}
      </ContainerAluno>
    </Container>
  );
}
