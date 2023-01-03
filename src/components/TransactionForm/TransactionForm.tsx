import { FieldValues, useForm } from "react-hook-form";
import className from 'classnames';
import './TransactionForm.scss';
import { Transaction } from "../../types/transaction";

type Props = {
  onTransactionAdd: (data: Transaction) => void;
};

function TransactionForm({ onTransactionAdd }: Props) {
  const { register, handleSubmit, formState: { errors }, setValue } = useForm();
  const onSubmit = (data: FieldValues) => {
    const tempData = Object.assign({}, data);
    tempData.id = Math.random();
    tempData.date = new Date().toJSON();
    onTransactionAdd(tempData as Transaction);
    clearInputs();
  }

  function clearInputs() {
    setValue('amount', '');
    setValue('account', '');
    setValue('address', '');
    setValue('beneficiary', '');
    setValue('description', '');
  }

  return (
    <form className="transaction-form" onSubmit={handleSubmit(onSubmit)}>
      <div className="transaction-form-inputs-container">
        <div className="transaction-form-inputs-container-left">
          <div className="transaction-form-inputs-container-left-amount">
            <div className={className('transaction-form-inputs-container-left-amount-text',  {
              'titleError': errors.amount
            })}>Amount</div>
            <input className={className('', {
              'inputError': errors.amount
            })} type="number" {...register("amount", { required: true, min: 1 })} />
          </div>
          <div className="transaction-form-inputs-container-left-account-number">
            <div className={className("transaction-form-inputs-container-left-account-number-text",  {
              'titleError': errors.amount
            })}>Account number</div>
            <input className={className('', {
              'inputError': errors.account
            })} id="accountNumber" type="number" {...register("account", { required: true })} />
          </div>
        </div>
        <div className="transaction-form-inputs-container-right">
          <div className="transaction-form-inputs-container-right-address">
            <div className={className("transaction-form-inputs-container-right-address-text",  {
              'titleError': errors.amount
            })}>Address</div>
            <input className={className('', {
              'inputError': errors.address
            })} {...register("address", { required: true })} />
          </div>
          <div className="transaction-form-inputs-container-right-beneficiary">
            <div className={className("transaction-form-inputs-container-right-beneficiary-text",  {
              'titleError': errors.beneficiary
            })}>Beneficiary</div>
            <input className={className('', {
              'inputError': errors.beneficiary
            })} {...register("beneficiary", { required: true })} />
          </div>
        </div>
      </div>
      <div className="transaction-form-description-container">
        <div className="transaction-form-description">
          <div className={className("transaction-form-description-text",  {
            'titleError': errors.description
          })}>Description</div>
          <textarea className={className('', {
            'inputError': errors.description
          })} {...register("description", { required: true })} />
        </div>
      </div>
      <div className="transaction-form-button-container">
        <button>
          Send transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
