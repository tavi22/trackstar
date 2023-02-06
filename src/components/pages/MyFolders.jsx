import React, { useState } from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import AddFolderModal from '../models/AddFolderModal'
import AddTransactionModal from '../models/AddTransactionModal'
import FolderCard from '../models/FolderCard'

const MyFolders = () => {
  const [showAddFolder, setShowAddFolder] = useState(false);
  const [showAddTransaction, setShowAddTransaction] = useState(false);

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
        gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr)',
        gap: '1rem', alignItems: 'flex-start' }} >
          <FolderCard name="Entertainment" amount={1200} max={1000} dark></FolderCard>
        </div>
      </Container>
      <AddFolderModal
        show={showAddFolder}
        handleClose={() => setShowAddFolder(false)} />
      <AddTransactionModal
        show={showAddTransaction}
        handleClose={() => setShowAddTransaction(false)} />
    </>
  )
}

export default MyFolders