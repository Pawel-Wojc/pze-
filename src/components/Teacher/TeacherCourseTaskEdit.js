import { React, useState } from 'react'
import axios from 'axios';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import { useQuery } from 'react-query';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import { Toast, ToastContainer } from 'react-bootstrap';


export default function TeacherCourseTaskEdit({ task_id }) {
  const [showToast, setShowToast] = useState(false);
  const validationSchema = Yup.object().shape({
    title: Yup.string()
      .required('Name is required')
      .min(8, 'Title must be at least 8 characters'),
    contents: Yup.string()
      .required('Description is required')
      .min(8, 'Description must be at least 8 characters'),
    date_of_start: Yup.date()
      .required('Start date is required'),
    //date_of_end:Yup.date(),
    max_total_files_amount: Yup.number()
      .max(10, 'Max number of files is 10'),
  })
  const formOptions = { resolver: yupResolver(validationSchema) };
  const { register, handleSubmit, formState } = useForm(formOptions);
  const { errors } = formState;

  const getData = async () => {
    let getDataConfig = {
      method: 'get',
      url: localStorage.getItem("api_path") + "get/task/" + task_id,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      }
    }
    const { data } = await axios.request(getDataConfig)
      .then(res => {
        return res;
      })
      .catch(err => {
        console.error(err);
        return err
      })
    return data
  }


  const updateData = async (datatosend) => {
    let updateDataConfig = {
      method: 'post',
      url: localStorage.getItem("api_path") + "update/task",
      maxBodyLength: Infinity,
      headers: {
        Authorization: "Bearer " + sessionStorage.getItem("user_jwt")
      },
      data: datatosend
    }
    const { data } = await axios.request(updateDataConfig).then(res => {
      setShowToast(true)
      return res
    })
      .catch(err => {
        console.error(err);
        return err
      })
    return data
  }

  const { isLoading, isError, error, data } = useQuery('teacher_task' + task_id, getData, { refetchOnWindowFocus: false })

  function onSubmit(dataFromForm) {
    dataFromForm.id = data.id
    updateData(dataFromForm)
  }

  if (isLoading) {
    return <div>Loading.. </div>
  }
  if (isError) {
    return <div>Errror, {error.message}</div>
  }
  return (
    <div class="container">
      <div class="row">
        <ToastContainer position='top-end'>
          <Toast onClose={() => setShowToast(false)} show={showToast} delay={3000} bg='success' autohide>
            <Toast.Header>Date saved successfully</Toast.Header>
          </Toast>
        </ToastContainer>
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
              <div className="invalid-feedback">{errors.title?.message}</div>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextareaDescription"
              label="Description"
              className="mb-3"
            >
              <Form.Control
                {...register('contents')}
                label="Title"
                defaultValue={data.contents}
                as="textarea" rows={3}
                name="contents"
                className={`form-control ${errors.contents ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.contents?.message}</div>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextareaDateOfStart"
              label="Start date"
              className="mb-3"
            >
              <Form.Control
                {...register('date_of_start')}
                label="Title"
                defaultValue={data.date_of_start}
                type="date"
                name="date_of_start"
                className={`form-control ${errors.date_of_start ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.date_of_start?.message}</div>
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
              <div className="invalid-feedback">{errors.date_of_end?.message}</div>
            </FloatingLabel>

            <FloatingLabel
              controlId="floatingTextareaMaxFiles"
              label="Max mumber of files"
              className="mb-3"
            >
              <Form.Control
                {...register('max_total_files_amount')}
                label="Title"
                defaultValue={data.max_total_files_amount}
                type="number"
                name="max_total_files_amount"
                className={`form-control ${errors.max_total_files_amount ? 'is-invalid' : ''}`}
              />
              <div className="invalid-feedback">{errors.max_total_files_amount?.message}</div>
            </FloatingLabel>
            <FloatingLabel
              controlId="floatingTextAreaAvailableFileExtensions"
              label="Available file extensions"
              className="mb-3"
            >
              <Form.Control
                {...register('available_file_extensions')}
                label="Available file extensions"
                defaultValue={data.available_file_extensions}
                type="text"
                name="available_file_extensions"
                className={`form-control ${errors.available_file_extensions ? 'is-invalid' : ''}`}
              />
              <Form.Text id="extionsionsHelpBlock" muted>
                For example: exe, pdf, doc
              </Form.Text>
              <div className="invalid-feedback">{errors.available_file_extensions?.message}</div>
            </FloatingLabel>

          </Form.Group>
          <div style={styles.saveButtonContainer}>
            <Button variant="success" type="submit" style={styles.saveButtonContainer.saveButton}>Save</Button>
          </div>
        </Form>
      </div>
    </div>
  )
}

const styles = {
  saveButtonContainer: {
    width: "100%",
    display: "flex",
    justifyContent: "end",


    saveButton: {
      width: "15%"
    }
  }
}
