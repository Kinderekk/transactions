import { Transaction } from '../../types/transaction';
import Moment from 'moment';
import './TransactionItem.scss';

type Props = {
  transaction: Transaction
}

function TransactionItem({ transaction }: Props) {

  return (
    <div className="transaction-list-item">
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
    </div>
  );
}

export default TransactionItem;
