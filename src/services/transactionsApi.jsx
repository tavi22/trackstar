import { createApi, fakeBaseQuery} from '@reduxjs/toolkit/query/react'
import { serverTimestamp, addDoc, collection, getDocs, doc, getDoc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const transactionsApi = createApi ({
    reducerPath: 'transactionsApi',
    baseQuery: fakeBaseQuery(),
    tagTypes: ['Transaction'],
    endpoints: (builder) => ({

        fetchTransactions: builder.query({
           async queryFn() {
                try {
                    const transactionRef = collection(db, 'transactions');
                    const querySnapshot = await getDocs(transactionRef);
                    let transactions = [];
                    querySnapshot?.forEach((doc) => {
                        transactions.push({
                            id: doc.id,
                            ...doc.data()
                        })
                    });
                    return {data: transactions}
                } catch (err) {
                    return {error: err}
                }
            },
            providesTags: ['Transaction']
            
        }),

        fetchTransaction: builder.query({
            async queryFn(id) {
                try {
                    const docRef = doc(db, 'transactions', id);
                    const snapshot = await getDoc(docRef);
                    return {data: snapshot.data() };
                } catch (err) {
                    return {error:err};
                }
            },
            providesTags: ['Transaction']
        }),

        addTransaction: builder.mutation({
            async queryFn(data) {
                try {
                    await addDoc(collection(db, 'transactions'), {
                        ...data,
                        timestamp: serverTimestamp()
                    });
                } catch (err) {
                    return {error: err};
                }
                return {data: 'ok'};
            },
            invalidatesTags: ['Transaction']
        }),

        deleteTransaction: builder.mutation({
            async queryFn(id) {
                try {
                    await deleteDoc(doc(db, 'transactions', id));
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Transaction']
        }),

        updateTransaction: builder.mutation({
            async queryFn({id, data}) {
                try {
                    await updateDoc(doc(db, 'transactions', id), {
                    ...data,
                    timestamp: serverTimestamp()
                    })
                    return {data: 'ok'};
                } catch (err) {
                    return {error: err};
                }
            },
            invalidatesTags: ['Transaction']
        }),
    }),
});

export const { useFetchTransactionsQuery, useAddTransactionMutation,
               useFetchTransactionQuery, useDeleteTransactionMutation, useUpdateTransactionMutation} = transactionsApi;