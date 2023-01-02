import './Filter.scss';
import { debounce } from "lodash"

type Props = {
  onChange: (text: string) => void
}

function Filter({ onChange }: Props) {

  const debouncedSearch = debounce((filterText) => {
    onChange(filterText);
  }, 300)

  return (
    <div className="filter-container">
      <input 
        placeholder='Filter by beneficiary'
        onChange={(e) => debouncedSearch(e.target.value)}
      />
    </div>
  );
}

export default Filter;
