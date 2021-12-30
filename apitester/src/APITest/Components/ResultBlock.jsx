import React from 'react';

import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import ReactJson from 'react-json-view';
import { Typography } from '@mui/material';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

const StyledBackButton = styled.button`
  margin: 0 10px;
  height: 40px;
  width: 70px;
  background-color: #c4c4c4;
  color: black;
  font-weight: bold;
  border-radius: 5px;
  border: 0px solid #5b7ddb;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
`;

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

const lightTheme = createTheme({
  palette: {
    mode: 'light',
  },
});

const ResultBlock = ({ handleBackButton, formik, response, mode }) => {
  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <div className="apitest-body-utilbox result-header">
        <Typography
          className="result-header-title"
          color="textPrimary"
          variant="h6"
        >
          {formik.values.url}
        </Typography>
        <StyledBackButton
          variant="contained"
          endicon={<SendIcon />}
          onClick={handleBackButton}
        >
          <span> Back </span>
        </StyledBackButton>
      </div>
      <div className="result-body">
        {mode === 'dark' ? (
          <ReactJson
            src={response}
            theme="monokai"
            style={{ background: '#303336' }}
          />
        ) : (
          <ReactJson src={response} />
        )}
      </div>
    </ThemeProvider>
  );
};

export default ResultBlock;
