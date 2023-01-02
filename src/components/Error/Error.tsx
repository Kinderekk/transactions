import './Error.scss';

type Props = {
  message: string;
}

function Error({ message }: Props) {

  return (
    <div className="error">{message}</div>
  );
}

export default Error;
