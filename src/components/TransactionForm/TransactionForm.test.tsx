/* eslint-disable testing-library/no-unnecessary-act */
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import TransactionForm from './TransactionForm';
import { act } from 'react-dom/test-utils';

type Inputs = {
  amount: HTMLElement;
  account: HTMLElement;
  address: HTMLElement;
  beneficiary: HTMLElement;
  description: HTMLElement;
}

type FormData = {
  amount: string;
  account: string;
  address: string;
  beneficiary: string;
  description: string;
}

type ReceivedFormData = {
  amount: number;
  account: string;
  address: string;
  beneficiary: string;
  description: string;
  id: number;
  date: string;
}

const validFormData: FormData = {
  amount: '321',
  account: '123',
  address: 'address',
  beneficiary: 'name',
  description: 'desc'
}

const invalidFormData: FormData = {
  amount: 'bad data',
  account: 'bad data',
  address: 'good data',
  beneficiary: 'good data',
  description: 'good data'
}

function getFormInputs(): Inputs {
  const amount = screen.getByTestId('transaction-form-amount');
  const account = screen.getByTestId('transaction-form-account');
  const address = screen.getByTestId('transaction-form-address');
  const beneficiary = screen.getByTestId('transaction-form-beneficiary');
  const description = screen.getByTestId('transaction-form-description');

  return {
    amount,
    account,
    address,
    beneficiary,
    description
  }
}

function checkIfDataContainsFormData<Data>(formData: ReceivedFormData, data: Data) {
  const tempData: any = Object.assign({ id: formData.id, date: formData.date }, data);
  Object.keys(formData).forEach((inputName: string) => {
    expect(formData[inputName as keyof ReceivedFormData].toString()).toEqual(tempData[inputName as keyof ReceivedFormData].toString());
  });
}

test('typing valid data inside transaction form', async () => {
  render(<TransactionForm onTransactionAdd={(data: ReceivedFormData) => { checkIfDataContainsFormData<FormData>(data, validFormData); }} />);
  const inputs: Inputs = getFormInputs();
  Object.keys(inputs).forEach((inputName: string) => {
    userEvent.type(inputs[inputName as keyof Inputs], validFormData[inputName as keyof FormData]);
  });
  const button = screen.getByTestId('transaction-form-button');
  await act( async () => userEvent.click(button));
});

test('sending empty transaction form', async () => {
  render(<TransactionForm onTransactionAdd={() => {}} />);
  const inputs: Inputs = getFormInputs();
  const button = screen.getByTestId('transaction-form-button');
  await act( async () => userEvent.click(button));
  Object.keys(inputs).forEach((inputName: string) => {
    expect(inputs[inputName as keyof Inputs]).toHaveClass('inputError');
  });
});

test('sending partly invalid data inside transaction form', async () => {
  render(<TransactionForm onTransactionAdd={() => {}} />);
  const inputs: Inputs = getFormInputs();
  const button = screen.getByTestId('transaction-form-button');
  Object.keys(inputs).forEach((inputName: string) => {
    userEvent.type(inputs[inputName as keyof Inputs], invalidFormData[inputName as keyof FormData]);
  });
  await act( async () => userEvent.click(button));
  expect(inputs['amount']).toHaveClass('inputError');
  expect(inputs['account']).toHaveClass('inputError');
  expect(inputs['address']).not.toHaveClass('inputError');
  expect(inputs['beneficiary']).not.toHaveClass('inputError');
  expect(inputs['description']).not.toHaveClass('inputError');
});