import { Transaction } from '../types/transaction';

export function getTransactions(): Promise<Transaction[]> {
  return fetch('http://localhost:8080/transactions')
    .then(res => res.json())
    .then(data => data)
}