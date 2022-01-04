import LoadingButton from '@mui/lab/LoadingButton';
import { Button } from '@mui/material';
import { styled } from '@mui/system';

const StyledButton = ({ method }) => ({
  margin: '0 10px',
  width: '90px',
  height: '40px',
  color: 'white',
  fontWeight: 'bold',
  borderRadius: '5px',
  border: '0px solid white',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-evenly',
  cursor: 'pointer',

  backgroundColor: (() => {
    switch (method) {
      case 'GET':
        return 'blue';
      case 'POST':
        return '#53a158';
      case 'PUT':
        return '#d9bc22';
      case 'DELETE':
        return 'red';
      default:
        return 'gray';
    }
  })(),

  '&: hover': {
    backgroundColor: (() => {
      switch (method) {
        case 'GET':
          return '#000000FFbb';
        case 'POST':
          return '#53a158bb';
        case 'PUT':
          return '#d9bc22bb';
        case 'DELETE':
          return '#ff0000bb';
        default:
          return 'gray';
      }
    })(),
  },
});

export const SendButton = styled(LoadingButton)(StyledButton);
export const BackButton = styled(Button)(StyledButton);
