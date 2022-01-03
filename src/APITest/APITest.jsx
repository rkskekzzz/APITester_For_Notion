import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { ContentsBlock, ResultBlock } from './Components';

import urlExist from 'url-exist';
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

const jsonPrettier = (string) => {
  try {
    return JSON.stringify(JSON.parse(string), null, 2);
  } catch {
    return string;
  }
};

/**
 * APITest
 */
const APITest = () => {
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isResponse, setIsResponse] = useState(false);
  const [response, setResponse] = useState([]);
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [mode, setMode] = useState('light');
  const [error, setError] = useState({ url: false, header: false });

  const formik = useFormik({
    initialValues: {
      url: queryData.url,
      header: jsonPrettier(queryData.header),
      body: jsonPrettier(queryData.body),
    },
    onSubmit: (values) => {
      //   formik.resetForm();
    },
  });

  const handleModeButton = (event) => {
    if (mode === 'dark') setMode('light');
    else setMode('dark');
  };
  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleBackButton = (event) => {
    setIsResponse(false);
    setResponse([]);
  };

  const handleSaveButton = async (event) => {
    const url = formik.values.url;
    let headers;
    let body;
    let response;

    setIsLoading(true);

    try {
      let res = await urlExist(url);
      if (!res) throw new Error('No URL');
    } catch (e) {
      setError({ url: true });
      setIsLoading(false);
      setTimeout(() => {
        setError({ url: false });
      }, 2000);
      return;
    }

    try {
      headers = formik.values.header ? JSON.parse(formik.values.header) : '';
    } catch (e) {
      setError({ header: true });
      setIsLoading(false);
      setTimeout(() => {
        setError({ header: false });
      }, 2000);
      return;
    }

    body = formik.values.body ? JSON.parse(formik.values.body) : '';

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
    setIsResponse(true);
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
          {isResponse && (
            <ResultBlock
              handleBackButton={handleBackButton}
              formik={formik}
              response={response}
              mode={mode}
            />
          )}
          {!isResponse && (
            <ContentsBlock
              selectedMethod={selectedMethod}
              handleChange={handleChange}
              handleSaveButton={handleSaveButton}
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
