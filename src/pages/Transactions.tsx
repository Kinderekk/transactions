import { useEffect, useRef, useState } from 'react';
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
      {!isError && !isLoading && transactions && (
        <div>Got it</div>
      )}
      {isError && (
        <div className="error">There was an error when getting informations from server</div>
      )}
      {isLoading && (
        <div className="loading-container">
          <div className="loader" />
        </div>
      )}
    </div>
  );
}

export default Transactions;
