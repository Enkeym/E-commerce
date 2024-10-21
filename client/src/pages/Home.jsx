import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useAllProductsQuery } from '../app/services/productsApi';
import SelectCategory from '../components/category/SelectCategory';
import Loader from '../components/loader/Loader';
import MainProduct from '../components/product/MainProduct';
import SearchTitle from '../components/search/SearchTitle';

const Home = () => {
  const { searchName, categoryName, currentPage, currentPageSize } = useSelector((state) => state.products);

  const { data, isLoading, isError } = useAllProductsQuery({
    category: categoryName,
    search: searchName,
    page: currentPage,
    pageSize: currentPageSize,
  });

  useEffect(() => {
    if (isError) {
      toast.error('Error loading products!');
    }
  }, [isError]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <SelectCategory />
      <SearchTitle />
      <MainProduct data={data} />
    </div>
  );
};

export default Home;
