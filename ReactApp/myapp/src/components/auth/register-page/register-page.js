import React from 'react';
import { Formik, Field, Form } from 'formik';

import './register-page.sass'

const RegisterPage = () => (
  <div className='register-page'>
    <h1 className='register-header'>Register</h1>
    <Formik
      initialValues={{
        firstName: '',
        lastName: '',
        password: '',
        repeat: ''
      }}
      onSubmit={async (values) => {
        await new Promise((r) => setTimeout(r, 500));
        alert(JSON.stringify(values, null, 2));
      }}
    >
      <Form className='register-form'>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="firstName">First Name</label>
            <Field className='form-control register-input' id="firstName" name="firstName" placeholder="First name" />
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="lastName">Last Name</label>
            <Field className='form-control register-input' id="lastName" name="lastName" placeholder="Last name" />
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="password">Password</label>
            <Field className='form-control register-input' type="password" id="lastName" name="password" placeholder="Password"/>
        </div>
        <div className='mb-3'>
            <label className='form-label register-input-label' htmlFor="repeat">Repeat password</label>
            <Field className='form-control register-input' type="password" id="lastName" name="repeat" placeholder="Repeat password"/>
        </div>
        <button className='btn btn-primary' type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);

export default RegisterPage