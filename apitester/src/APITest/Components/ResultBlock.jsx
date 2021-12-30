import React from 'react';

import SendIcon from '@mui/icons-material/Send';
import ReactJson from 'react-json-view';

const ResultBlock = ({ handleBackButton, formik, response }) => {
  return (
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
  );
};

export default ResultBlock;
