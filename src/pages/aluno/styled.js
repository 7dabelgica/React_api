import styled from 'styled-components';

export const Form = styled.form`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  size: 100%;

  input {
    margin: 5px 20px;
    width: 70%;
    height: 40px;
    padding: 15;
    display: flex;
    flex-direction: column;
    border-radius: 4px;
    border: 2px solid #ddd;
    font-size: 18px;
  }
  & :focus {
    border: 1px solid #8b4869;
  }
`;

export const ProfilePicture = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  padding: 0 0 25px;

  img {
    width: 120px;
    height: 120pxs;
    border-radius: 50%;
  }

  a {
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    border-radius: 50%;
    border: none;
    color: #fff;
    background: #8b4869;
    height: 30px;
    width: 30px;
    bottom: 0;
  }
`;
