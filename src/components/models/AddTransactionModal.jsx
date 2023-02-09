import React, { useState } from 'react'
import { Modal, Form, Button, Spinner } from 'react-bootstrap'
import { toast, ToastContainer } from 'react-toastify';
import { useFetchFoldersQuery } from '../../services/foldersApi';
import { useAddTransactionMutation } from '../../services/transactionsApi'

const initialState = {
  description: '',
  amount: 0,
  type: '',
  folderId: ''
};

const AddTransactionModal = ({show, handleClose, defaultId}) => {
  const [data, setData] = useState(initialState);
  const [addTransaction] = useAddTransactionMutation();

  const {data:folders, isLoading} = useFetchFoldersQuery();

  const {description, amount, type, folderId} = data;

  if (isLoading) {
    return <Spinner className='me-2 ms-5 mt-5'
      style={{ width: '3rem', height: '3rem' }} animation="border" />
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (description && amount && type && folderId) {
      await addTransaction(data);
      toast.success('Transaction sucessfully created!', {
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
            <Form.Group className='mb-3' controlId='description'>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type='text'
                value={description}
                name='description'
                onChange={handleChange}
                required />
            </Form.Group>
            <Form.Group className='mb-3' controlId='amount'>
              <Form.Label>Amount</Form.Label>
              <Form.Control
                type='number'
                value={amount}
                name='amount'
                min={0}
                step={0.5}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group controlId='type'>
              <Form.Label>Type</Form.Label>
              <Form.Control
                type='text'
                as='select'
                value={type}
                name='type'
                onChange={handleChange}
                required
              >
                <option value=''>Please select a type</option>
                <option value='false'>Expense</option>
                <option value='true'>Income</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3" controlId="folderId">
              <Form.Label>Folder</Form.Label>
              <Form.Select 
                type='text'
                value={folderId}
                name='folderId'
                onChange={handleChange}
                required
              >
                <option id=''>Please select a folder</option>
                {folders.map(folder => (
                  <option key={folder.id} value={folder.id}>
                    {folder.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <div className='d-flex justify-content-end'>
              <Button variant='primary' type='submit'>
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

export default AddTransactionModal