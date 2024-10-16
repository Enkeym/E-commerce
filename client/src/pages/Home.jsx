import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAllProductsQuery } from '../app/services/productsApi';
import SelectCategory from '../components/category/SelectCategory';
import Loader from '../components/loader/Loader';
import MainProduct from '../components/product/MainProduct';
import SearchTitle from '../components/search/SearchTitle';
import Welcome from './welcome/Welcome';

const Home = () => {
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
      ) : products.length === 0 ? (
        <Welcome />
      ) : (
        <MainProduct data={products} />
      )}
    </div>
  );
};

export default Home;
