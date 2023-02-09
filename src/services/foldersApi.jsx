import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import { serverTimestamp, addDoc, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const foldersApi = createApi ({
    reducerPath: 'foldersApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Folder'],
    endpoints: (builder) => ({

        fetchFolders: builder.query({
           async queryFn() {
                try {
                    const folderRef = collection(db, 'folders');
                    const querySnapshot = await getDocs(folderRef);
                    let folders = [];
                    querySnapshot?.forEach((doc) => {
                        folders.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    return {data: folders}
                } catch (err) {
                    return {error: err}
                }
            },
            providesTags: ['Folder']
            
        }),

        fetchFolder: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'folders', id);
                    const snapshot = await getDoc(docRef);
                    return {data: snapshot.data() };
                } catch (err) {
                    return {error:err};
                }
            },
            providesTags: ['Folder']
        }),

        addFolder: builder.mutation({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, 'folders'), {
                        ...data,
                        timestamp: serverTimestamp()
                    });
                } catch (err) {
                    return {error: err};
                }
                return {data: 'ok'};
            },
            invalidatesTags: ['Folder']
        }),

        deleteFolder: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, 'folders', id));
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Folder']
        }),

        updateFolder: builder.mutation({
            async queryFn({id, data}) {
                try {
                    await updateDoc(doc(db, 'folders', id), {
                    transactions: data,
                    timestamp: serverTimestamp()
                    })
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Folder']
        }),

        updateMax: builder.mutation({
            async queryFn({id, data}) {
                try {
                    await updateDoc(doc(db, 'folders', id), {
                    max: data,
                    timestamp: serverTimestamp()
                    })
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Folder']
        })
    }),
});

export const { useFetchFoldersQuery, useAddFolderMutation,
               useFetchFolderQuery, useDeleteFolderMutation, useUpdateFolderMutation, useUpdateMaxMutation} = foldersApi;