import React from 'react';

import styled from 'styled-components';
import SendIcon from '@mui/icons-material/Send';
import ReactJson from 'react-json-view';
import { Typography } from '@mui/material';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import '../APITest.css';

const StatusSpan = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  ${({ status }) => {
    switch (true) {
      case status >= 400:
        return `color: red`;
      case status >= 300:
        return `color: blue`;
      case status >= 200:
        return `color: #53a158`; // green
      default:
        return `color: gray`;
    }
  }};
`;

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
      <div className="apitest-body-utilbox">
        <StatusSpan status={response.status}>[{response.status}]</StatusSpan>
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
        {typeof response.data === 'object' ? (
          mode === 'dark' ? (
            <ReactJson
              name={null}
              src={response.data}
              theme="monokai"
              style={{ background: '#303336' }}
            />
          ) : (
            <ReactJson name={null} src={response.data} />
          )
        ) : (
          <Typography
            className="result-header-title"
            color="textPrimary"
            variant="h10"
          >
            {response.data}
          </Typography>
        )}
      </div>
    </ThemeProvider>
  );
};

export default ResultBlock;
