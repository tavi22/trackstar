import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import { serverTimestamp, addDoc, collection, getDocs, deleteDoc, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const blogsApi = createApi ({
    reducerPath: 'blogsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Blog'],
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
                    return {data: blogs};
                } catch (err) {
                    return {error: err};
                }
            },
            providesTags: ['Blog']
            
        }),

        fetchBlog: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'articles', id);
                    const snapshot = await getDoc(docRef);
                    return {data: snapshot.data() };
                } catch (err) {
                    return {error:err};
                }
            },
            providesTags: ['Blog']
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
            invalidatesTags: ['Blog']
        }),

        deleteBlog: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, 'articles', id));
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Blog']
        }),

        updateBlog: builder.mutation({
            async queryFn({id, data}) {
                try {
                    await updateDoc(doc(db, 'articles', id), {
                    ...data,
                    timestamp: serverTimestamp()
                    })
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Blog']
        })
    }),
});

export const { useFetchBlogsQuery, useFetchBlogQuery,
               useAddBlogMutation, useDeleteBlogMutation, useUpdateBlogMutation } = blogsApi;