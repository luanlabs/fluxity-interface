import styled from 'styled-components';

interface ICircle {
  isopen?: boolean | undefined;
}

export const Circle = styled.div<ICircle>`
  display: flex;
  align-items: center;
  padding: ${({ isopen }) => (isopen ? '15px' : '0')};
  justify-content: ${({ isopen }) => (isopen ? 'end' : 'center')};
  width: ${({ isopen }) => (isopen ? '257px' : '48px')};
  height: ${({ isopen }) => (isopen ? '48px' : '48px')};
  border: 1px solid ${({ theme }) => theme.colors.midnightBlue};
  border-radius: 30px;
  cursor: pointer;
  overflow: hidden;
  transition: ${({ isopen }) => (isopen ? 'all 600ms' : '')};
`;
