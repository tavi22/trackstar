import React from 'react'
import { Container, Button, Stack, Spinner } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import ArticleCard from '../models/ArticleCard';

const Tips = () => {
  const navigate = useNavigate();
  

  return (
    <Container className='my-4'>
      <Stack direction='horizontal' gap='2' className='mb-4'>
        <h1 className='me-auto'> Articles </h1>
        <Button variant='primary' onClick={() => navigate('/tips/create')}> New Article </Button>
      </Stack>
      <ArticleCard />
    </Container>
  )
}

export default Tips