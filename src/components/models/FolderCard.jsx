import React from 'react'
import { Card, ProgressBar, Stack, Button } from 'react-bootstrap'
import { currencyFormatter } from '../utils/Currency'


function getProgressBarVariant(amount, max) {
    const ratio = amount / max;
    if (ratio < .5) return 'primary';
    if (ratio < .75) return 'warning';
    return 'danger';
}

const FolderCard = ({name, amount, max, dark}) => {
  const classNames = []
  if (amount > max) {
    classNames.push('bg-danger bg-opacity-10');
  } else if ((amount / max) >= 0.5) {
    classNames.push('bg-warning bg-opacity-10')
  } else if (dark) {
    classNames.push('text-white bg-dark');
  }


  return (
    <Card className={classNames.join('')}>
        <Card.Body>
            <Card.Title className='d-flex justify-content-between
             align-items-baseline fw-normal mb-3'>
                <div className='me-2'>{name}</div>
                <div className='d-flex align-items-baseline'>
                    {currencyFormatter.format(amount)}
                    <span className='text-mute fs-6 ms-1'> / {currencyFormatter.format(max)}
                    </span>
                </div>
            </Card.Title>
            <ProgressBar className='rounded-pill'
             variant={getProgressBarVariant(amount, max)}
             min={0}
             max={max}
             now={amount}/>

            <Stack direction='horizontal' gap='2' className='mt-4'>
                <Button variant='outline-primary' className='ms-auto'>Add Folder</Button>
                <Button variant='outline-secondary'>View Transactions</Button>
            </Stack>
        </Card.Body>
    </Card>
  )
}

export default FolderCard