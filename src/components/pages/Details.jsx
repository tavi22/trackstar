import { skipToken } from '@reduxjs/toolkit/dist/query';
import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom'
import { toast } from 'react-toastify';
import { useFetchBlogQuery } from '../../services/blogsApi';

const Details = () => {
  const {id} = useParams();
  const {data, error, isError} = useFetchBlogQuery(id ? id : skipToken);

  useEffect(() => {
    isError && toast.error(error);
  }, [isError])
  return (
    <div>Details</div>
  )
}

export default Details