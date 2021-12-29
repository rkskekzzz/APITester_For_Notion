import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import axios from 'axios';

import TextField from '@mui/material/TextField';

import SendIcon from '@mui/icons-material/Send';
import { Button } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import { Typography } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { createTheme } from '@mui/material';

import './APITest.css';

const method = ['get', 'post', 'put', 'delete'];
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

const APITest = () => {
  //   const theme = useTheme();
  const [response, setResponse] = useState([]);
  const [seletedMethod, setSelectedMethod] = React.useState([]);
  const location = useLocation();
  const queryData = QueryString.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  console.log(queryData);
  const formik = useFormik({
    initialValues: {
      method: queryData.method,
      url: queryData.url,
      header: queryData.header,
      body: queryData.body,
    },
    onSubmit: (values) => {
      //   formik.resetForm();
    },
  });

  const handleChange = (event) => {
    console.log(event);
    setSelectedMethod(event.target.value);
  };

  const handleSaveButton = async (event) => {
    let response;
    try {
      console.log(formik.values.url);
      response = await axios.get(formik.values.url);
    } catch (e) {
      console.log(e);
    }
    console.log(response.data);
    setResponse(response.data);
  };

  return (
    <div>
      <div className="apitest-body">
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">
            <Typography theme={theme} color="">
              Method
            </Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={seletedMethod}
            onChange={handleChange}
            autoWidth
            label="Method"
          >
            <MenuItem value="">
              <Typography theme={theme} color="">
                None
              </Typography>
            </MenuItem>
            {method.map((e) => {
              return (
                <MenuItem value={e}>
                  <Typography theme={theme} color="">
                    {e}
                  </Typography>
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
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
            value={formik.values.url}
            placeholder="input url"
          />
          <TextField
            id="standard-basic header"
            label="header"
            variant="standard"
            name="header"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.header}
            placeholder="input header"
          />
          <TextField
            id="outlined-multiline-flexible body"
            multiline
            maxRows={20}
            label="body"
            variant="standard"
            name="body"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.body}
            placeholder="input body"
          />
        </form>
        <button
          className="button"
          variant="contained"
          endIcon={<SendIcon />}
          form="my-form"
          type="submit"
          onClick={handleSaveButton}
        >
          Send
        </button>
      </div>

      {response.map((e) => {
        return <div>{e.nickname}</div>;
      })}
    </div>
  );
};

export default APITest;
