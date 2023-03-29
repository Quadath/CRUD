import React from 'react';
import { Formik, Field, Form } from 'formik';
import axios from 'axios';

import './register-page.sass';


const apiURL = 'http://95.31.196.92:3000'

const RegisterPage = () => (
  <div className='register-page'>
    <h1 className='register-header'>Register</h1>
    <Formik
      initialValues={{
        name: '',
        username: '',
        password: '',
        repeat: ''
      }}
      onSubmit={async (values, {resetForm}) => {
        SubmitForm({values, resetForm})
      }}
    >
      <Form className='register-form'>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="name">Name</label>
            <Field className='form-control register-input' id="name" name="name" placeholder="Name" />
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="username">Nickname</label>
            <Field className='form-control register-input' id="username" name="username" placeholder="Nickname" />
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="password">Password</label>
            <Field className='form-control register-input' type="password" id="password" name="password" placeholder="Password"/>
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="repeat">Repeat password</label>
            <Field className='form-control register-input' type="password" id="repeat" name="repeat" placeholder="Repeat password"/>
        </div>
        <button className='btn btn-primary' type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

function SubmitForm({values, resetForm}) {
    console.log(values)
    resetForm()
    axios.post(`${apiURL}/auth/register`, values)
    .then((result) => {
        console.log(result)
    })
    .catch((error) => {
        console.log(error)
    })
}

export default RegisterPage