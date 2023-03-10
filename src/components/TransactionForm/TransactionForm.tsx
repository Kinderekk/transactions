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
    tempData.amount = parseInt(tempData.amount);
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
            <input data-testid="transaction-form-amount" className={className('', {
              'inputError': errors.amount
            })} placeholder="e.g. 24" type="number" {...register("amount", { required: true, min: 1 })} />
          </div>
          <div className="transaction-form-inputs-container-left-account-number">
            <div className={className("transaction-form-inputs-container-left-account-number-text",  {
              'titleError': errors.amount
            })}>Account number</div>
            <input data-testid="transaction-form-account" className={className('', {
              'inputError': errors.account
            })} placeholder="e.g. 1010158214032162000" id="accountNumber" type="number" {...register("account", { required: true })} />
          </div>
        </div>
        <div className="transaction-form-inputs-container-right">
          <div className="transaction-form-inputs-container-right-address">
            <div className={className("transaction-form-inputs-container-right-address-text",  {
              'titleError': errors.amount
            })}>Address</div>
            <input data-testid="transaction-form-address" className={className('', {
              'inputError': errors.address
            })} placeholder="e.g. St. Johns Road West Dublin 8" {...register("address", { required: true })} />
          </div>
          <div className="transaction-form-inputs-container-right-beneficiary">
            <div className={className("transaction-form-inputs-container-right-beneficiary-text",  {
              'titleError': errors.beneficiary
            })}>Beneficiary</div>
            <input data-testid="transaction-form-beneficiary" className={className('', {
              'inputError': errors.beneficiary
            })} placeholder="e.g. Bill Billy" {...register("beneficiary", { required: true })} />
          </div>
        </div>
      </div>
      <div className="transaction-form-description-container">
        <div className="transaction-form-description">
          <div className={className("transaction-form-description-text",  {
            'titleError': errors.description
          })}>Description</div>
          <textarea data-testid="transaction-form-description" placeholder="e.g. Payment for invoice" className={className('', {
            'inputError': errors.description
          })} {...register("description", { required: true })} />
        </div>
      </div>
      <div className="transaction-form-button-container">
        <button data-testid="transaction-form-button">
          Send transaction
        </button>
      </div>
    </form>
  );
}

export default TransactionForm;
