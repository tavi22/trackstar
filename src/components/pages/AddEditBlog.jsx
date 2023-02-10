import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from "react-toastify";
import { useAddBlogMutation, useFetchBlogQuery, useUpdateBlogMutation } from '../../services/blogsApi';
import { useNavigate, useParams } from 'react-router-dom';
import { skipToken } from '@reduxjs/toolkit/dist/query';
import './AddEditBlog.scss'

const initialState = {
  title: '',
  description: ''
};

const AddEditBlog = () => {
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState([]);
  const [addBlog] = useAddBlogMutation();
  const author = localStorage.getItem('user');
  
  const {id} = useParams();
  const {data: blog} = useFetchBlogQuery(id ? id : skipToken);
  const [updateBlog] = useUpdateBlogMutation();

  const navigate = useNavigate();
  const {title, description} = data;

  useEffect(() => {
    if (id && blog) {
      setData({...blog});
    }
  }, [id, blog])

  useEffect(() => {
    const uploadFile = () => {
      const storageRef = ref(storage, 'article-photos/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          if (progress > 50) {
            toast.success('Image successfully uploaded!', {
              position: toast.POSITION.TOP_CENTER
            })
          }
          console.log("Upload is " + progress + "% done");
          setProgress(progress);
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
            default:
              break;
          }
        },
        (error) => {
          console.log(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            if (!downloadURL.includes('undefined')) {
              setData((prev) => ({ ...prev, imgURL: downloadURL, author: author}));
            }
          });
        }
      );
    };
    file && uploadFile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      if (id) {
        await updateBlog({id, data});
        console.log(data)
        navigate('/tips');
      } else {
        await addBlog(data);
        navigate('/tips');
      } 
    }
  }


  return (
    <div className="container my-5">
      <h1 className="text-center">{id ? 'Update Article' : 'Create New Article'}</h1>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-2">
          <label className="mb-1">Title</label>
          <input type="text" className="form-control"
           value={title}
           name='title'
           onChange={handleChange}
           required />
        </div>
        <div className="form-group mt-2">
          <label className="mb-1">Description</label>
          <input type="text" className="form-control"
          value={description}
          name='description'
          onChange={handleChange}
          required  />
        </div>
        <div className="form-group">
          <label className="mb-1">Example file input</label>
          <br />
          <input type="file" className="form-control-file"
          onChange={(e) => setFile(e.target.files[0])} />
          <ToastContainer />
        </div>
        <button type="submit" className="btn btn-primary mt-4" accept="image/png, image/gif, image/jpeg"
         disabled={progress !== null && progress < 100}>{id ? 'Update' : 'Submit'}</button>
      </form>
    </div>
  )
}

export default AddEditBlog;