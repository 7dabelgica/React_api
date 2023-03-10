import styled from 'styled-components';

export const Form = styled.form`
  display: flex;
  margin-top: 20px;
  flex-direction: column;
  input {
    margin: 5px 20px;
    width: 60%;
    height: 40px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 2px solid #ddd;
    font-size: 18px;
  }
  & :focus {
    border: 1px solid #8b4869;
  }
  label {
    margin-bottom: 20px;
    font-family: 'Courier New', Courier, monospace;
  }
`;
