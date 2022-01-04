import styled from 'styled-components';

export const ColorBorderBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 5px;
  padding: 5px;

  ${({ method }) => {
    console.log(method);
    switch (method) {
      case 'GET':
        return `background:  #0000ff20`;
      case 'POST':
        return `background: #53a15820`;
      case 'PUT':
        return `background: #d9bc2220`;
      case 'DELETE':
        return `background: #ff000020`;
      default:
        return `background: gray`;
    }
  }};
`;
