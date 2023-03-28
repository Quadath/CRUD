import { useEffect, useState } from "react";
import axios from "axios";
import {Formik, Form, Field} from 'formik'

function PostForm() {
    const apiURL = 'http://95.31.196.92:3000/notes'

    return (
        <>
            <Formik initialValues={{
                text: ''
            }}
            onSubmit={(values, { resetForm }) => axios.post(apiURL, values)
            .then(res => {
                console.log(values)
                resetForm()
            })
        }
            >
                <Form style={{display: "flex"}}>
                    <Field className="form-control" id="text" name="text" type="text" placeholder="О чём думаете?"/>
                    <button className="btn btn-primary" style={{display: "inline-block"}} type="submit">Submit</button>
                </Form>
            </Formik>
        </>
    )
}

export default PostForm;