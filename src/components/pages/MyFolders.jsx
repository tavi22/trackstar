import React from 'react'
import { Container, Stack, Button } from 'react-bootstrap'
import FolderCard from '../models/FolderCard'

const MyFolders = () => {
  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'> Folders </h1>
        <Button variant='primary'> Add Folder </Button>
        <Button variant='outline-primary'> Add Transaction </Button>
      </Stack>
      <div style={{display: 'grid',
       gridTemplateColumns: 'repeat(auto-fill, minmax(500px, 1fr)',
       gap: '1rem', alignItems: 'flex-start' }} >
        <FolderCard name="Entertainment" amount={1200} max={1000} dark></FolderCard>
      </div>
    </Container>
  )
}

export default MyFolders