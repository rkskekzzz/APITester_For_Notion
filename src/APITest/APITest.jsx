import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { ContentsBlock, ResultBlock } from './Components';
import { jsonPrettier } from './Utils/jsonUtils';
import { validUrl, validHeader, validBody } from './Utils/validUtils';

import { useFormik } from 'formik';
import QueryString from 'qs';
import axios from 'axios';
import Loader from 'react-loader-spinner';

import { createTheme } from '@mui/material';
import { ThemeProvider } from '@mui/material';

import styled from 'styled-components';
import './APITest.css';

/**
 * Styled-Components
 */

const StyledBox = styled.div`
  margin: 20px;
  padding: 20px;
  border: 2px solid red;
  border-radius: 15px;
  ${({ method }) => {
    switch (method) {
      case 'GET':
        return `border-color: blue`;
      case 'POST':
        return `border-color: #53a158`;
      case 'PUT':
        return `border-color: #f7dc4a`;
      case 'DELETE':
        return `border-color: red`;
      default:
        return `border-color: gray`;
    }
  }};
`;

const StyledBackground = styled.div`
  height: 100%;
  color: white;
  padding: 10px;
  ${({ mode }) => {
    if (mode === 'dark') return `background: #2f3336`;
    else return `background: white`;
  }}
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

/**
 * APITest
 */
const APITest = () => {
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isResponsed, setIsResponsed] = useState(false);
  const [response, setResponse] = useState({});
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [mode, setMode] = useState('light');
  const [error, setError] = useState({ url: false, header: false });

  const formik = useFormik({
    initialValues: {
      url: queryData.url,
      header: jsonPrettier(queryData.header),
      body: jsonPrettier(queryData.body),
    },
    onSubmit: () => {}
  });

  const handleModeButton = (event) => {
    if (mode === 'dark') setMode('light');
    else setMode('dark');
  };

  const handleMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleBackButton = (event) => {
    setIsResponsed(false);
    setResponse({});
  };

  const toggleError = (error) => { // url for header
    const initError = { url: false, header: false }
    const newError = { url: false, header: false }
    newError[error] = true;
    setError(newError);
    setIsLoading(false);
    setTimeout(() => setError(initError), 2000);
  }

  const handleSendButton = async (event) => {
    let url, headers, body;
    let response;

    setIsLoading(true);

    try {
      url = validUrl(formik.values.url);
      headers = validHeader(formik.values.header);
      body = validBody(formik.values.body)
    } catch (e) {
      return toggleError(e.message);
    }

    try {
      switch (selectedMethod) {
        case 'GET':
          response = await axios.get(url, {
            headers: headers,
          });
          console.log(response);
          break;
        case 'POST':
          response = await axios.post(url, body, {
            headers: headers,
          });
          break;
        case 'PUT':
          response = await axios.put(url, body, {
            headers: headers,
          });
          break;
        case 'DELETE':
          response = await axios.delete(url, body, {
            headers: headers,
          });
          break;
        default:
          setIsLoading(false);
          return;
      }
      setResponse(response);
    } catch (e) {
      setIsLoading(false);
      return;
    }
    setIsResponsed(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (queryData.method !== undefined)
      setSelectedMethod(queryData.method.toUpperCase());
    if (queryData.mode !== undefined) setMode(queryData.mode);
  }, []);

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <StyledBackground mode={mode}>
        {isLoading && (
          <div className="loader">
            <Loader type="Rings" color="#00BFFF" height={200} width={200} />
          </div>
        )}
        <StyledBox method={selectedMethod}>
          {isResponsed && (
            <ResultBlock
              handleBackButton={handleBackButton}
              formik={formik}
              response={response}
              mode={mode}
            />
          )}
          {!isResponsed && (
            <ContentsBlock
              selectedMethod={selectedMethod}
              handleMethod={handleMethod}
              handleSendButton={handleSendButton}
              handleModeButton={handleModeButton}
              formik={formik}
              error={error}
              mode={mode}
            />
          )}
        </StyledBox>
      </StyledBackground>
    </ThemeProvider>
  );
};

export default APITest;
