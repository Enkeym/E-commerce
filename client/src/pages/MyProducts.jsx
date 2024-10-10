import { Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useMyProductsQuery } from '../app/services/productsApi'
import AddCategory from '../components/category/AddCategory'
import Loader from '../components/loader/Loader'
import AddProducts from '../components/product/AddProducts'
import MainProduct from '../components/product/MainProduct'


const MyProducts = () => {

  const { userInfo } = useSelector((state) => state.auth)

  const currentPage = useSelector((state) => state.products.currentPage)
  const currentPageSize = useSelector((state) => state.products.currentPageSize)


  const {
    data = [],
    isLoading,
    isError
  } = useMyProductsQuery({
    userId: userInfo.id,
    page: currentPage,
    pageSize: currentPageSize
  })


  if (isLoading) {
    return <Loader />;
  }

  if (isError) {
    toast.error('Error!');
    return null;
  }


  return (
    <Container className='text-center p-3'>
      <AddCategory />
      <AddProducts />
      <MainProduct data={data} />
    </Container>
  );
}

export default MyProducts;
