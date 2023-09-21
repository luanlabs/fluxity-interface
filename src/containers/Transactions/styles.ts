import styled from 'styled-components';

export const Circle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 52px;
  height: 52px;
  border: 1px solid ${({ theme }) => theme.colors.midnightblue};
  border-radius: 30px;
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.colors.lavenderblush};
    transition: all 700ms;
  }
`;
