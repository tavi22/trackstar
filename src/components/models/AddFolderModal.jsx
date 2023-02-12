import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import { useAddFolderMutation } from '../../services/foldersApi'


const AddFolderModal = ({show, handleClose}) => {
  const initialState = {
    name: '',
    max: 0,
    current: 0,
    owner: localStorage.getItem('user')
  };
  
  const [data, setData] = useState(initialState);
  const [addFolder] = useAddFolderMutation();
  
  const {name, max} = data;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (name && max) {
      await addFolder(data);
      toast.success('Folder sucessfully created!', {
        position: toast.POSITION.TOP_CENTER
      });
    }
    handleClose();
    setData(initialState);
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
    <>
      <Modal show={show} onHide={handleClose} >
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>New Folder</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="name">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                value={name}
                name='name'
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group className="mb-3" controlId="max">
              <Form.Label>Maximum Spending</Form.Label>
              <Form.Control
                type="number"
                value={max}
                name='max'
                min={0}
                step={0.5}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <div className="d-flex justify-content-end">
              <Button variant="primary" type="submit">
                Add
              </Button>
            </div>
          </Modal.Body>
        </Form>
      </Modal>
      <ToastContainer />
    </>
  )
}

export default AddFolderModal