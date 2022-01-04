import React, { useState, useEffect, useRef } from 'react';
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
  display: flex;
  flex-direction: column;
  gap: 30px;

  overflow: hidden;
  transition: all ease 0.3s;

  ${({ method }) => {
    switch (method) {
      case 'GET':
        return `border-color: blue`;
      case 'POST':
        return `border-color: #53a158`;
      case 'PUT':
        return `border-color: #d9bc22`;
      case 'DELETE':
        return `border-color: red`;
      default:
        return `border-color: gray`;
    }
  }};
`;

const StyledBackground = styled.div`
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
  const growingBox = useRef(null);
  const measuringBox = useRef(null);
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
  const present = queryData.present ?? '';

  const formik = useFormik({
    initialValues: {
      url: queryData.url,
      header: jsonPrettier(queryData.header),
      body: jsonPrettier(queryData.body),
    },
    onSubmit: () => {},
  });

  const handleModeButton = (event) => {
    if (mode === 'dark') {
      setMode('light');
      document.body.style.background = "white";
    }
    else {
      setMode('dark');
      document.body.style.background = "#2f3336";
    }
  };

  const handleMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleBackButton = (event) => {
    setIsResponsed(false);
    setResponse({});
  };

  const toggleError = (error) => {
    // url for header
    const initError = { url: false, header: false };
    const newError = { url: false, header: false };
    newError[error] = true;
    setError(newError);
    setIsLoading(false);
    setTimeout(() => setError(initError), 2000);
  };

  const handleSendButton = async (event) => {
    let url, headers, body;
    let request;

    setIsLoading(true);

    try {
      url = validUrl(formik.values.url);
      headers = validHeader(formik.values.header);
      body = validBody(formik.values.body);
    } catch (e) {
      return toggleError(e.message);
    }

    switch (selectedMethod) {
      case 'GET':
        request = axios.get(url, {
          headers: headers,
        });
        break;
      case 'POST':
        request = axios.post(url, body, {
          headers: headers,
        });
        break;
      case 'PUT':
        request = axios.put(url, body, {
          headers: headers,
        });
        break;
      case 'DELETE':
        request = axios.delete(url, body, {
          headers: headers,
        });
        break;
      default:
        break;
    }

    await request.then(setResponse).catch(function (error) {
      let response;
      if (error.response) {
        response = error.response
      } else {
        response = {
          data: error.message,
          status: "Failed"
        }
      }
      setResponse(response);
    });

    setIsResponsed(true);
    setIsLoading(false);
  };

  useEffect(() => {
    if (queryData.method !== undefined)
      setSelectedMethod(queryData.method.toUpperCase());
    if (queryData.mode !== undefined) setMode(queryData.mode);
    if (present === 'onepage') handleSendButton();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      growingBox.current.style.height = measuringBox.current.clientHeight + "px";
    }, 10);
  }, [isResponsed, selectedMethod, formik.values.header, formik.values.body])

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <StyledBackground mode={mode}>
        <StyledBox method={selectedMethod} ref={growingBox}>
          <div ref={measuringBox}>
            {(!isResponsed || present === 'onepage') && (
              <ContentsBlock
                selectedMethod={selectedMethod}
                handleMethod={handleMethod}
                handleSendButton={handleSendButton}
                handleModeButton={handleModeButton}
                formik={formik}
                error={error}
                mode={mode}
                present={present}
                isLoading={isLoading}
              />
            )}
            {isResponsed && (
              <ResultBlock
                handleBackButton={handleBackButton}
                formik={formik}
                response={response}
                mode={mode}
                method={selectedMethod}
                present={present}
              />
            )}
          </div>
        </StyledBox>
      </StyledBackground>
    </ThemeProvider>
  );
};

export default APITest;
