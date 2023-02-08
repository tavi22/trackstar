import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFetchBlogQuery } from '../../services/blogsApi';
import './Details.scss'

const Details = () => {
  const {id} = useParams();
  const {data: blog, error, isError} = useFetchBlogQuery(id ? id : skipToken);

  useEffect(() => {
    isError && toast.error(error);
  }, [isError])

  return (
    <div className='container my-5'>
      <h1 className='text-center'>{blog?.title}</h1>
      <hr />
      <div className='row'>
        <div className='col-md-4'>
          <img src={blog?.imgURL} className='img-fluid' alt='Blog Cover' />
        </div>
        <div className='col-md-8'>
          <span className='author'>by <i>{blog?.author}</i></span>
          <p> {blog?.description}</p>
        </div>
      </div>
    </div>
  )
}

export default Details;