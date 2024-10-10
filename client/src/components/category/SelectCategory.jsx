import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeCategory, setPage } from '../../features/productsSlice';
import CategoryOption from './CategoryOption';

const SelectCategory = () => {
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleChange = (selectedCategory) => {
    console.log('Selected Category:', selectedCategory);
    dispatch(changeCategory(selectedCategory));
    dispatch(setPage(1));
    setSelectedCategory(selectedCategory);
  };

  return (
    <CategoryOption
      value={selectedCategory}
      onChange={handleChange}
    />
  );
};

export default SelectCategory;
