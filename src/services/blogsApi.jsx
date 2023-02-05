import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import { serverTimestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const blogsApi = createApi ({
    reducerPath: 'blogsApi',
    baseQuery: fakeBaseQuery(),
    endpoints: (builder) => ({
        fetchBlogs: builder.query({
           async queryFn() {
                try {
                    const blogRef = collection(db, 'articles');
                    const querySnapshot = await getDocs(blogRef);
                    let blogs = [];
                    querySnapshot?.forEach((doc) => {
                        blogs.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    return {data: blogs}
                } catch (err) {
                    return {error: err}
                }
            }
            
        }),
        addBlog: builder.mutation({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, 'articles'), {
                        ...data,
                        timestamp: serverTimestamp()
                    });
                } catch (err) {
                    return {error: err};
                }
                return {data: 'ok'};
            },
        }),
    }),
});

export const { useFetchBlogsQuery, useAddBlogMutation } = blogsApi;