import styled from 'styled-components';

export const Form = styled.form`
  input {
    display: none;
  }

  label {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 180;
    width: 180px;
    border: 5px dashed #8b4869;
    overflow: hidden;
    margin: 30px auto;
    cursor: pointer;
    background: #eee;
    border-radius: 50%;
  }

  img {
    height: 180px;
    width: 180px;
    border-radius: 50%;
  }
`;
