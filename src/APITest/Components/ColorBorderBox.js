import styled from 'styled-components';

export const ColorBorderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 5px 10px 0;

  ${({ method }) => {
    console.log(method);
    switch (method) {
      case 'GET':
        return `border-bottom: 1px solid blue`;
      case 'POST':
        return `border-bottom: 1px solid #53a158`;
      case 'PUT':
        return `border-bottom: 1px solid #f7dc4a`;
      case 'DELETE':
        return `border-bottom: 1px solid red`;
      default:
        return `border-bottom: 1px solid gray`;
    }
  }};
`;
