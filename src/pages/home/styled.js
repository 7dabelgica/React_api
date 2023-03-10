import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const ContainerAluno = styled.div`
  margin-top: 20px;
  div {
    padding: 5px 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  div + div {
    border-top: 1px solid #eee;
  }
`;

export const Profilepic = styled.div`
  img {
    height: 60px;
    width: 60px;
    border-radius: 50%;
  }
`;

export const AddAluno = styled(Link)`
  font-family: sans-serif;
  font-weight: 700;
  color: #9b5b7d;
  padding: 0px 20px;
`;
