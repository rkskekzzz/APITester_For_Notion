import React from 'react';
import { useState, useEffect } from 'react';

import { useFormik } from 'formik';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import axios from 'axios';
import ReactJson from 'react-json-view';
import styled from 'styled-components';

import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme } from '@mui/material';

import './APITest.css';

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

const method = ['get', 'post', 'put', 'delete'];
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
  palette: {
    mode: 'dark',
  },
});

const APITest = () => {
  const [isResponse, setIsResponse] = useState(false);
  const [response, setResponse] = useState([]);
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });
  const [seletedMethod, setSelectedMethod] = useState('get');
  const [mode, setMode] = useState('white');

  const formik = useFormik({
    initialValues: {
      url: queryData.url,
      header: queryData.header,
      body: queryData.body,
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
    let body = JSON.parse(formik.values.body);

    try {
      switch (seletedMethod) {
        case 'get':
          console.log(url);
          response = await axios.get(url);
          break;
        case 'post':
          console.log(body);
          response = await axios.post(url, body);
          break;
        case 'put':
          response = await axios.put(url);
          break;
        case 'delete':
          response = await axios.delete(url);
          break;
        default:
          console.log('no method');
      }
      setIsResponse(true);
      setResponse(response.data);
    } catch (e) {
      console.log(e);
      alert(e);
    }
  };

  useEffect(() => {
    if (queryData.method !== '') setSelectedMethod(queryData.method);
    if (queryData.mode !== '') setMode(queryData.mode);
  }, []);

  return (
    <StyledBackground mode={mode}>
      <StyledBox method={seletedMethod}>
        {isResponse && (
          <div>
            <div className="apitest-body-utilbox result-header">
              <div className="result-header-title">{formik.values.url}</div>
              <button
                className="button back"
                variant="contained"
                endicon={<SendIcon />}
                onClick={handleBackButton}
              >
                <span> Back </span>
              </button>
            </div>
            <div className="result-body">
              <ReactJson src={response} />
            </div>
          </div>
        )}
        {!isResponse && (
          <div>
            <div className="apitest-body-utilbox">
              <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
                <InputLabel id="demo-simple-select-autowidth-label">
                  <Typography theme={theme}>Method</Typography>
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={seletedMethod ?? ''}
                  onChange={handleChange}
                  autoWidth
                  label="Method"
                >
                  {method.map((e) => {
                    return (
                      <MenuItem value={e ?? ''} key={e}>
                        <Typography theme={theme} color="">
                          {e}
                        </Typography>
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
              <button
                className="button"
                variant="contained"
                endicon={<SendIcon />}
                form="my-form"
                type="submit"
                onClick={handleSaveButton}
              >
                <span> Send </span>
                <SendIcon fontSize="small" className="sendicon" />
              </button>
            </div>
            <form
              className="apitest-form"
              id="my-form"
              onSubmit={formik.handleSubmit}
            >
              <TextField
                id="outlined-multiline-flexible url"
                multiline
                maxRows={3}
                label="url"
                variant="standard"
                name="url"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.url ?? ''}
                placeholder="input url"
              />
              <TextField
                id="standard-basic header"
                label="header"
                variant="standard"
                name="header"
                type="string"
                onChange={formik.handleChange}
                value={formik.values.header ?? ''}
                placeholder="input header"
              />
              {seletedMethod !== 'get' && (
                <TextField
                  id="outlined-multiline-flexible body"
                  multiline
                  maxRows={20}
                  label="body"
                  variant="standard"
                  name="body"
                  type="string"
                  onChange={formik.handleChange}
                  value={formik.values.body ?? ''}
                  placeholder="input body"
                />
              )}
            </form>
          </div>
        )}
      </StyledBox>
    </StyledBackground>
  );
};

export default APITest;
