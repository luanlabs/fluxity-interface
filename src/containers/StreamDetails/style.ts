import styled from 'styled-components';

export const ProgressStyle = styled.div`
  .bar {
    background-color: #442cd6;
    width: 100%;
    height: 48px;
    border-radius: 9px;
    overflow: hidden;
    position: relative;
    border: 1px solid #fff;
  }

  .progress {
    width: 0%;
    height: 48px;
    background: linear-gradient(to right, #ffffff 0%, #ffffff 30%, #a5f3c0 100%);
    transition: width 1600ms ease-in-out;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
