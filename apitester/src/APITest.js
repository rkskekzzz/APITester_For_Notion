import React from 'react';
import { useState, useEffect } from 'react';
import { Icon } from 'semantic-ui-react';
import { useFormik } from 'formik';
import axios from 'axios';
import './Main.css';

// 저렇게 넣으면 화면
// url : ~~~
// header : ~~~
// body : ~~~
// 이렇게 어떤내용으로 전송되는지 적혀있고
// 전송 버튼 누르면
// response : ~~

const APITest = () => {
  const [response, setResponse] = useState('');
  let club;

  const formik = useFormik({
    initialValues: {
      url: '',
      header: '',
      body: '',
    },
    onSubmit: (values) => {
      club = { ...values };
      formik.resetForm();
    },
  });

  const handleSaveButton = async (event) => {
    let response;
    try {
      response = await axios.get(formik.url);
    } catch (e) {
      console.log(e);
    }
    setResponse(response);
  };

  return (
    <div>
      <div className="body-box">
        <form id="my-form" onSubmit={formik.handleSubmit}>
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
      <div>{response}</div>
    </div>
  );
};

export default APITest;
