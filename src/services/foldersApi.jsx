import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import { serverTimestamp, addDoc, collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

export const foldersApi = createApi ({
    reducerPath: 'foldersApi',
    baseQuery: fakeBaseQuery(),
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
            }
            
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
        }),
    }),
});

export const { useFetchFoldersQuery, useAddFolderMutation } = foldersApi;