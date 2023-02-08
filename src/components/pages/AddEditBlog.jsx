import React, { useState, useEffect } from 'react';
import { storage } from '../../firebase';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { toast, ToastContainer } from "react-toastify";
import { useAddBlogMutation } from '../../services/blogsApi';
import { useNavigate } from 'react-router-dom';

const initialState = {
  title: '',
  description: ''
}

const AddEditBlog = () => {
  const [data, setData] = useState(initialState);
  const [file, setFile] = useState([]);
  const [progress, setProgress] = useState([]);
  const [addBlog] = useAddBlogMutation();

  const navigate = useNavigate();
  const {title, description} = data;

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
            setData((prev) => ({ ...prev, imgURL: downloadURL }));
          });
        }
      );
    };
    file && uploadFile();
  }, [file]);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (title && description) {
      await addBlog(data);
      navigate('/tips');
    }
  }


  return (
    <div className="container my-5">
      <h1 className="text-center">Create New Article</h1>
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
        <button type="submit" className="btn btn-primary mt-4"
         disabled={progress !== null && progress < 100}>Submit</button>
      </form>
    </div>
  )
}

export default AddEditBlog;