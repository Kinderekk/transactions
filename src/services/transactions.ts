import { Transaction } from '../types/transaction';

export function getTransactions(): Promise<Transaction[]> {
  return fetch('http://localhost:8080/transactions')
    .then(res => res.json())
    .then(data => data)
    .catch(e => e)
}

export function addTransaction(transaction: Transaction): Promise<number> {
  return fetch('http://localhost:8080/transactions', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(transaction)
  })
    .then(res => res.status)
    .catch(e => e)
}

export function deleteTransaction(id: number): Promise<{}> {
  return fetch(`http://localhost:8080/transactions/${id}`, {
    method: 'DELETE'
  })
    .then(res => res.status)
    .catch(e => e)
}