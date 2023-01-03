import { useEffect, useRef, useState } from 'react';
import InfiniteScroll from "react-infinite-scroll-component";
import Loader from '../components/Loader/Loader';
import Error from '../components/Error/Error';
import TransactionItem from '../components/TransactionItem/TransactionItem';
import { addTransaction, getTransactions } from '../services/transactions';
import { Transaction } from '../types/transaction';
import Filter from '../components/Filter/Filter';
import TransactionForm from '../components/TransactionForm/TransactionForm';
import './Transactions.scss';

function Transactions() {
  const dataFetchedRef = useRef(false);
  const loaderCounter = useRef(0);
  const [transactionsToShow, setTransactionsToShow] = useState<Transaction[]>();
  const [transactions, setTransactions] = useState<Transaction[]>();
  const [filteredTransactions, setFilteredTransactions] = useState<Transaction[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [newTransactionAdded, setNewTransactionAdded] = useState<boolean>(false);

  function filterTransactions(filterText: string) {
    if (transactions) {
      loaderCounter.current = 0;
      setTransactionsToShow([]);
      setIsLoading(true);
      // do not iterate if filter input is empty
      if (filterText === '') {
        setFilteredTransactions(transactions);
        getMoreTransactions(transactions);
      } else {
        const filteredArray = transactions.filter((item) => 
            item.beneficiary.toLowerCase().includes(filterText.toLowerCase()));
        setFilteredTransactions(filteredArray);
        if (filteredArray.length > 0) {
          getMoreTransactions(filteredArray);
        }
      }
      setIsLoading(false);
    }
  }

  function handleTransactionDelete(id: number) {
    if (transactions && transactionsToShow) {
      const tempTransactions = transactions.filter((transaction) => transaction.id !== id)
      const tempTransactionsToShow = transactionsToShow.filter((transaction) => transaction.id !== id)
      if (filteredTransactions) {
        const tempFilteredTransactions = filteredTransactions.filter((transaction) => transaction.id !== id)
        setFilteredTransactions(tempFilteredTransactions);
      }
      setTransactions(tempTransactions);
      setTransactionsToShow(tempTransactionsToShow);
    }
  }

  function getMoreTransactions(transactions: Transaction[]) {
    const maxIndex = loaderCounter.current + 20 > transactions.length ? transactions.length : loaderCounter.current + 20;
    const slicedArray = transactions.slice(loaderCounter.current, maxIndex);
    loaderCounter.current += 20;
    setTransactionsToShow((prevState) => prevState ? prevState.concat(slicedArray) : slicedArray);
  }

  async function handleAddingTransaction(data: Transaction) {
    const status = await addTransaction(data);
    if (status === 201) {
      setNewTransactionAdded(true);
    }
  }

  useEffect(() => {
    // Fixing error with double useEffect call
    if (dataFetchedRef.current) return;
    dataFetchedRef.current = true;

    if (newTransactionAdded) {
      setNewTransactionAdded(false);
    }

    setIsLoading(true);
    getTransactions()
      .then(data => {
        setTransactions(data);
        getMoreTransactions(data);
      })
      .catch(() => {
        setIsError(true);
      })
      .finally(() => {
        dataFetchedRef.current = false;
        setIsLoading(false);
      })
  }, [newTransactionAdded]);

  return (
    <div className="page-container">
      <div className="page-items-container">
        <div className="upper-items">
          <div className="left-box">
            <div className="left-box-balance">
              <div className="left-box-balance-title">Balance address</div>
              <div className="left-box-balance-address">PL10101582140321620000000000</div>
            </div>
            <div className="left-box-empty-space" />
            <div className="left-box-filter">
              <Filter onChange={(filterText) => filterTransactions(filterText)}/>
            </div>
          </div>
          <div className="right-box">
            <TransactionForm onTransactionAdd={(data: Transaction) => handleAddingTransaction(data)} />
          </div>
        </div>
        <div className="transactions-list-container">
          {transactions && transactionsToShow && !isLoading && !isError
            && (
              <div id="transaction-list" className="transaction-list">
                <InfiniteScroll
                  className="infinite-scroll"
                  dataLength={transactionsToShow.length}
                  next={() => getMoreTransactions(filteredTransactions ? filteredTransactions : transactions)}
                  hasMore={filteredTransactions ? filteredTransactions.length > transactionsToShow.length : transactions.length > transactionsToShow.length }
                  loader={<h4>Loading...</h4>}
                  scrollableTarget="transaction-list"
                >
                  {transactionsToShow.map((transaction) => (
                    <TransactionItem key={transaction.id} transaction={transaction} onTransactionDelete={(id) => handleTransactionDelete(id)} />
                  ))}
                  {transactionsToShow.length === 0 && (
                    <div className="transaction-list-empty-array">There is nothing to show</div>
                  )}
                </InfiniteScroll>
              </div>
            )
          }
          {isLoading && <Loader />}
          {isError && <Error message="There was an error when getting informations from server" />}
        </div>
      </div>
    </div>
  );
}

export default Transactions;
