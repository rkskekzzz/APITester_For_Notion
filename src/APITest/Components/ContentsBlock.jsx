import React from 'react';
import styled from 'styled-components';
import { CopyToClipboard } from 'react-copy-to-clipboard';

import SendIcon from '@mui/icons-material/Send';
import FlipIcon from '@mui/icons-material/Flip';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import {
  createTheme,
  Typography,
  IconButton,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

import { SendButton } from './StyledButton';
import { ContentHeaderBox } from './ContentHeaderBox';

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
`;

const InputForm = styled.form`
  display: flex;
  flex-direction: column;
  padding: 0 10px;
  gap: 15px;
`;

const method = ['GET', 'POST', 'PUT', 'DELETE'];
const theme = createTheme({
  typography: {
    fontSize: 12,
  },
});

const ContentsBlock = ({
  selectedMethod,
  handleMethod,
  handleSendButton,
  handleModeButton,
  handlePresentButton,
  formik,
  error,
  mode,
  present,
  isLoading,
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
    return `https://heyinsa.kr/apitester?${method}${url}${header}${body}&mode=${mode}&present=${present}`;
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
        <ButtonBox>
          <IconButton aria-label="present">
            <FlipIcon onClick={handlePresentButton} />
          </IconButton>
          <IconButton aria-label="mode">
            <Brightness4Icon onClick={handleModeButton} />
          </IconButton>
          <CopyToClipboard text={clipboardText()}>
            <IconButton aria-label="copy">
              <ContentCopyIcon />
            </IconButton>
          </CopyToClipboard>
          <SendButton
            onClick={handleSendButton}
            method={selectedMethod}
            endIcon={<SendIcon />}
            loading={isLoading}
            loadingPosition="end"
            variant="contained"
          >
            <span>Send</span>
          </SendButton>
        </ButtonBox>
      </ContentHeaderBox>
      <InputForm id="my-form" onSubmit={formik.handleSubmit}>
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
      </InputForm>
    </>
  );
};

export default ContentsBlock;
