import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import './login-page.sass';

const apiURL = 'http://95.31.196.92:3000'

const LoginPage = () => (
  <div className='login-page'>
    <h1 className='login-header'>Login</h1>
    <Formik
      initialValues={{
        username: '',
        password: ''
      }}
      onSubmit={async (values, {resetForm}) => {
        SubmitForm({values, resetForm})
      }}
    >
      <Form className='login-form'>
        <div className='mb-3'>
            <label className='form-label login-input-label' htmlFor="username">Username</label>
            <Field className='form-control login-input' id="username" name="username" placeholder="Username" />
        </div>
        <div className='mb-3'>
            <label className='form-label login-input-label' htmlFor="password">Password</label>
            <Field className='form-control login-input' type="password" id="password" name="password" placeholder="Password" />
        </div>
       
        <button className='btn btn-primary' type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

function SubmitForm({values, resetForm}) {
    console.log(values)
    resetForm()
    axios.post(`${apiURL}/auth/login`, values)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
}

export default LoginPage