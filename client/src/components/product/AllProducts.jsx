import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAllProductsQuery } from '../../app/services/productsApi';
import SelectCategory from '../category/SelectCategory';
import Loader from '../loader/Loader';
import SearchTitle from '../search/SearchTitle';
import MainProduct from './MainProduct';

const AllProducts = () => {
  const [products, setProducts] = useState([]);

  const { searchName, categoryName, currentPage, currentPageSize } = useSelector((state) => state.products);

  const { data, isLoading, isError } = useAllProductsQuery({
    category: categoryName,
    search: searchName,
    page: currentPage,
    pageSize: currentPageSize,
  });

  useEffect(() => {
    if (data) {
      setProducts(data || []);
    }
  }, [data]);

  useEffect(() => {
    if (isError) {
      toast.error('Error loading products!');
    }
  }, [isError]);

  return (
    <div>
      <SelectCategory />
      <SearchTitle />
      {isLoading ? (
        <Loader />
      ) : (
        <MainProduct data={products} />
      )}
    </div>
  );
};

export default AllProducts;
