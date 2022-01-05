import React from 'react';

import styled from 'styled-components';
import ReactJson from 'react-json-view';

import { Typography } from '@mui/material';
import { BackButton } from './StyledButton';
import { ContentHeaderBox } from './ContentHeaderBox';

import '../APITest.css';

const StatusSpan = styled.span`
  font-size: 1.3rem;
  font-weight: bold;
  height: 56px;
  line-height: 56px;
  margin: 0 3px;
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

const ResultBlock = ({
  handleBackButton,
  formik,
  response,
  mode,
  method,
  present,
}) => {
  return (
    <>
      <ContentHeaderBox method={method}>
        <Typography
          className="result-header-title"
          color="textPrimary"
          variant="h6"
        >
          <StatusSpan status={response.status}>[{response.status}]</StatusSpan>
          {formik.values.url}
        </Typography>
        {present !== 'onepage' && (
          <BackButton
            method={method}
            variant="contained"
            onClick={handleBackButton}
          >
            <span> Back </span>
          </BackButton>
        )}
      </ContentHeaderBox>
      <>
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
      </>
    </>
  );
};

export default ResultBlock;
