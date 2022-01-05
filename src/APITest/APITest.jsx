import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router';

import { createTheme, ThemeProvider } from '@mui/material';
import styled from 'styled-components';
import { useFormik } from 'formik';
import axios from 'axios';
import qs from 'qs';

import { validUrl, validHeader, validBody } from './Utils/validUtils';
import { ContentsBlock, ResultBlock } from './Components';
import { jsonPrettier } from './Utils/jsonUtils';
import AdSense from 'react-adsense';

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
  overflow: hidden;
  transition: all ease 0.3s;
  gap: 30px;

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

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
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
  const queryData = qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [isResponsed, setIsResponsed] = useState(false);
  const [response, setResponse] = useState({});
  const [selectedMethod, setSelectedMethod] = useState('GET');
  const [mode, setMode] = useState('light');
  const [error, setError] = useState({ url: false, header: false });
  const [present, setPresent] = useState(queryData.present ?? '');

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
      document.body.style.background = 'white';
    } else {
      setMode('dark');
      document.body.style.background = '#2f3336';
    }
  };

  const handleMethod = (event) => {
    setSelectedMethod(event.target.value);
  };

  const handleBackButton = (event) => {
    setIsResponsed(false);
    setResponse({});
  };

  const handlePresentButton = (event) => {
    if (present === 'onepage') {
      setPresent('');
      setIsResponsed(false);
    } else {
      setPresent('onepage');
      handleSendButton();
    }
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

    request = axios({
      method: selectedMethod,
      headers: headers,
      body: body,
      url,
    });

    await request.then(setResponse).catch(function (error) {
      let response;
      if (error.response) {
        response = error.response;
      } else {
        response = {
          data: error.message,
          status: 'Failed',
        };
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
      growingBox.current.style.height =
        measuringBox.current.clientHeight + 'px';
    }, 10);
  }, [isResponsed, selectedMethod, formik.values.header, formik.values.body]);

  return (
    <ThemeProvider theme={mode === 'dark' ? darkTheme : lightTheme}>
      <StyledBackground mode={mode}>
        <StyledBox method={selectedMethod} ref={growingBox}>
          <FlexBox ref={measuringBox}>
            {(!isResponsed || present === 'onepage') && (
              <ContentsBlock
                selectedMethod={selectedMethod}
                handleMethod={handleMethod}
                handleSendButton={handleSendButton}
                handleModeButton={handleModeButton}
                handlePresentButton={handlePresentButton}
                formik={formik}
                error={error}
                mode={mode}
                present={present}
                isLoading={isLoading}
              />
            )}
            {isResponsed && (
              <>
                <AdSense.Google
                  style={{ display: 'block' }}
                  client="ca-pub-7292810486004926"
                  slot="7806394673"
                  format="auto"
                  responsive="true"
                />
                <ResultBlock
                  handleBackButton={handleBackButton}
                  formik={formik}
                  response={response}
                  mode={mode}
                  method={selectedMethod}
                  present={present}
                />
              </>
            )}
          </FlexBox>
        </StyledBox>
      </StyledBackground>
    </ThemeProvider>
  );
};

export default APITest;
