import { toast } from 'react-toastify';
import { useGetCategoryQuery } from '../../app/services/categoryApi';
import Loader from '../loader/Loader';



const AllCategory = () => {
  const { data: categories, isLoading, isError } = useGetCategoryQuery();



  return (
    <div>
      <h2>All Category</h2>
      <ul>
        {isError && toast.error(isError)}
        {isLoading && <Loader />}
        {categories?.map((category) => (
          <li key={category.id}>{category.name}</li>
        ))}
      </ul>
    </div>
  )
}
export default AllCategory