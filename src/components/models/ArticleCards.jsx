import React from 'react'
import { Card, Stack, Button, Spinner, Row, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import { useDeleteBlogMutation, useFetchBlogsQuery } from '../../services/blogsApi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { excerpt } from '../utils/Excerpt';
import { NavLink } from 'react-router-dom';

const ArticleCards = () => {
  const {data, isLoading} = useFetchBlogsQuery();
  const [deleteBlog] = useDeleteBlogMutation(); 

  const navigate = useNavigate();

  if (isLoading) {
    return <Spinner className='me-2 ms-5 mt-5'
            style={{ width: '3rem', height: '3rem'}} animation="border" />
  }

  const handleDelete = async (id, owner) => {
    if (owner === localStorage.getItem('user')) {
      if (window.confirm('Delete this article?')) {
        await deleteBlog(id);
        toast.success('Article sucessfully deleted!', {
          position: toast.POSITION.TOP_CENTER
        });
      }
    } else {
      toast.error('You can not delete this post!', {
        position: toast.POSITION.TOP_CENTER});
    }
    
  }

  const handleEdit = (id, owner) => {
    if (owner === localStorage.getItem('user')) {
      navigate('/tips/edit/' + id);
    } else {
      toast.error('You can not edit this post!', {
        position: toast.POSITION.TOP_CENTER});
    }
  }

  return (
    <div>
      <Row className="row-cols-1 row-cols-md-3 g-4">
        {data?.map((item) => (
          <Col key={item.id}>
            <Card style={{ width: '25rem', height:'33rem'}}>
            <Card.Img style={{height: '20rem'}} variant='top' src={item.imgURL} alt={item.title}/>
            <Card.Body>
              <Card.Title className="text-start">{item.title}</Card.Title>
              <Card.Text className="text-start">
                {excerpt(item.description, 80)}
                <br/>
                <NavLink to={`/tips/details/${item.id}`}> Read More </NavLink>
              </Card.Text>
              <Stack direction='horizontal' gap='2' className='mt-4'>
                <Button variant='outline-success' className='ms-auto'
                onClick={() => handleEdit(item.id, item.owner)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                    <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                    <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z"/>
                  </svg>
                </Button>
                <Button variant='outline-danger'
                onClick={() => handleDelete(item.id, item.owner)}>
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1H2.5zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5zM8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5zm3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0z"/>
                  </svg>
                </Button>
              </Stack>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
      <ToastContainer />
  </div>
  )
}

export default ArticleCards;