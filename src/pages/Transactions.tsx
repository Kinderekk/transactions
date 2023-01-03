import { useEffect, useRef, useState } from 'react';
import Loader from '../components/Loader/Loader';
import Error from '../components/Error/Error';
import TransactionItem from '../components/TransactionItem/TransactionItem';
import { getTransactions } from '../services/transactions';
import { Transaction } from '../types/transaction';
import './Transactions.scss';
import Filter from '../components/Filter/Filter';
import TransactionForm from '../components/TransactionForm/TransactionForm';

function Transactions() {
  const dataFetchedRef = useRef(false);
  const [transactionsToShow, setTransactionsToShow] = useState<Transaction[]>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);

  function filterTransactions(filterText: string) {
    if (transactions) {
      setIsLoading(true);
      // do not iterate if filter input is empty
      if (filterText === '') {
        setTransactionsToShow(transactions);
      } else {
        setTransactionsToShow(transactions.filter((item) => 
            item.beneficiary.toLowerCase().includes(filterText.toLowerCase())));
      }
      setIsLoading(false);
    }
  }

  function handleTransactionDelete(id: number) {
    if (transactions && transactionsToShow) {
      const tempTransactions = transactions.filter((transaction) => transaction.id !== id)
      setTransactions(tempTransactions);
      setTransactionsToShow(tempTransactions);
    }
  }

  useEffect(() => {
    // Fixing error with double useEffect call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    setIsLoading(true);
    getTransactions()
      .then(data => {
        setTransactions(data);
        setTransactionsToShow(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        setIsLoading(false);
      })
  }, [])

  console.log(transactions);

  return (
    <div className="page-container">
      <div className="page-items-container">
        <div className="upper-items">
          <div className="left-box">
            <div className="left-box-balance">
              balance
            </div>
            <div className="left-box-empty-space" />
            <div className="left-box-filter">
              <Filter onChange={(filterText) => filterTransactions(filterText)}/>
            </div>
          </div>
          <div className="right-box">
            <TransactionForm />
          </div>
        </div>
        <div className="transactions-list-container">
          <div className="transaction-list">
            {transactionsToShow && !isLoading && !isError
              && transactionsToShow.map((transaction) => (
                <TransactionItem key={transaction.id} transaction={transaction} onTransactionDelete={(id) => handleTransactionDelete(id)} />
              )
            )}
            {isLoading && <Loader />}
            {isError && <Error message="There was an error when getting informations from server" />}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Transactions;
