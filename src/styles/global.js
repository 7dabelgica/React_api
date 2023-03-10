import styled, { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  body {
    font-family: sans-serif;
    background-color: #8b4869;
  }

  html, body, #root {
    height: 100%;
  }

  button {
    cursor: pointer;
    height: 40px;
    background-color: #8b4869;
    font-size: 18px;
    font-family: sans-serif;
    color: #f4e9ed;
    border: 1px solid #4d273a98;
    border-radius: 4px;
    font-weight: 700;
    transition: all 300ms;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 70%;
  }

  button:hover {
    filter: brightness(75%);
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  body .Toastify .Toastify__toast-container .Toastify__toast--error {
    background-color: #8b4869;
    color: #f4e9ed;
    font-family: sans-serif;
    font-weight: 700;
  }
`;

export const Container = styled.section`
  max-width: 720px;
  background: #f4e9ed;
  margin: 50px auto;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
  h1 {
    font-size: 40px;
    display: flex;
    align-self: center;
    justify-content: center;
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    display: flex;
    align-self: center;
    justify-content: center;
    padding: 20px;
  }
  h1,
  p {
    color: #9b5b7d;
    font-weight: 700;
  }
`;
