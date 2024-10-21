import { useEffect, useState } from 'react';
import { FormControl } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { searchName } from '../../features/productsSlice';
import { useDebounce } from '../../utils/hooks/debounce';

const SearchTitle = () => {
  const [search, setSearch] = useState('');
  const debounced = useDebounce(search, 500);
  const dispatch = useDispatch();

  useEffect(() => {

    dispatch(searchName(debounced));
  }, [dispatch, debounced]);

  return (
    <FormControl
      placeholder='search...'
      value={search}
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default SearchTitle;
