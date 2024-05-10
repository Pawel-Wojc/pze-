import React from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

export default function TeacherCourseTaskEdit({ task_id }) {
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Name is required')
      .min(8, 'Title must be at least 8 characters'),
    contents: Yup.string()
      .required('Description is required')
      .min(8, 'Description must be at least 8 characters'),


  })
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, reset, formState } = useForm(formOptions);
  const { errors } = formState;
  console.log(task_id)
  let config = {
    method: 'get',
    url: localStorage.getItem("api_path") + "get/task/" + task_id,
    headers: {
      Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
    }
  }
  const getData = async () => {
    const { data } = await axios.request(config)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
        return err
      })
    console.log(data)
    return data
  }
  const onSubmit = () => { }

  const { isLoading, isError, error, data } = useQuery('teacher_task' + task_id, getData, { refetchOnWindowFocus: false })


  if (isLoading) {
    return <div>Loading.. Tutaj mozna dac skeleton</div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formGroup">
          <FloatingLabel
            controlId="floatingTextareaTitle"
            label="Title"
            className="mb-3"
          >
            <Form.Control
              {...register('title')}
              label="Title"
              defaultValue={data.title}
              type="text"
              name="title"
              className={`form-control ${errors.title ? 'is-invalid' : ''}`}
            />
          </FloatingLabel>
          <div className="invalid-feedback">{errors.title?.message}</div>
        
          <FloatingLabel
            controlId="floatingTextareaDescription"
            label="Description"
            className="mb-3"
          >
            <Form.Control
              {...register('contents')}
              label="Title"
              defaultValue={data.contents}
              type="text"
              name="contents"
              className={`form-control ${errors.contents ? 'is-invalid' : ''}`}
            />
          </FloatingLabel>
          <div className="invalid-feedback">{errors.contents?.message}</div>
          <FloatingLabel
            controlId="floatingTextareaDateOfStart"
            label="Start date"
            className="mb-3"
          >
            <Form.Control
              {...register('date_of_start')}
              label="Title"
              defaultValue={data.date_of_end}
              type="date"
              name="date_of_start"
              className={`form-control ${errors.date_of_start ? 'is-invalid' : ''}`}
            />
          </FloatingLabel>
          <FloatingLabel
            controlId="floatingTextareaDateOfEnd"
            label="End date"
            className="mb-3"
          >
            <Form.Control
              {...register('date_of_end')}
              label="Title"
              defaultValue={data.date_of_end}
              type="date"
              name="date_of_end"
              className={`form-control ${errors.date_of_end ? 'is-invalid' : ''}`}
            />
          </FloatingLabel>
        </Form.Group>
      </Form>
    </div>
  )
}

