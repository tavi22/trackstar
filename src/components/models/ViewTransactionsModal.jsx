import React from 'react'
import { Modal, Button, Stack, Spinner } from 'react-bootstrap'
import { toast } from 'react-toastify';
import { useDeleteFolderMutation } from '../../services/foldersApi';
import { useDeleteTransactionMutation, useFetchTransactionsQuery } from '../../services/transactionsApi';
import { currencyFormatter } from '../utils/Currency';

const ViewTransactionsModal = ({show, handleClose, name, id}) => {
  const [deleteFolder] = useDeleteFolderMutation();
  const [deleteTransaction] = useDeleteTransactionMutation();
  const {data, isLoading} = useFetchTransactionsQuery();


  if (isLoading) {
    return <Spinner className='me-2 ms-5 mt-5'
      style={{ width: '3rem', height: '3rem' }} animation="border" />
  }

  const handleDelete = async (id) => {
    if (window.confirm('Delete this folder?')) {
      await deleteFolder(id);
      toast.success('Folder sucessfully deleted!', {
        position: toast.POSITION.TOP_CENTER
      });
    } else {
      toast.error("Folder can't be deleted", {
        position: toast.POSITION.TOP_CENTER
      });
    }
    handleClose();
  }

  return (

    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <Stack direction="horizontal" gap="2">
            <div>Transactions - {name}</div>
            {(
              <Button
                onClick={() => handleDelete(id)}
                variant="outline-danger"
              >
                Delete
              </Button>
            )}
          </Stack>
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Stack direction="vertical" gap="3">
          {data?.map(transaction => transaction.folderId === id && (
            <Stack direction="horizontal" gap="2" key={transaction.id}>
              <div className="me-auto fs-4">{transaction.description} <Button variant={transaction.type === 'true' ? `outline-success` : `outline-danger`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-patch-check-fill" viewBox="0 0 16 16">
                  <path d="M10.067.87a2.89 2.89 0 0 0-4.134 0l-.622.638-.89-.011a2.89 2.89 0 0 0-2.924 2.924l.01.89-.636.622a2.89 2.89 0 0 0 0 4.134l.637.622-.011.89a2.89 2.89 0 0 0 2.924 2.924l.89-.01.622.636a2.89 2.89 0 0 0 4.134 0l.622-.637.89.011a2.89 2.89 0 0 0 2.924-2.924l-.01-.89.636-.622a2.89 2.89 0 0 0 0-4.134l-.637-.622.011-.89a2.89 2.89 0 0 0-2.924-2.924l-.89.01-.622-.636zm.287 5.984-3 3a.5.5 0 0 1-.708 0l-1.5-1.5a.5.5 0 1 1 .708-.708L7 8.793l2.646-2.647a.5.5 0 0 1 .708.708z"/>
                </svg>
              </Button>
              </div>
              <div className="fs-5">
                {currencyFormatter.format(transaction.amount)}
              </div>
              <Button
                onClick={() => deleteTransaction(transaction.id)}
                size="sm"
                variant="outline-danger"
              >
                &times;
              </Button>
            </Stack>
          ))}
        </Stack>
      </Modal.Body>
    </Modal>
  )
}

export default ViewTransactionsModal