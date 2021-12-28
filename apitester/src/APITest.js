import React from 'react';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import QueryString from 'qs';
import { useLocation } from 'react-router';
import axios from 'axios';
import './APITest.css';

const APITest = () => {
  const [response, setResponse] = useState([]);
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
        <form id="my-form" onSubmit={formik.handleSubmit}>
          <input
            id="method"
            name="method"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.method}
            placeholder="input method"
          />
          <input
            id="url"
            name="url"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.url}
            placeholder="input url"
          />
          <input
            id="header"
            name="header"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.header}
            placeholder="input header"
          />
          <input
            id="body"
            name="body"
            type="string"
            onChange={formik.handleChange}
            value={formik.values.body}
            placeholder="input body"
          />
        </form>
      </div>
      <button
        form="my-form"
        type="submit"
        className="save-button"
        onClick={handleSaveButton}
      >
        Save
      </button>
      {response.map((e) => {
        return <div>{e.nickname}</div>;
      })}
    </div>
  );
};

export default APITest;
