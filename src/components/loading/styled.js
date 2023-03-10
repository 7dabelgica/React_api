import styled from 'styled-components';

export const Container = styled.section`
  position: absolute;
  width: 100%;
  height: 100%;
  z-index: 1;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 30px;

  div {
    position: absolute;
    z-index: 1;
    height: 100%;
    width: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
  span {
    z-index: 2;
  }
  .icon {
    height: 80px;
    width: 80px;
  }
`;
