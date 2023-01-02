import { useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Error from '../components/Error/Error';
import TransactionItem from '../components/TransactionItem/TransactionItem';
import { getTransactions } from '../services/transactions';
import { Transaction } from '../types/transaction';
import './Transactions.scss';

function Transactions() {
  const dataFetchedRef = useRef(false);
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  useEffect(() => {
    // Fixing error with double useEffect call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    setIsLoading(true);
    getTransactions()
      .then(data => {
        setTransactions(data);
        setIsLoading(false);
      })
      .catch(() => {
        setIsError(true);
        setIsLoading(false);
      })
  }, [])

  console.log(transactions);

  return (
    <div className="page-container">
      {(
        <div className="page-items-container">
          <div className="upper-items">
            <div className="left-box">
              balance && filter
            </div>
            <div className="right-box">
              transaction form
            </div>
          </div>
          <div className="transactions-list-container">
            <div className="transaction-list">
              {transactions && transactions.map((transaction) => (
                <TransactionItem transaction={transaction} />
              ))}
              {isLoading && <Loader />}
              {isError && <Error message="There was an error when getting informations from server" />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Transactions;
