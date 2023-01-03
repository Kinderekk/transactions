import { Transaction } from '../../types/transaction';
import Moment from 'moment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import className from 'classnames';
import { faTrash } from '@fortawesome/free-solid-svg-icons'
import { deleteTransaction } from '../../services/transactions';
import './TransactionItem.scss';
import { useEffect, useState } from 'react';

type Props = {
  transaction: Transaction;
  onTransactionDelete: (id: number) => void;
}

function TransactionItem({ transaction, onTransactionDelete }: Props) {
  const [removing, setRemoving] = useState(false);

  useEffect(() => {
    // wait for animation to finish
    if (removing) {
      const timeout = setTimeout(() => {
        onTransactionDelete(transaction.id);
      }, 400);
      return () => {
        clearTimeout(timeout);
      }
    }
  }, [removing, onTransactionDelete, transaction.id]);

  return (
    <div className={className('transaction-list-item', {
      'removing': removing
    })}>
      <div className="transaction-basic-informations">
        <div className="transaction-date">{Moment(transaction.date).format('D MMMM YYYY, h:mm:ss')}</div>
        <div className="transaction-beneficiary">{transaction.beneficiary}</div>
        <div className="transaction-address">{transaction.address}</div>
      </div>
      <div className="transaction-description">
        {transaction.description}
      </div>
      <div className="transaction-account-informations">
        <div className="transaction-account-informations-account">
          {transaction.account}
        </div>
        <div style={{
          color: transaction.amount < 0 ? 'red' : 'green'
        }} className="transaction-account-informations-amount">
          {transaction.amount}
        </div>
      </div>
      <div className="transaction-remove">
        <FontAwesomeIcon icon={faTrash} onClick={async (e) => {
          const status = await deleteTransaction(transaction.id);
          // TODO add error handling
          if (status === 200) {
            setRemoving(true);
          }
        }} />
      </div>
    </div>
  );
}

export default TransactionItem;
