import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useState } from 'react'
import { Modal, Form, Button } from 'react-bootstrap'
import { useParams } from 'react-router-dom';
import { useAddFolderMutation, useFetchFolderQuery, useUpdateFolderMutation } from '../../services/foldersApi'

const initialState = {
  name: '',
  max: 0,
  current: 0
};

const AddFolderModal = ({show, handleClose}) => {
  const [data, setData] = useState(initialState);
  const [addFolder] = useAddFolderMutation();
  const [updateFolder] = useUpdateFolderMutation();

  const {name, max} = data;
  const {id} = useParams();
  const {data: folder} = useFetchFolderQuery(id ? id : skipToken);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(data);
    if (name && max) {
      console.log("???")
      if (id) {
        await updateFolder({id, data});
      } else {
        await addFolder(data);
      } 
    }
    handleClose();
  }

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  return (
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
              step={10}
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
  )
}

export default AddFolderModal