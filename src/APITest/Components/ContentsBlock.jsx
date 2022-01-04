import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { ContentHeaderBox } from './ContentHeaderBox';

import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SendIcon from '@mui/icons-material/Send';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import { createTheme } from '@mui/material';
import { Typography } from '@mui/material';
import { IconButton } from '@mui/material';

import '../APITest.css';

const method = ['GET', 'POST', 'PUT', 'DELETE'];
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

const StyledButton = styled.button`
  margin: 0 10px;
  width: 90px;
  height: 40px;
  color: white;
  font-weight: bold;
  border-radius: 5px;
  border: 0px solid white;
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  cursor: pointer;
  ${({ method }) => {
    switch (method) {
      case 'GET':
        return `background-color: blue`;
      case 'POST':
        return `background-color: #53a158`;
      case 'PUT':
        return `background-color: #d9bc22`;
      case 'DELETE':
        return `background-color: red`;
      default:
        return `background-color: gray`;
    }
  }};

  &: hover {
    background: #6688dd;
  }
`;

const ContentsBlock = ({
  selectedMethod,
  handleMethod,
  handleSendButton,
  handleModeButton,
  formik,
  error,
  mode,
  present,
}) => {
  function clipboardText() {
    const method = `method=${selectedMethod}`;
    const url = formik.values.url ? `&url=${formik.values.url}` : '';
    const body = formik.values.body
      ? `&body=${encodeURI(formik.values.body)}`
      : '';
    const header = formik.values.header
      ? `&header=${encodeURI(formik.values.header)}`
      : '';

    return `https://heyinsa.kr/apitester?${method}${url}${header}${body}&mode=${mode}`;
  }

  return (
    <>
      <ContentHeaderBox method={selectedMethod}>
        <FormControl sx={{ m: 1, minWidth: 90 }} size="small">
          <InputLabel id="demo-simple-select-autowidth-label">
            <Typography theme={theme}>Method</Typography>
          </InputLabel>
          <Select
            labelId="demo-simple-select-autowidth-label"
            id="demo-simple-select-autowidth"
            value={selectedMethod ?? ''}
            onChange={handleMethod}
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
        <div className="button-box">
          <IconButton aria-label="mode">
            <Brightness4Icon onClick={handleModeButton} />
          </IconButton>
          <CopyToClipboard text={clipboardText()}>
            <IconButton aria-label="copy">
              <ContentCopyIcon />
            </IconButton>
          </CopyToClipboard>
          <StyledButton
            method={selectedMethod}
            variant="contained"
            endicon={<SendIcon />}
            form="my-form"
            type="submit"
            onClick={handleSendButton}
          >
            <span> Send </span>
            <SendIcon fontSize="small" className="sendicon" />
          </StyledButton>
        </div>
      </ContentHeaderBox>
      <form
        className="apitest-form"
        id="my-form"
        onSubmit={formik.handleSubmit}
      >
        <TextField
          error={error.url ? true : false}
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
          error={error.header ? true : false}
          id="standard-basic header"
          multiline
          label="header"
          variant="standard"
          name="header"
          type="string"
          onChange={formik.handleChange}
          value={formik.values.header ?? ''}
          placeholder="input header"
        />
        {selectedMethod !== 'GET' && (
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
    </>
  );
};

export default ContentsBlock;
