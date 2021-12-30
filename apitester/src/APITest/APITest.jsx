import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router';
import { ContentsBlock, ResultBlock } from './Components';

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
      case 'get':
        return `border-color: blue`;
      case 'post':
        return `border-color: #53a158`;
      case 'put':
        return `border-color: #f7dc4a`;
      case 'delete':
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
    if (mode == 'dark') return `background: #2f3336`;
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
    return JSON.stringify(JSON.parse(string),null,2)
  } 
  catch {
    return string
  }
}

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
  const [selectedMethod, setSelectedMethod] = useState('get');
  const [mode, setMode] = useState('white');

  const formik = useFormik({
    initialValues: {
      url: queryData.url,
      header: queryData.header,
      body: jsonPrettier(queryData.body),
    },
    onSubmit: (values) => {
      //   formik.resetForm();
    },
  });

  const handleChange = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleBackButton = (event) => {
    setIsResponse(false);
    setResponse([]);
  };

  const handleSaveButton = async (event) => {
    let response;
    let url = formik.values.url.replace(/['"]+/g, '');
    setIsLoading(true);

    try {
      switch (selectedMethod) {
        case 'get':
          console.log(url);
          response = await axios.get(url);
          break;
        case 'post':
          let body = JSON.parse(formik.values.body);

          response = await axios.post(url, body);
          break;
        case 'put':
          response = await axios.put(url);
          break;
        case 'delete':
          response = await axios.delete(url);
          break;
        default:
          setIsLoading(false);
          console.log('no method');
          return;
      }
      setResponse(response.data);
    } catch (e) {
      setResponse(e);
      console.log(e);
    }
    setIsResponse(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (queryData.method !== '') setSelectedMethod(queryData.method);
    if (queryData.mode !== '') setMode(queryData.mode);
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
              formik={formik}
            />
          )}
        </StyledBox>
      </StyledBackground>
    </ThemeProvider>
  );
};

export default APITest;
