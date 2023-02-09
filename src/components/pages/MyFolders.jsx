import React, { useState } from 'react'
import { Container, Stack, Button, Spinner, Row, Col } from 'react-bootstrap'
import AddFolderModal from '../models/AddFolderModal'
import AddTransactionModal from '../models/AddTransactionModal'
import FolderCard from '../models/FolderCard'
import { useFetchFoldersQuery } from '../../services/foldersApi'
import { ToastContainer } from 'react-toastify'

const MyFolders = () => {
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);
  const {data, isLoading} = useFetchFoldersQuery();

  if (isLoading) {
    return <Spinner className='me-2 ms-5 mt-5'
      style={{ width: '3rem', height: '3rem' }} animation="border" />
  }

  const getAmount = (folder) => {
    
  }

  return (
    <>
      <Container className='my-4'>
        <Stack direction='horizontal' gap='2' className='mb-4'>
          <h1 className='me-auto'> Folders </h1>
          <Button variant='primary' onClick={() => setShowAddFolder(true)}>
             Add Folder </Button>
          <Button variant='outline-primary' onClick={() => setShowAddTransaction(true)}>
             Add Transaction </Button>
        </Stack>
        <div style={{display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(1000px, 1fr)',
        gap: '1rem', alignItems: 'flex-start' }} >
          <Row className="row-cols-1 row-cols-md-2 g-4">
            {data?.map((item) => (
                <Col key={item.id}>
                  <FolderCard name={item.name} amount={getAmount(item)} max = {item.max} id={item.id} dark/>
                </Col>
          ))}
          </Row>
        </div>
      </Container>
      <AddFolderModal
        show={showAddFolder}
        handleClose={() => setShowAddFolder(false)} />
      <AddTransactionModal
        show={showAddTransaction}
        handleClose={() => setShowAddTransaction(false)} />
      <ToastContainer />
    </>
  )
}

export default MyFolders;